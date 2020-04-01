const express = require('express');
const app = express();
const setupDB = require('./config/database');
const port = 3035;

const router = require('./config/routes');

app.use(express.json());
app.use('/', router);

setupDB();

app.listen(port, () => {
    console.log("listening on port ", port);
})