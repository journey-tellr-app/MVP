const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


//adds to story_likes table user_id and story_id.
//allows user to like both contributed stories and top stories
router.post('/', rejectUnauthenticated, (req, res) => {
    const user_id = req.body.user_id;
    const story_id = req.body.story_id;
    const queryText = `INSERT INTO story_likes ("person_id", "story_id")
                       VALUES ($1, $2);`;
    pool.query(queryText, [user_id, story_id])
    .then( (sqlResult) => {
        res.send(sqlResult.rows);
    }).catch( (error) => {
        console.log(`Error in /likes post: ${error}`);
    })
});

module.exports = router;