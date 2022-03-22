const fs = require("fs");
const axios= require("axios");
const http = require("http");

function changeData(fileData, apiData)
{
    console.log(apiData);
    var cityCountryDetails = apiData.name+","+apiData.sys.country;
    var minMaxTempDetails = "Min : "+apiData.main.temp_min+" | Max : "+apiData.main.temp_max;
    
   


    fileData = fileData.replace("#CITY_COUNTRY#", cityCountryDetails);
    fileData = fileData.replace("#TEMPERATURE#", apiData.main.temp);
    fileData = fileData.replace("#MIN_MAX_TEMPERATURE#", minMaxTempDetails);
   
    return fileData;
    
    
}

const server = http.createServer((request, response)=>{

    if(request.url=='/') {
        
        
    axios.get('https://api.openweathermap.org/data/2.5/weather?q=Coimbatore&appid=ca2440bd505d75551ce8e92f6942ef5c')   

    .then(function (apiResponse){
        //console.log(apiResponse.data);
        var fileData = fs.readFileSync("index.html","UTF-8");
        var updatedFileData=changeData(fileData, apiResponse.data);

        response.write(updatedFileData);
        response.end();

      
    })
    
    .catch(function (error){
        console.log(error);
    })
    .then(function (){
    
    });
    
 

    }

})

server.listen(3000);

 
   
