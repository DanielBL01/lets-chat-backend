# Lets Chat Backend

Server code for https://github.com/DanielBL01/lets-chat-frontend

## Table of Contents
- [About this project](#about-this-project)
    - [Purpose](#purpose)
    - [How it works](#how-it-works)
    - [Built With](#built-with)
    - [Future Improvements](#future-improvements)

## About This Project
### Purpose
As an immigrate who came to Canada as a very young age, I've naturally become a fluent english speaker while my first language has become very weak and so it's sometimes difficult to have lengthy conversations with my parents. This issue was the source of my inspiration to create this project.
### How it works
On the project landing page, you can choose which langauge you are proficient at writing and reading where the default language is set to English. You can also enter a username. Once you have filled in the following information, you can then begin looking for someone to enter a chat room with. The client will continuously ping the server to check for any users who also have not found a partner and match users to a chat room. Once you're in the chat room, your messages that you write in the language that you've specified will be automatically translated to your partners preferred langauge and vice versa using Google Cloud Platform's translation API.
### Built With
- HTML/CSS/JavaScript
- React
- Node/Express
- Socket.IO
- MongoDB
- Google Cloud Platform
- Axios
- Heroku
### Future Improvements
- Currently the time it takes for GCP to translate text takes a few seconds just for a single line of text. This could be a problem on either the server end or on the API end. This issue should be investigated and optimized for better performance.
- The UI is not the most user friendly. Modify the UI such that it feels more like a social platform.
