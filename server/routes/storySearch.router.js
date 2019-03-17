const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const baseQuery = `select story.id as story_id, header_photo, title, caption, 
    intro, date_started, completed, last_edit, profile_pic,
    concat(first_name, ' ', last_name) as full_name
    from story join person on story.author = person.id`

//This Router is for when user searches data base for specific stories 
//AUTHOR
router.get('/author/:id', (req, res) => {
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
router.get('/title/:id', (req, res) => {
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
router.get('/description/:id', (req, res) => {
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