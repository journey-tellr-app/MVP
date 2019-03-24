const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();

//get invites for stories
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const queryText = `SELECT author, story.id as story_id, title, header_photo, caption,
            contributor.id as invite_id,
            person.first_name, person.last_name, person.profile_pic
            FROM contributor
            JOIN story ON story_id = story.id
            JOIN person ON author = person.id
            WHERE person_id = $1
            AND status = 'pending';`;
        const values = [req.user.id]
        pool.query(queryText, values)
            .then((response) => {
                res.send(response.rows);
            }).catch((error) => {
                console.log('error in get story invites', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

//store invites to contribute on stories for use in notifications
router.post('/:storyId', (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.body);
        const queryValueString = [ ];
        const values = [Number(req.params.storyId), 'pending']
        let scrubCounter = 3;
        req.body.map( (contributor) => {
            values.push(contributor.person_id);
            queryValueString.push(`($1, $2, $${scrubCounter++})`)
            // console.log(scrubCounter);
            // console.log(values);
            // console.log(queryValueString);
        });
        let queryText = `INSERT INTO "contributor" ("story_id", "status", "person_id")
                         VALUES ${queryValueString.join(',')};`;
        pool.query(queryText, values).then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            // console log and error message if post does not work
            console.log(`Error in /invite/contributor POST route: ${error}`);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

//user sends response to invite, changes contributor.status
router.put('/:id/:status', (req, res) => {
    if(req.isAuthenticated()){
        const queryText = 'UPDATE contributor SET status = $1 WHERE id = $2;';
        const values = [req.params.status, req.params.id]
        pool.query(queryText, values)
            .then(response => {
                res.send(response.rows);
            }).catch(error => {
                console.log('Error in contributor router put', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});



module.exports = router;