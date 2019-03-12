const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();

const contributorRouter = require('./contributor.router');
router.use('/contributor', contributorRouter);

//STRETCH router
const teamInviteRouter = require('./team.router');
router.use('/team', teamInviteRouter);

//router searches db for employees to help sending of invites
router.get('/:str', (req, res) => {
    console.log('in employee search router with', req.params.str);
    if (req.isAuthenticated()) {
        const queryText = `SELECT id as person_id, first_name, last_name,
                            profile_pic
                            FROM person 
                            WHERE first_name ILIKE $1 
                            OR last_name ILIKE $1
                            ORDER BY first_name
                            limit 10;`
        const values = [`${req.params.str}%`]
        pool.query(queryText, values)
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('error in invite get when searching for employees');
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
})

module.exports = router;