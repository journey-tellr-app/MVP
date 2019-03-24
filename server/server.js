
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const inviteRouter = require('./routes/invite/invite.router');
const storyRouter = require('./routes/story.router');
const likeRouter = require('./routes/like.router');
const chapterRouter = require('./routes/chapter.router');
const awsS3Router = require('./routes/aws.s3.router');
const fakesRouter = require('./routes/fakes.router');
const templateRouter = require('./routes/template.router');
const storyDetailRouter = require('./routes/story.detail.router');
const storySearchRouter = require('./routes/storySearch.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/invite', inviteRouter);
app.use('/story', storyRouter);
app.use('/like', likeRouter);
app.use('/chapter', chapterRouter);
app.use('/awsS3', awsS3Router);
app.use('/fakes', fakesRouter);
app.use('/template', templateRouter);
app.use('/story/detail', storyDetailRouter);

app.use('/search-story', storySearchRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
