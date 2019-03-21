const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


const baseQuery = `SELECT story.id AS story_id, header_photo, title, caption, 
                          intro, date_started, completed, last_edit, profile_pic,
                          concat(first_name, ' ', last_name) AS full_name
                   FROM story 
                   JOIN person 
                   ON story.author = person.id`;

//This Router is for when user searches data base for specific stories 
//AUTHOR
router.get('/author/:id', rejectUnauthenticated, (req, res) => {
    // console.log('in search story', req.params);
    const queryParams = req.params.id;
    const queryText = `${baseQuery} WHERE LOWER (concat(first_name, ' ', last_name)) like $1
        limit 10;`;
    pool.query(queryText, [`%${queryParams}%`])
        .then((sqlResult) => {
            // console.log('results', sqlResult.rows);
            res.send(sqlResult.rows);
        }).catch((error) => {
            console.log(`error in /story-search router: ${error}`);
            res.sendStatus(500);
        })
});
//TITLE
router.get('/title/:id', rejectUnauthenticated, (req, res) => {
    // console.log('!!!!!!', req.params);
    const queryParams = req.params.id;
    const queryText = `${baseQuery}
                       where lower(title) like $1
                       limit 10;`;
    pool.query(queryText, [`%${queryParams}%`])
        .then((sqlResult) => {
            // console.log('results', sqlResult.rows);
            res.send(sqlResult.rows);
        }).catch((error) => {
            console.log(`error in /story-search router: ${error}`);
            res.sendStatus(500);
        })
});
//DESCRIPTION
router.get('/description/:id', rejectUnauthenticated, (req, res) => {
    // console.log('in search story', req.params);
    const queryParams = req.params.id;
    const queryText = `${baseQuery}
                       where lower(concat(intro, ' ', caption)) like $1
                       limit 10;`;
    pool.query(queryText, [`%${queryParams}%`])
        .then((sqlResult) => {
            // console.log('results', sqlResult.rows);
            res.send(sqlResult.rows);
        }).catch((error) => {
            console.log(`error in /story-search router: ${error}`);
            res.sendStatus(500);
        })
});

module.exports = router;