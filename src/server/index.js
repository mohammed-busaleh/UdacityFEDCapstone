const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
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

app.use(express.static('dist'))

// designates what port the app will listen to for incoming requests
app.listen(8090, function () {
    console.log('Example app listening on port 8090!')
})

/**
 *
 * @param req attach input data
 * @param res receive data form GeoNames api
 * @returns post requets for GeoNames api
 */
async function sendGeoData(req, res){
    const cityName=req.body["formText"];
    const response = request(geoNamesURL+cityName+"&fuzzy=0.8&username="+geoUsername, { json: true }, (err, result, body) => {
        if (err ) {
            console.log(err);
            res.send(err);
        }
        if(result.body.geonames.length<=0){
             let error={"error":"Geo null data"}
             return res.send(error);
        }
        res.send(result.body.geonames[0]);
        });
}
/**
 *
 * @param req attach input data
 * @param res receive data form pixabay api
 * @returns post requests for pixabay api
 */
async function sendPixyData(req, res){
    const cityName=req.body["formText"];
    const response = request(pixaBayURL+pixaBayKey+"&q="+cityName+"&image_type=photo",{ json: true }, (err, result, body) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        if(result.body.total<=0){
            let error={"error":"Pixy null data"}
            return res.send(error);
        }
        res.send(result.body.hits[0]);
    });
}

app.post('/geoSubmit',sendGeoData);

app.post("/pixySubmit", sendPixyData)

// app.get('/', function (req, res) {
//     res.sendFile('dist/index.html')
// })

module.exports = app;