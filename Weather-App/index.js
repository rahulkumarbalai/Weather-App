let loc=document.getElementById("location");
let tempIcon=document.getElementById("temp-icon");
let tempValue=document.getElementById("temp-value");
let climate=document.getElementById("climate");
let iconFile;
const searchInp=document.getElementById("search-inp");
const searchBtn=document.getElementById("search-btn");

//setting weather by city entered by user
searchBtn.addEventListener('click',(e)=>{
    getWeather(searchInp.value);
    searchInp.value='';//resetting the input field
})
const getWeather=async (city)=>{
    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b4c5ea442d59609eaca00ed21d46e3a4`,{mode:'cors'});
        const weatherData=await response.json();
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        loc.textContent=name;
        climate.textContent=main;
        tempValue.textContent=Math.round(feels_like-273);
        if(id<300&&id>200){
            tempIcon.src="icons/thunder.png";
        }
        else if(id<400&&id>300){
            tempIcon.src="icons/cloudy.png";
        }
        else if(id<600&&id>500){
            tempIcon.src="icons/raining.png";
        }
        else if(id<700&&id>600){
            tempIcon.src="icons/snowman.png";
        }
        else if(id<800&&id>700){
            tempIcon.src="icons/smoke.png";
        }
        else if(id==800){
            tempIcon.src="icons/clear.png";
        }
    }
    catch(error){
        alert("City not found");
    }
}

//setting weather by location
window.addEventListener('load', ()=>{
    let lon;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            lon=position.coords.longitude;
            lat=position.coords.latitude;
            const api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b4c5ea442d59609eaca00ed21d46e3a4`;
            fetch(api).then((response)=>{
                return response.json();
            }).then(data=>{
                const{name}=data;
                const{feels_like}=data.main;
                const{id,main}=data.weather[0];

                loc.textContent=name;
                climate.textContent=main;
                tempValue.textContent=Math.round(feels_like-273);
                console.log(id);
                if(id<300&&id>200){
                    tempIcon.src="icons/thunder.png";
                    document.body.style.backgroundImage= "url('images/thunder.jpg')";
                }
                else if(id<400&&id>300){
                    tempIcon.src="icons/cloudy.png";
                    document.body.style.backgroundImage= "url('images/cloudy.jpg')";
                }
                else if(id<600&&id>500){
                    tempIcon.src="icons/raining.png";
                    document.body.style.backgroundImage= "url('images/rain.jpg')";
                }
                else if(id<700&&id>600){
                    tempIcon.src="icons/snowman.png";
                    document.body.style.backgroundImage= "url('images/snow.jpg')";
                }
                else if(id<800&&id>700){
                    tempIcon.src="icons/smoke.png";
                    document.body.style.backgroundImage= "url('images/smoke.jpg')";
                }
                else if(id==800){
                    tempIcon.src="icons/clear.png";
                    document.body.style.backgroundImage= "url('images/clear.jpg')";
                }
            })
        })
    }
})