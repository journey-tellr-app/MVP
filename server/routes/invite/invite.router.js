const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();

const app = express();

const contributorRouter = require('./contributor.router');
app.use('/contributor', contributorRouter);

//STRETCH router
const teamInviteRouter = require('./team.router');
app.use('/team', teamInviteRouter);

module.exports = router;