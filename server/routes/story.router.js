const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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
                res.sendStatus(200);
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
        console.log('in /search router');
        const queryText = `select (story.id) as story_id, first_name, last_name, profile_pic, header_photo, title, count(story_likes.story_id) as likes, completed
        from person
        join story
        on person.id = story.author
        join story_likes
        on story_likes.story_id = story.id
        group by story.id, person.first_name, person.last_name, person.profile_pic, story.header_photo, story.title, story.completed
        order by likes desc
        limit 10;`;
        pool.query(queryText)
            .then((sqlResult) => {
                res.send(sqlResult.rows);
                res.sendStatus(200);
            }).catch((error) => {
                console.log(`Error in /recent route: ${error}`);
            })
    } else {
        res.sendStatus(403);
    }


});

//retrieve individual story details for viewing or editing
router.get('/detail/:id', (req, res) => {
    if (req.isAuthenticated()) {

        const storyToGet = Number(req.params.id);
        const queryText = `select * 
                           from story 
                           where id = $1;`;
        pool.query(queryText, [storyToGet])
        .then( (sqlResult) => {
            res.send(sqlResult.rows);
            res.sendStatus(200);
        }).catch( (e) => {
            console.log(`Error getting individual story detail: ${e}`);
        })
    } else {
        res.sendStatus(403);
    }
});

//retrieves template story from template table for autopopulating story
router.get('/template', (req, res) => {

});

//creates new story with author, title, etc
router.post('/', (req, res) => {
    let queryText = `INSERT INTO "story" ("title", "caption", "header_photo", "intro", "author", "is_template")
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