const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    // select statement to get all template stories from the database
    let queryText = `SELECT * FROM "template_story";`;
    pool.query(queryText).then((result) => {
        // send back the query results
        res.send(result.rows);
    }).catch((error) => {
        // if an error occurs console log the error and send a 500 status code
        console.log(`Error occured when loading templates: ${error}`);
        res.sendStatus(500);
    });

});

router.get('/story/:templateId', rejectUnauthenticated, (req, res) => {  
    // select statement to get all template stories from the database
    let queryText = `SELECT * FROM "template_story"
                     WHERE "id" = $1;`;
    // select from the template_story database
    pool.query(queryText, [req.params.templateId]).then((result) => {
        let dataToSend = {
            title: result.rows[0].title,
            caption: result.rows[0].caption,
            placeholder_image: result.rows[0].placeholder_image,
            intro: result.rows[0].intro
        }
        // send select data to server
        res.send(dataToSend);
    }).catch((error) => {
        // if an error occurs console log the error and send a 500 status code
        console.log(`Error occured when loading templates: ${error}`);
        res.sendStatus(500);
    });
});

router.get('/chapter/:templateId', rejectUnauthenticated, (req, res) => {  
    // select statement to get all template chapters from the database for a story
    let queryText = `SELECT * FROM "template_chapter"
                     WHERE "template_id" = $1;`;
    // select from the template_chapter database
    pool.query(queryText, [req.params.templateId]).then(async (result) => {
        res.send(result.rows);
    }).catch((error) => {
        // Console log and send staus code for error with template_chapter select
        console.log(`Error occured trying to get template_chapter: ${error}`);
        res.sendStatus(500);
    });
});

module.exports = router;