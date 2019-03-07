const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();

//STRETCH router
const teamInviteRouter = require('./team.invite.router');

//get invites for stories
router.get('/', (req, res) => {
    
});

//store invites to contribute on stories for use in notifications
router.post('/', (req, res) => {

});

//user sends response to invite, changes contributor.status
router.put('/', (req, res) => {
    
});

//story author can remove contributors from story by deleting from contributor table
router.delete('/', (req, res) => {

})

app.use('/team', teamInviteRouter);

module.exports = router;