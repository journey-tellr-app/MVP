const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//incoming routes have /story/detail in route URL

//retrieve individual story details for viewing or editing
router.get('/:id', (req, res) => {
    if (req.isAuthenticated()) {

        const storyToGet = Number(req.params.id);
        const queryText = `SELECT * FROM story WHERE story.id = $1;`;
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

router.get('/chapter/:id', (req, res) => {
    if (req.isAuthenticated()) {

    } else {
        res.sendStatus(403);
    }
});

module.exports = router;