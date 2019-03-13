const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//edits chapter title, text, photo, and caption.  this should probably be several different put routes
router.post('/:storyId', (req, res) => {
    if(req.isAuthenticated()){
    const queryValueString = [ ];
    const values = [Number(req.params.storyId)]
    let scrubCounter = 2;
    req.body.map( (chapter) => {
        values.push(chapter.title);
        values.push(chapter.order);
        queryValueString.push(`($1, $${scrubCounter++}, $${scrubCounter++} )`)
        console.log(scrubCounter);
        console.log(values);
        console.log(queryValueString);
    })
    let queryText = `INSERT INTO "chapter" ("story_id", "title", "order")
                     VALUES ${queryValueString.join(',')};`;
    pool.query(queryText, values).then((result) => {
        // send a response of created back to the client
        res.sendStatus(201);
    }).catch((error) => {
        // console log and error message for POST error
        console.log(`Error in chapter router POST: ${error}`);
        res.sendStatus(500);
    });
    } else {
        res.sendStatus(403);
    }
    
}); // end POST route

module.exports = router;