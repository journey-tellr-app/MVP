const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const password = encryptLib.encryptPassword(req.body.password);
  const { email, first_name, last_name, profile_pic } = req.body;

  const queryText = `INSERT INTO person (email, password, first_name, last_name,
     profile_pic) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  pool.query(queryText, [email, password, first_name, last_name, profile_pic])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/update-profile', rejectUnauthenticated, (req, res) => {
  // console.log(req.body);

  // let user = req.params.id;
  let content = req.body;
  // console.log(content);

  const queryText = `
  UPDATE "person" 
  SET 
  "first_name"= $2,   
  "last_name"= $3,
  "bio"= $4
  WHERE 
  "id" = $1;`;
  const queryValues = [
    content.id,
    content.first_name,
    content.last_name,
    content.bio,
  ];
  pool.query(queryText, queryValues)
    .then((response) => {
      console.log(`server response: ${response}`);
      res.sendStatus(200);
    }).catch((error) => {
      console.log(`Problem with updating user info: ${error}`);
      res.sendStatus(500);
    })
});

router.put('/:id', rejectUnauthenticated, (req, res) => {  //sets profile pic
  // console.log(req.body);

  let user = req.user.id;
  let content = req.body.data.Location;
  // console.log(user, content);

  const queryText = `UPDATE "person" SET "profile_pic"= $1
                       WHERE "id" = $2;`;
  pool.query(queryText, [content, user])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
})

module.exports = router;
