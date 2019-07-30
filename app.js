const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const api = require('./routes')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('static'))
app.use('/', api)

module.exports = app
