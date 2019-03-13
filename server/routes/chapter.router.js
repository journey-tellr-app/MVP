const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//edits chapter title, text, photo, and caption.  this should probably be several different put routes
router.post('/', (req, res) => {
    let queryText = `INSERT INTO "chapter" ("story_id", "title", "header_photo", "intro", "author")
                     VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [req.body.title, req.body.caption, req.body.header_photo, req.body.intro, req.user.id]).then((result) => {
        // send a response of created back to the client
        res.sendStatus(201);
    }).catch((error) => {
        // console log and error message for POST error
        console.log(`Error in chapter router POST: ${error}`);
        res.sendStatus(500);
    });
}); // end POST route

module.exports = router;