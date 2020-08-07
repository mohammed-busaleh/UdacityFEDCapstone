var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
const request = require('request');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const geoNamesURL="http://api.geonames.org/searchJSON?q="
const geoUsername="mbusaleh"
const pixaBayURL="https://pixabay.com/api/?key="
const pixaBayKey="17723653-b6fc0b8511ec63e27b027e464"
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('dist'+ '/public'))

//console.log(JSON.stringify(mockAPIResponse))


app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})


// designates what port the app will listen to for incoming requests
app.listen(8090, function () {
    console.log('Example app listening on port 8090!')
    // console.log(`Your API key is ${process.env.API_ID}`);
    // console.log(`Your API key is ${process.env.API_Key}`);
})

function sendData(req, res){
    const text=JSON.stringify(req.body);
    textapi.sentiment({'text': text},function(error, response) {
        if (error === null) {
            let data={
                polarity: response.polarity,
                subjectivity: response.subjectivity,
                text: response.text,
                polarity_confidence: response.polarity_confidence,
                subjectivity_confidence: response.subjectivity_confidence
            }
            console.log("text is===>"+text);
            console.log("data is===>"+JSON.stringify(data));
            res.send(data);
        }else{
            console.log("Error==>"+error);
            res.send({error:"an error occured"});
        }
    });
}

async function sendGeoData(req, res){
    const cityName=req.body["formText"];
   
    console.log(geoNamesURL+cityName+"&fuzzy=0.8&username="+geoUsername);
    const response = request(geoNamesURL+cityName+"&fuzzy=0.8&username="+geoUsername, { json: true }, (err, result, body) => {
        if (err) { return console.log(err); }
        console.log("lat",JSON.stringify(result.body.geonames[0].lat),"lng",JSON.stringify(result.body.geonames[0].lng));
        res.send(result.body.geonames[0]);
        });
    //console.log("result==>",response);
      
}
async function sendPixyData(req, res){
    const cityName=req.body["formText"];
    console.log(pixaBayURL+pixaBayKey+"&q="+cityName+"_city"+"&image_type=photo");
    const response = request(pixaBayURL+pixaBayKey+"&q="+cityName+"&image_type=photo",{ json: true }, (err, result, body) => {
        if (err) { return console.log(err); }
        //console.log("pixyData",result.body.hits[0])
        res.send(result.body.hits[0]);
    });
}

app.post('/submit',sendData);
app.post('/geoSubmit',sendGeoData);
app.post("/pixySubmit", sendPixyData)
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

module.exports = app;