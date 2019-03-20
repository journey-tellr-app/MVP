const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const storyDetailRouter = require('./story.detail.router');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.use('/detail', storyDetailRouter);

//gets users contribution stories for home page feed
router.get('/story-contributions', (req, res) => {
    if (req.isAuthenticated()) {
        // console.log(`req.body.id: ${req.user.id}`);
        const userId = req.user.id;
        const queryText = `SELECT header_photo, profile_pic, first_name, last_name, 
                               author, title, caption, intro, date_started, completed, last_edit, 
                               is_template, (person.id) as person_id, (story.id) as story_id, count(story_likes.story_id) as likes
                           FROM story
                           JOIN person 
                           ON story.author = person.id
                           full outer join story_likes
                           ON story_likes.story_id = story.id
                           WHERE author = $1
                           GROUP BY story.header_photo, person.profile_pic, 
                               person.first_name, person.last_name, author, title, caption, 
                               intro, date_started, completed, last_edit, is_template, story.id, person.id;`;
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
router.get('/search', (req, res) => {

});

//retrieves 10 recent stories for home page feed
router.get('/recent', (req, res) => {

    if (req.isAuthenticated()) {
        // console.log('in /story/search router');
        const queryText = `SELECT (person.id) as person_id, (story.id) as story_id, first_name, last_name,
                           profile_pic, header_photo, title, count(story_likes.story_id) as likes, completed,date_started
                           FROM person
                           JOIN story
                           ON person.id = story.author
                           full outer join story_likes
                           ON story_likes.story_id = story.id
                           GROUP BY person.id, story.id, person.first_name, person.last_name, 
                           person.profile_pic, story.header_photo, story.title, story.completed
                           order by likes desc, date_started desc
                           limit 10;`;
        pool.query(queryText)
            .then((sqlResult) => {
                res.send(sqlResult.rows);
            }).catch((error) => {
                console.log(`Error in /recent route: ${error}`);
            })
    } else {
        res.sendStatus(403);
    }


});

//retrieves template story from template table for autopopulating story
router.get('/template', (req, res) => {

});

//creates new story with author, title, etc
router.post('/', rejectUnauthenticated, (req, res) => {
    const queryText = `INSERT INTO "story" ("title", "caption", "header_photo", "intro", "author", "is_template")
                       VALUES ($1, $2, $3, $4, $5, $6)
                       RETURNING "id";`;
    pool.query(queryText, [req.body.title, req.body.caption, req.body.header_photo, req.body.intro, req.user.id, req.body.is_template]).then((result) => {
        // send a response with the new story id back to the client
        res.send(result.rows[0].id.toString());
    }).catch((error) => {
        // console log and error message for POST error
        console.log(`Error in story router POST: ${error}`);
        res.sendStatus(500);
    });
}); // end POST route


//edits made a story title, photo, caption after its begun
router.put('/edit', (req, res) => {

})

//when story finalized, sets completed to true
router.put('/complete', (req, res) => {

});

//STRETCH admin can remove of a story
router.delete('/', (req, res) => {

});


module.exports = router;