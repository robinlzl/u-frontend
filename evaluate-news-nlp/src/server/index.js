var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
const aylien = require('aylien_textapi')
const dotenv = require('dotenv')
dotenv.config()

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('dist'))

const textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY

});
console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

app.post('/textapi', (req, res) => {

    const text = req.body
    try {
        formText = text.formText
        textapi.sentiment({text : formText}, (err, response) => {

            res.send(response)
        })
    } catch(error) {
        console.log('error', error)
    }
})
// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})
