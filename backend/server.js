const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
var router = require('./routes/index')
var database = require('./routes/database')

const API_PORT = (process.env.PORT || 3001);
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', router);
app.use('/data', database);

app.listen(API_PORT, () => {
    console.log(`LISTENING ON PORT ${API_PORT}`)
});
