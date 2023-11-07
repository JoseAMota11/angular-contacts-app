# Angular Contacts App

This is a simple Angular App that shows data from a json-server API.

## How does it work?

In order to start this project you need to install `json-server` package using `npm install -g json-server`, then to run the server you need to run `json-server --watch db.json` in your terminal.

If the server fails the app can still show the data stored in the localStorage but you won't be able to neither add, update nor delete any contact because those are made through HTTP Request to the json-server.
