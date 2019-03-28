# JourneyTellr

Turn authentic user experiences into seamless content that allows users to connect and easily tell their stories

## Built With

* Ant Design
* Express
* Node.js
* Passport
* PostgreSQL
* React
* Redux
* (a full list of dependencies can be found in `package.json`)
* Amazon Web Services

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

### Installing

Steps to get the development environment running:

1. Fork and clone this repository.

```bash
npm install 
npm run server
npm run client
```
2. Set up a PostgreSQL database using the project's database.sql file.

3. Set up an AWS Bucket. Free, but will require a credit card.
Helpful Guide: https://medium.com/@fabianopb/upload-files-with-node-and-react-to-aws-s3-in-3-steps-fdaa8581f2bd
Create an .env file and paste this information from your AWS account:
S3_BUCKET=(INSERT AWS INFO HERE)
AWS_ACCESS_KEY_ID=(INSERT AWS INFO HERE)
AWS_SECRET_ACCESS_KEY=(INSERT AWS INFO HERE)

## Completed Features

### Home Page

![](home.gif)

### Create A Story

![](createstory.gif)

### Upload Images

![](holidayparty.gif)

### Search Stories

![](searchstory.gif)

### Notifications

![](notifications.gif)

### View/Edit Profile

![](editprofile.gif)

### Next Steps

Additional features to be implemented in the future:

- [ ] Share a story
- [ ] Create a template functionality
- [ ] Allow users to click on other users profiles
- [ ] Create a team functionality
- [ ] Incorporate teams throughout the app
- [ ] Allow users to click on other users profiles
- [ ] Add the like button to chapters
- [ ] Create multiple images/captions for chapters
- [ ] Allow the users to upload video
- [ ] Password reset feature
- [ ] Let the user request to be a contributor

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Anthony Dunahee
* Dion Roloff
* James Tucker
* Kye Berkeland
* Matt Kleven

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
