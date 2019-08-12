const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

require('./model/connect');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/task', require('./route/task'));

app.listen(8080);

console.log('app start at http://localhost:8080');
