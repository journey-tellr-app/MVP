const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const storyDetailRouter = require('./story.detail.router');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//gets users contribution stories for home page feed
router.get('/story-contributions', (req, res) => {
    if (req.isAuthenticated()) {
        // console.log(`req.body.id: ${req.user.id}`);
        const userId = req.user.id;
        const queryText = `SELECT header_photo, profile_pic, first_name, last_name, 
                               author, title, caption, intro, date_started, completed, last_edit, 
                               is_template, (person.id) as person_id, (story.id) as story_id, count(story_likes.story_id) as likes
                           FROM story
                           JOIN person 
                           ON story.author = person.id
                           full outer join story_likes
                           ON story_likes.story_id = story.id
                           WHERE author = $1
                           GROUP BY story.header_photo, person.profile_pic, 
                               person.first_name, person.last_name, author, title, caption, 
                               intro, date_started, completed, last_edit, is_template, story.id, person.id;`;
        pool.query(queryText, [userId])
            .then((sqlResult) => {
                res.send(sqlResult.rows);
            }).catch((error) => {
                console.log(`error in /story-contributions router: ${error}`);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }

});

//retrieves 10 recent stories for home page feed
router.get('/recent', (req, res) => {

    if (req.isAuthenticated()) {
        // console.log('in /story/search router');
        const queryText = `SELECT (person.id) as person_id, (story.id) as story_id, first_name, last_name,
                           profile_pic, header_photo, title, count(story_likes.story_id) as likes, completed,date_started
                           FROM person
                           JOIN story
                           ON person.id = story.author
                           full outer join story_likes
                           ON story_likes.story_id = story.id
                           GROUP BY person.id, story.id, person.first_name, person.last_name, 
                           person.profile_pic, story.header_photo, story.title, story.completed
                           order by likes desc, date_started desc
                           limit 10;`;
        pool.query(queryText)
            .then((sqlResult) => {
                res.send(sqlResult.rows);
            }).catch((error) => {
                console.log(`Error in /recent route: ${error}`);
            })
    } else {
        res.sendStatus(403);
    }


});

//creates new story with author, title, etc
router.post('/', rejectUnauthenticated, (req, res) => {
    const queryText = `INSERT INTO "story" ("title", "caption", "header_photo", "intro", "author", "is_template")
                       VALUES ($1, $2, $3, $4, $5, $6)
                       RETURNING "id";`;
    pool.query(queryText, [req.body.title, req.body.caption, req.body.header_photo, req.body.intro, req.user.id, req.body.is_template]).then((result) => {
        // send a response with the new story id back to the client
        res.send(result.rows[0].id.toString());
    }).catch((error) => {
        // console log and error message for POST error
        console.log(`Error in story router POST: ${error}`);
        res.sendStatus(500);
    });
}); // end POST route


//edits made a story title, photo, caption after its begun
router.put('/', (req, res) => {
    const { id, colName, updatedValue } = req.body;
    if (req.isAuthenticated() && (colName === 'Intro' || colName === 'Caption' || colName === 'Title')) {
        const queryText = `UPDATE story 
            SET ${colName.toLowerCase()} = $1 
            WHERE id = $2;`;
        const value = [updatedValue, id];
        pool.query(queryText, value)
            .then(response => {
                res.sendStatus(201);
            }).catch(e => {
                console.log(`error in /story put`, e);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

//when story finalized, sets completed to true
router.put('/complete/:storyId', rejectUnauthenticated, (req, res) => {
    const queryText = `UPDATE story 
        SET completed = true WHERE author = $1 AND id = $2;`;
    const queryValues = [req.user.id, req.params.storyId];
    pool.query(queryText, queryValues)
        .then(response => {
            res.sendStatus(200);
        }).catch(e => {
            console.log('error in /story/complete put route', e);
            res.sendStatus(500);
        })
});

// change the story image
router.put('/image/:storyId', rejectUnauthenticated, (req, res) => {
    // sql statement for inserting new photo
    let queryText = `UPDATE "story"
                     SET "header_photo" = $1
                     WHERE "id" = $2;`;
    pool.query(queryText,[req.body.image, Number(req.params.storyId)]).then((result) => {
        // send back a confirmation code
        res.sendStatus(201);
    }).catch((error) => {
        // console log and error message
        console.log(`Error with changing the story image: ${error}`);
        res.sendStatus(500);
    });
});

//STRETCH admin can remove of a story
router.delete('/', (req, res) => {

});

router.get('/contributors/:id', (req, res) => {
    const storyId = req.params.id;
    const queryText = `SELECT story_id, count(concat(person.first_name, ' ', person.last_name)) AS contributors
                       FROM contributor
                       JOIN person
                       ON contributor.person_id = person.id
                       JOIN story
                       ON story_id = story.id
                       WHERE story_id = $1
                       GROUP BY story.id, contributor.story_id;`;
    pool.query(queryText, [storyId])
    .then( (sqlResult) => {
        res.send(sqlResult.rows);
    }).catch( (e) => {
        console.log(`Error in contributors router: ${e}`);
    });
});

module.exports = router;