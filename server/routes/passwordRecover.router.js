const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// router.put('/', (req, res) => {
//     const { id, colName, updatedValue } = req.body;
//     if (colName === 'Text' || colName === 'Title') {
//         const queryText = `UPDATE chapter 
//             SET ${colName.toLowerCase()} = $1 
//             WHERE id = $2
//             RETURNING story_id;`;
//         const value = [updatedValue, id];
//         pool.query(queryText, value)
//             .then(response => {
//                 res.send(response.rows);
//             }).catch(e => {
//                 console.log(`error in /chapter put`, e);
//                 res.sendStatus(500);
//             });
//     } else {
//         res.sendStatus(403);
//     }
// });

module.exports = router;