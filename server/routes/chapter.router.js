const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//edits chapter title, text, photo, and caption.  this should probably be several different put routes
router.put('/', (req, res) => {

});

module.exports = router;