const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//when user searches data base for specific stories 
router.get('/search', (req, res) => {
    
});

//retrieves 10 recent stories for home page feed
router.get('/recent', (req, res) => {

});

//retrieve individual story details for viewing or editing
router.get('/detail', (req, res) => {

});

//retrieves template story from template table for autopopulating story
router.get('/template', (req, res) => {

});

//creates new story with author, title, etc
router.post('/', (req, res) => {

});

//edits made a story title, photo, caption after its begun
router.put('/edit', (req, res) => {

})

//when story finalized, sets completed to true
router.put('/complete', (req, res)=> {

});

//STRETCH admin can remove of a story
router.delete('/', (req, res)=> {

});

module.exports = router;