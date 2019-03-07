const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

 //STRETCH retrieves recent images belonging to user
router.get('/', (req, res) => {
    
});

router.post('/photo', (req, res) => {
    //send picture to amazon

    //store url in photo db

});



module.exports = router;