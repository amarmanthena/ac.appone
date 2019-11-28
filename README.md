# Getting started
Make sure you have the [Angular CLI](https://github.com/angular/angular-cli) and [Node.js](https://nodejs.org/en/) installed globally. Version used during the develoment
* Angular CLI: 8.3.19
* Node: 10.15.3
* OS: win32 x64

## Running Project
* Go to project folder and run `npm install` to resolve all dependencies 
* Run `npm run start:app:mock:dbserver` for a app to launch. A browser will automatically open

## Building the project
* Run `ng build` to build the project. The build artifacts will be stored in the dist/ directory. Use the `-prod` flag for a production build.

# Functionality overview
* The example application is a user management app. It uses a json file to store all the user information.

## General functionality
* Home page with a dashaboard displaying count of all the users
* Users List gives a view of the all users
* From users list page, a user can be added/deleted or updated.

# Unit Test and Code Coverage
* Run `npm run start:test` for running unit tests
* Run `npm run start:test-coverage` to generate a coverage report. Once the test is completed a new /coverage folder will appear in the project. Open index.html in any browser to view the results.

# Additional Info
Following are some of the plugins used in the development of the project
* ***Angular Material*** for UI components
* ***angular-in-memory-web-api***: Used this package to store the data in memory, but eventually moved to json file
* ***json-server***: This acts as a data store in a json file and also has web api capabilites that are being used for the project.
* ***concurrently***: This is used to run multiple npm commands concurently. Since json-server needs to be run first before the angualr app is served, this has been used to run serving json-server and angular app concurently.