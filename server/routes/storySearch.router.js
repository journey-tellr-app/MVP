const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const storyDetailRouter = require('./story.detail.router');

router.use('/detail', storyDetailRouter);

//gets users contribution stories for home page feed
router.get('/story-contributions', (req, res) => {
    if (req.isAuthenticated()) {
        console.log(`req.body.id: ${req.user.id}`);
        const userId = req.user.id;
        const queryText = `select header_photo, author, title, caption, intro, date_started, completed, last_edit, is_template, (story.id) as story_id
                           from story
                           join person 
                           on story.author = person.id
                           where author = $1;`;
        pool.query(queryText, [userId])
            .then((sqlResult) => {
                res.send(sqlResult.rows);
            }).catch((error) => {
                console.log(`error in /story-contributions router: ${error}`);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

//when user searches data base for specific stories 
router.get('/:id', (req, res) => {
    console.log('in search story', req.params);
    const queryParams = req.params.id;
    const queryText = `
    select *, concat(first_name, ' ', last_name) as full_name
    from story
    join person
    on story.author = person.id
    where concat(first_name, ' ', last_name) like $1
    limit 10;`;
    pool.query(queryText, [`%${queryParams}%`])
        .then((sqlResult) => {
            console.log('results', sqlResult.rows);
            
            res.send(sqlResult.rows);
        }).catch((error) => {
            console.log(`error in /story-search router: ${error}`);
            res.sendStatus(500);
        })
});

// //retrieves 10 recent stories for home page feed
// router.get('/recent', (req, res) => {

//     if (req.isAuthenticated()) {
//         console.log('in /search router');
//         const queryText = `select (story.id) as story_id, first_name, last_name,
//         profile_pic, header_photo, title, count(story_likes.story_id) as likes, 
//         completed, date_started
//         from person
//         join story
//         on person.id = story.author
//         full outer join story_likes
//         on story_likes.story_id = story.id
//         group by story.id, person.first_name, person.last_name, 
//         person.profile_pic, story.header_photo, story.title, story.completed
//         order by likes desc, date_started desc
//         limit 10;`;
//         pool.query(queryText)
//             .then((sqlResult) => {
//                 res.send(sqlResult.rows);
//             }).catch((error) => {
//                 console.log(`Error in /recent route: ${error}`);
//             })
//     } else {
//         res.sendStatus(403);
//     }


// });


module.exports = router;