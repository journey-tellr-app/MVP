const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

 //STRETCH retrieves recent images belonging to user
router.get('/', (req, res) => {
    
});

 //adding or updating profile pic
router.post('/', (req, res) => {
    //send picture to amazon

    //then update person.profile_pic url
});



module.exports = router;