const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


//adds to story_likes table user_id and story_id
router.post('/', (req, res) => {

});

module.exports = router;