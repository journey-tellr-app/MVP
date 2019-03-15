const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//incoming routes have /story/detail in route URL

//retrieve individual story details for viewing or editing
router.get('/:id', (req, res) => {
    // console.log('in story/detail with id', req.params.id)
    if (req.isAuthenticated()) {

        const storyToGet = Number(req.params.id);
        const queryText = `SELECT story.id, header_photo, caption, title, intro, completed, date_started,
	        author as author_id, concat(first_name, ' ', last_name) as author_name 
	        FROM story JOIN person ON author = person.id WHERE story.id = $1;`;
        pool.query(queryText, [storyToGet])
            .then((sqlResult) => {
                res.send(sqlResult.rows);
            }).catch((e) => {
                console.log(`Error getting individual story detail: ${e}`);
            })
    } else {
        res.sendStatus(403);
    }
});

router.get('/likes/:id', (req, res) => {
    if (req.isAuthenticated()) {

        const storyToGet = Number(req.params.id);
        const queryText = `SELECT * FROM story WHERE story.id = $1;`;
        pool.query(queryText, [storyToGet])
            .then((sqlResult) => {
                res.send(sqlResult.rows);
                res.sendStatus(200);
            }).catch((e) => {
                console.log(`Error getting individual story detail: ${e}`);
            })
    } else {
        res.sendStatus(403);
    }
});

router.get('/contributor/:id', (req, res) => {
    // console.log(Number(req.params.id));
    if (req.isAuthenticated()) {
        const storyToGet = Number(req.params.id);
        const queryText = `SELECT * FROM contributor WHERE story_id = $1 AND status = 'accepted';`;
        pool.query(queryText, [storyToGet])
            .then((sqlResult) => {
                res.send(sqlResult.rows);
            }).catch((e) => {
                console.log(`Error getting individual story detail: ${e}`);
            })
    } else {
        res.sendStatus(403);
    }
});

router.get('/chapter/:id', (req, res) => {
    // console.log('in story/detail/chapter get');
    if (req.isAuthenticated()) {
        const queryText = 'SELECT * FROM chapter WHERE story_id = $1 ORDER BY chapter."order";';
        const values = [req.params.id];
        pool.query(queryText, values)
            .then(response => {
                res.send(response.rows);
            }).catch(error => {
                console.log('error in story/detail/chapter get', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;