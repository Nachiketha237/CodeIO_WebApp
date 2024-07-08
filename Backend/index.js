const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const cors = require('cors')

const PORT = 8000
const app = express();

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.use('/', require('./routes/index.js'))

app.listen(PORT, () => {
    console.log(`Server is Listening on Port 8000`)
})