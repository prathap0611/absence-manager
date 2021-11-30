## Introduction

Sample application to manage absentees.

## Getting Started

### Start the application
Follow the below instructions to start the application in local

1. Running the server
    1. `npm install` - Will install server dependencies
    2. `npm start` - Will run an express server in port 8080 by default.
2. Running the client
    1. `cd src-frontend`
    2. `npm install` - Will install client dependencies
    3. `npm start` - Will start dev server that serves react development server. Note if you change the server port, make sure to update the proxy url.

### Build the application for deployment

1. `npm install` - Will install server dependencies
2. `npm run build` - Installs the client dependencies and bundles the react app

The project is deployed to heroku and the application can be accessed at https://crewmister-absence-manager.herokuapp.com/