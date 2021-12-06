const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

require('./database');
var app = express();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public/imgs')));

const routes = require('./routes');
app.use(routes);

console.log("..::Server Started::..")
app.listen(3000);