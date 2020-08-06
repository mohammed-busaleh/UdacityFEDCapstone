const weatherBitURL="https://api.weatherbit.io/v2.0/history/daily?"
const weatherBitKey="ce76d06b4ace49fe969d7331fd65ad57"
let result=document.getElementById("result");
async function handleSubmit(event) {
    event.preventDefault()
   
    // check what text was put into the form field
    // let formText = document.getElementById('name').value
    // if(Client.urlChecker(formText)){
    // postData('http://localhost:8090/submit', { formText });
    // }else{
    //     alert("please enter a valid url")
    // }

    result.innerHTML='';
    const departHTMLDate= document.getElementById("start_date");
    const leaveHTMLDate=document.getElementById("end_date");
    const departInputDate= new Date(departHTMLDate.value);
    const leaveInputDate= new Date(leaveHTMLDate.value);
    const currentDate= new Date();
    const yearAgo = new Date(departInputDate);
    yearAgo.setFullYear(2018);
    //console.log(formatDate(yearAgo))
    const start_date=new Date(yearAgo);
    yearAgo.setDate(yearAgo.getDate()+1)
    const end_date=new Date(yearAgo);
    //console.log("departInputDate==>",formatDate(departInputDate),"currntDate==>", formatDate(currentDate),
    // "/n diffrece", Math.round((departInputDate-currentDate)/ (1000 * 3600 * 24)),"startDate==>",
    // formatDate(start_date), "endDate==>", formatDate(end_date));
    let formText = document.getElementById('name').value
   // console.log(formText);
    let tripLength=Math.round((departInputDate-currentDate)/ (1000 * 3600 * 24))+1;
    const pixyData=await postData('http://localhost:8090/pixySubmit', { formText });
    const geoData=await postData('http://localhost:8090/geoSubmit', { formText });
    //console.log("geoData=>>",geoData.lng);
    
    getWeatherData(geoData.lat,geoData.lng,formatDate(start_date), formatDate(end_date),pixyData.webformatURL,tripLength,formatDate(departInputDate),formatDate(leaveInputDate))
}
function formatDate(givenDate){
    return givenDate.toISOString().substring(0,10);
}
const postData = async (url = '', data = {}) => {
   // console.log("url is==>", url);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(data)
    })
    // console.log("Data from handler"+JSON.stringify(data));
    try {
        //get results
        const newData = await response.json();
        return newData;
    } catch (error) {
        document.getElementById('results').appendChild(document.createElement('li').appendChild(document.createTextNode(error)));
        console.log("Error: " + error)
    }
}

const getImg=async(cityName)=>{

    console.log(pixaBayURL+pixaBayKey+"&q="+cityName+"&image_type=photo");
    const response=await fetch(pixaBayURL+pixaBayKey+"&q="+cityName+"&image_type=photo",{
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', },
    })
    try{
        const newData = await response.json();
        let result=document.getElementById('results');
        let img=document.createElement("img")
        img.src=newData.hits[0].webformatURL
        result.appendChild(img);
    }catch(error){
        console.log("PixyError: " + error)    
    }
    
}

const getWeatherData=async(lat,lan,start_date,end_date,imgURL,tripLength,departInputDate,leaveInputDate)=>{
    //console.log(weatherBitURL+"lat="+lat+"&lon="+lan+"&start_date="+start_date+"&end_date="+end_date+"&key="+weatherBitKey);
    const response = await fetch(weatherBitURL+"lat="+lat+"&lon="+lan+"&start_date="+start_date+"&end_date="+end_date+"&key="+weatherBitKey,{
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', },
        //body: JSON.stringify(weatherBitURL,lat,lan,start_date,end_date,weatherBitKey) 
    })
    try{
        const newData = await response.json();
        // add newData.data[0].temp to DOM
        // console.log(newData.data[0].temp);

        let flightDetailsList=document.createElement('ul');
        let weatherDetailsList=document.createElement('ul');
        let depart=document.createElement('li');
        let leave=document.createElement('li');
        let temp_min= document.createElement('li');
        let temp_max= document.createElement('li');
        let tripFromNow=document.createElement('li');
        let img=document.createElement("img");
        img.id="resultImg";
        flightDetailsList.id="resultFlightDetails"
        weatherDetailsList.id="resultWeatherDetails"
        img.src=imgURL;
        result.appendChild(img);
        depart.innerText="Departure Date: \n"+departInputDate+"\n";
        leave.innerText="Leave Date: \n"+leaveInputDate+"\n";
        console.log(newData);
        temp_min.innerText="Weather Info \nLow: "+newData.data[0].min_temp+" C \n";
        temp_max.innerText="High: "+newData.data[0].max_temp+" C ";
        tripFromNow.innerText="Travel Info: \nThe trip will be  "+tripLength+" days from today \n";
        flightDetailsList.appendChild(tripFromNow);
        flightDetailsList.appendChild(depart);
        flightDetailsList.appendChild(leave);
        weatherDetailsList.appendChild(temp_min);
        weatherDetailsList.appendChild(temp_max);
        result.appendChild(flightDetailsList);
        result.appendChild(weatherDetailsList);
    }catch(error){
        console.log("BitError: " + error) 
    }
}


export { handleSubmit }
