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
router.post('/', (req, res) => {

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

//story author can remove contributors from story by deleting person id from contributor table
router.delete('/', (req, res) => {

})



module.exports = router;