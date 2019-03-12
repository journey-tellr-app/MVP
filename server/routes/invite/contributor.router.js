const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();

//get invites for stories
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const queryText = `SELECT * FROM contributor WHERE person_id = $1;`;
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
router.put('/', (req, res) => {

});

//story author can remove contributors from story by deleting person id from contributor table
router.delete('/', (req, res) => {

})



module.exports = router;