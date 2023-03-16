// const { response, request } = require("express");

/* Global Variables */
const btn = document.getElementById('generate');

const zipcode =  document.getElementById('zip');
const apiKey = "9f591e0437a2f363d373b4541f1dcec3";

let feelings = document.getElementById("feelings");





// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// check for zip code validation and sends data
function IsZipCode(){

    // declaring regular expression to test zip code validation 
    var validZipTest = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

    //using reqular expresion .test() method, we can validate the zipcode
    if(validZipTest.test(Number(zipcode.value))){
        let myfeeling=feelings.value;
        getInfo().then((temp)=>{ 

        postData('/posturl',{temp,newDate, myfeeling});
        UpdateUI();

    });
    }
    else{
        alert('please enter a valid zip code');
        console.log(zipcode.value);
    }

}

// get request from API

const getInfo = async ()=>{

    try {
        //get temperature degree  REQUEST
        const request =await fetch(` https://api.openweathermap.org/data/2.5/weather?zip=${zipcode.value},us&appid=${apiKey}&units=metric`);
        const response = await request.json();
         // get RESPONSE from weather API and stores it in temp
        const temp = response.main.temp;
        const date = response.main.Date;
        console.log(temp);
        return temp;
        
        
    } catch (err) {
        console.log(err);

    }
}



// POST route in app file 

    const postData = async ( url = '', data = {})=>{
        try{

          const response = await fetch(url, {
          method: 'POST', 
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
         // Body data type must match "Content-Type" header        
          body: JSON.stringify(data), })
          

          }
        catch(err){
            console.log('error',err);
        }
        
    }
    
// Update UI in HTML file 
 
const UpdateUI=async()=>{

    const req = await fetch('/geturl');
    try{
      
        const allData = await req.json();
        console.log(allData);
        document.getElementById('date').innerHTML = `Date: ${allData.newDate}`;
        document.getElementById('temp').innerHTML = `The temperature is : ${allData.temp} degree Celceius`;   
        document.getElementById('content').innerHTML = `your feeling: ${allData.myfeeling}` ;  
    }
    catch(err){
        console.log("error",err);
    }
}


//GET route in app file 

//button behaviour

btn.addEventListener("click",()=>{
    
  IsZipCode();
   
})