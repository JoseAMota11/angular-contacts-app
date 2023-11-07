# Angular Contacts App

This is a simple Angular App that shows data from a json-server API.

## How does it work?

To start the server you need to install the `json-server` package using `npm install -g json-server`, then to run the server you need to run `json-server --watch db.json` in your terminal.

If the server fails, the app can still display data stored in local storage, but it won't be able to add, update, or delete any contacts because those actions are performed via an HTTP request to the json server.
