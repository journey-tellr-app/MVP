const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    // select statement to get all template stories from the database
    console.log('in get template_story');
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

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;