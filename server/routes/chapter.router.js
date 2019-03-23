const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//edits chapter title, text, photo, and caption.  this should probably be several different put routes
router.post('/:storyId/:isNew', rejectUnauthenticated, (req, res) => {
    const queryValueString = [];
    // turns story id into a number
    const values = [Number(req.params.storyId)]
    // sets the order if the story is new
    let order = 1;
    let scrubCounter = 2;
    req.body.map((chapter) => {
        values.push(chapter.title);
        values.push(chapter.text);
        values.push(req.params.isNew === 'true' ? order : chapter.order);
        values.push(chapter.chapter_photo);
        queryValueString.push(`($1, $${scrubCounter++}, $${scrubCounter++}, $${scrubCounter++}, $${scrubCounter++} )`);
        order++;
    });
    let queryText = `INSERT INTO "chapter" ("story_id", "title", "text", "order", "chapter_photo")
                     VALUES ${queryValueString.join(',')};`;
    pool.query(queryText, values).then((result) => {
        // send a response of created back to the client
        res.sendStatus(201);
    }).catch((error) => {
        // console log and error message for POST error
        console.log(`Error in chapter router POST: ${error}`);
        res.sendStatus(500);
    });
}); // end POST route

router.put('/', rejectUnauthenticated, (req, res) => {
    const { id, colName, updatedValue } = req.body;
    if (colName === 'Text' || colName === 'Title') {
        const queryText = `UPDATE chapter 
            SET ${colName.toLowerCase()} = $1 
            WHERE id = $2
            RETURNING story_id;`;
        const value = [updatedValue, id];
        pool.query(queryText, value)
            .then(response => {
                res.send(response.rows);
            }).catch(e => {
                console.log(`error in /chapter put`, e);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

router.put('/image/:chapterId', rejectUnauthenticated, (req, res) => {
    // sql statement for inserting new photo
    let queryText = `UPDATE "chapter"
                     SET "chapter_photo" = $1
                     WHERE "id" = $2
                     RETURNING "story_id";`;
    pool.query(queryText,[req.body.image, Number(req.params.chapterId)]).then((result) => {
        // send back the resulting story id for reloading the chapter
        res.send(result.rows[0].story_id.toString());
    }).catch((error) => {
        // console log and error message
        console.log(`Error with changing the chapter image: ${error}`);
        res.sendStatus(500);
    });
});

module.exports = router;