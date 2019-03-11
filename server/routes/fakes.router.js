const express = require('express');
const pool = require('../modules/pool');
const faker = require('faker');
const router = express.Router();

//this will allow an admin to add 30 randomized 
//stories to the story table from the about page
router.post('/story', (req, res) => {
    (async () => {
        const client = await pool.connect();

         try {
             await client.query('BEGIN');

             for (let i = 0; i < 30; i++) {
                 const randomAuthor = Math.floor(Math.random() * Math.floor(300));
                 const fakeStory =
                 {
                     header_photo: faker.image.image(),
                     author: randomAuthor,
                     title: faker.name.findName() + `'s First Day!`,
                     caption: faker.lorem.sentence(),
                     intro: faker.lorem.text()
                 }
                 console.log(fakeStory);
                 const queryText = `INSERT INTO story (header_photo, author, title, caption, intro) 
                                    VALUES ($1, $2, $3, $4, $5);`;
                 const values = [
                                 fakeStory.header_photo,
                                 fakeStory.author,
                                 fakeStory.title,
                                 fakeStory.caption,
                                 fakeStory.intro
                                ];
                 const fakeStoryResult = await client.query(queryText, values);
             }

             await client.query('COMMIT');
             res.sendStatus(201);

         } catch(error) {
             console.log('ROLLBACK', error);
             await client.query('ROLLBACK');
             throw error;
         } finally {
             client.release();
         }
         
     })().catch((error) => {
         console.log('CATCH', error);
         res.sendStatus(500);
     })
});

//this will allow an admin to add 300 randomized 
//people to the person table from the about page
router.post('/', (req, res) => {

        (async () => {
           const client = await pool.connect();

            try {
                await client.query('BEGIN');

                for (let i = 0; i < 300; i++) {
                    const fakePerson =
                    {
                        first_name: faker.name.firstName(),
                        last_name: faker.name.lastName(),
                        email: faker.internet.email(),
                        password: faker.internet.password(),
                        profile_pic: faker.image.avatar()
                    }
                    const queryText = `INSERT INTO person (first_name, last_name, email, password, profile_pic) 
                                       VALUES ($1, $2, $3, $4, $5);`;
                    const values = [
                                    fakePerson.first_name,
                                    fakePerson.last_name,
                                    fakePerson.email,
                                    fakePerson.password,
                                    fakePerson.profile_pic
                                   ];
                    const fakePersonResult = await client.query(queryText, values);
                }

                await client.query('COMMIT');
                res.sendStatus(201);

            } catch(error) {
                console.log('ROLLBACK', error);
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
            }
            
        })().catch((error) => {
            console.log('CATCH', error);
            res.sendStatus(500);
        })
    
});

module.exports = router;