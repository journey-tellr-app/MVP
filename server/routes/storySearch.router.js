const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//This Router is for when user searches data base for specific stories 

//AUTHOR
router.get('/:id', (req, res) => {
    console.log('in search story', req.params);
    const queryParams = req.params.id;
    const queryText = `
    select *, concat(first_name, ' ', last_name) as full_name
    from story
    join person
    on story.author = person.id
    where concat(first_name, ' ', last_name) like $1
    limit 10;`;
    pool.query(queryText, [`%${queryParams}%`])
        .then((sqlResult) => {
            console.log('results', sqlResult.rows);
            
            res.send(sqlResult.rows);
        }).catch((error) => {
            console.log(`error in /story-search router: ${error}`);
            res.sendStatus(500);
        })
});
//TITLE
router.get('/:id', (req, res) => {
    console.log('in search story', req.params);
    const queryParams = req.params.id;
    const queryText = `
    select *
    from story
    join person
    on story.author = person.id
    where title like $1
    limit 10;`;
    pool.query(queryText, [`%${queryParams}%`])
        .then((sqlResult) => {
            console.log('results', sqlResult.rows);

            res.send(sqlResult.rows);
        }).catch((error) => {
            console.log(`error in /story-search router: ${error}`);
            res.sendStatus(500);
        })
});
//DESCRIPTION
router.get('/:id', (req, res) => {
    console.log('in search story', req.params);
    const queryParams = req.params.id;
    const queryText = `
    select *
    from story
    join person
    on story.author = person.id
    where concat(intro, ' ', caption) like $1
    limit 10;`;
    pool.query(queryText, [`%${queryParams}%`])
        .then((sqlResult) => {
            console.log('results', sqlResult.rows);

            res.send(sqlResult.rows);
        }).catch((error) => {
            console.log(`error in /story-search router: ${error}`);
            res.sendStatus(500);
        })
});

module.exports = router;