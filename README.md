# Simple node app

## Requirements

- To work with this application you need to have [nodeJS](https://nodejs.dev) installed.


## Development

- Run `npm install` to install the dependencies


## Run it
1. Create the messages table

```
CREATE TABLE messages(text TEXT);
INSERT INTO messages(text) VALUES('hello simplon');
INSERT INTO messages(text) VALUES('hello world’);
```

2. Run the app (see the [node-postgres doc](https://node-postgres.com/features/connecting) for more details on environment variables)

```
PGDATABASE=? PGPASSWORD=? PGUSER=? node app.js
```
