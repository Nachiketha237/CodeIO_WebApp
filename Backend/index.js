const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const cors = require('cors')

const PORT = 8000
const app = express();

// Enable CORS
app.use(cors())

// Parse incoming JSON requests
app.use(bodyParser.json())
// Parse URL-encoded data with the querystring library
app.use(bodyParser.urlencoded({ extended: false }))

// Use routes defined in the './routes/index.js' file
app.use('/', require('./routes/index.js'))

// Start the server and listen on port 8000
app.listen(PORT, () => {
    console.log(`Server is Listening on Port 8000`)
})
