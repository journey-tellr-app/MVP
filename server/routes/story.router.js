const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//gets users contribution stories for home page feed
router.get('/story-contributions', (req, res) => {
    console.log(`req.body.id: ${req.user.id}`);
    const userId = req.user.id;
    const queryText = `select *
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
});

//when user searches data base for specific stories 
router.get('/search', (req, res) => {

});

//retrieves 10 recent stories for home page feed
router.get('/recent', (req, res) => {
    console.log('in /search router');
    const queryText = `select first_name, last_name, profile_pic, header_photo, title, count(story_likes.story_id) as likes, completed
                       from person
                       join story
                       on person.id = story.author
                       join story_likes
                       on story_likes.story_id = story.id
                       group by person.first_name, person.last_name, person.profile_pic, story.header_photo, story.title, story.completed
                       order by likes desc
                       limit 10;`;
    pool.query(queryText)
        .then((sqlResult) => {
            res.send(sqlResult.rows);
            res.sendStatus(200);
        }).catch((error) => {
            console.log(`Error in /recent route: ${error}`);
        })
});

//retrieve individual story details for viewing or editing
router.get('/detail', (req, res) => {

});

//retrieves template story from template table for autopopulating story
router.get('/template', (req, res) => {

});

//creates new story with author, title, etc
router.post('/', (req, res) => {

});

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