const weatherBitURL="https://api.weatherbit.io/v2.0/history/daily?"
const weatherBitKey="ce76d06b4ace49fe969d7331fd65ad57"
let result=document.getElementById("result");

/**
 *
 * @param event
 * @returns take inputs from user and call APIs
 */
async function handleSubmit(event) {
    event.preventDefault();
    result.innerHTML='' ;
    const departHTMLDate= document.getElementById("start_date");
    const leaveHTMLDate=document.getElementById("end_date");
    const departInputDate= new Date(departHTMLDate.value);
    const leaveInputDate= new Date(leaveHTMLDate.value);
    const currentDate= new Date();
    const yearAgo = new Date(departInputDate);
    yearAgo.setFullYear(2018);
    const start_date=new Date(yearAgo);
    yearAgo.setDate(yearAgo.getDate()+1)
    const end_date=new Date(yearAgo);
    if(departInputDate>leaveInputDate){
        alert("start date can not be after leave date ... please pick dates again");
        departHTMLDate.valueAsDate=null;
        leaveHTMLDate.valueAsDate=null;
        return;
    }

    let formText = document.getElementById('name').value
    let tripLength=Math.round((departInputDate-currentDate)/ (1000 * 3600 * 24));
    //console.log("tripLength==>"+tripLength+" departInputDate==>"+departInputDate+" currentDate==>"+currentDate);
    if(departHTMLDate.value!="" &&leaveHTMLDate.value!=""&&formText!="") {
        const pixyData = await postData('http://localhost:8090/pixySubmit', {formText});
        const geoData = await postData('http://localhost:8090/geoSubmit', {formText});
        getWeatherData(geoData.lat, geoData.lng, formatDate(start_date), formatDate(end_date), pixyData.webformatURL, tripLength, departInputDate, leaveInputDate)
    }else{
        alert("There is a missing infomation ... please check you information")
    }
}
function formatDate(givenDate){
    return givenDate.toISOString().substring(0,10);
}

/**
 *
 * @param url given url of the post request
 * @param data the response data
 * @returns JSON set of  data for weatherbit api
 */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(data)
    })
    try {
        //get results
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("Error: " + error)
        document.getElementById('results').appendChild(document.createElement('li').appendChild(document.createTextNode(error)));

    }
}

/**
 *
 * @param lat latitude
 * @param lan langitude
 * @param start_date
 * @param end_date
 * @param imgURL from pixybay api
 * @param tripLength from todya to the given departure date
 * @param departInputDate
 * @param leaveInputDate
 * @returns modify the dom for the result
 */
const getWeatherData=async(lat,lan,start_date,end_date,imgURL,tripLength,departInputDate,leaveInputDate)=>{
    const response = await fetch(weatherBitURL+"lat="+lat+"&lon="+lan+"&start_date="+start_date+"&end_date="+end_date+"&key="+weatherBitKey,{
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', },
    })
    try{
        const newData = await response.json();
        let flightDetailsList=document.createElement('ul');
        let weatherDetailsList=document.createElement('ul');
        let vacaLength=document.createElement('li');
        let depart=document.createElement('li');
        let leave=document.createElement('li');
        let temp_min= document.createElement('li');
        let temp_max= document.createElement('li');
        let tripFromNow=document.createElement('li');
        let img=document.createElement("img");
        img.id="resultImg";
        flightDetailsList.id="resultFlightDetails"

        weatherDetailsList.id="resultWeatherDetails"
        if(lat=== undefined) {
            img.src = "src/assests/Bean Eater-2.2s-600px.gif"
            result.style.backgroundColor="#cce5ff";
            let error = document.getElementById("error");
            error.innerText="ERROR in City Name";
            //result.appendChild((error))
            result.appendChild(img);
            throw '400';
        }
        error.innerText="";
        result.style.background="#008BF8"
        depart.innerText="Departure Date: \n"+formatDate(departInputDate)+"\n";
        leave.innerText="Leave Date: \n"+formatDate(leaveInputDate)+"\n";
        temp_min.innerText="Weather Info \nLow: "+newData.data[0].min_temp+" C \n "+"High: "+newData.data[0].max_temp+" C ";;
        vacaLength.innerText= "Your Trip Length is "+ Math.round((leaveInputDate-departInputDate)/ (1000 * 3600 * 24)) +" days";
        tripFromNow.innerText="Travel Info \nThe trip will be  "+tripLength+" days from today \n";
        flightDetailsList.appendChild(tripFromNow);
        flightDetailsList.appendChild(depart);
        flightDetailsList.appendChild(leave);
        flightDetailsList.appendChild(vacaLength);
        weatherDetailsList.appendChild(temp_min);
        result.appendChild(flightDetailsList);
        result.appendChild(weatherDetailsList);
        img.src=imgURL;
        result.appendChild(img);
    }catch(error){

        console.log("BitError: " + error) 
    }
}


export { handleSubmit }
