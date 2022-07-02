
const pageHead = document.querySelector('.location-timezone');
const tempDescription = document.querySelector('.temperature-info');
const weatherIcon = document.querySelector('.icon');

const tempArea = document.querySelector('.degree-wrapper ');
const tempDegree = document.querySelector('.temperature-degree');
const tempSpan = document.querySelector('.degree-wrapper span');

window.addEventListener('load', () =>{
    //set longitude and latitude
    let long , lat ;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude
            const apiKey = "d2e4254d4dc806e59ff3fbc97f0cdd0a";
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

            fetch(apiUrl).then( response =>{
                return response.json();
            }).then( data =>{
                pageHead.textContent = `${data.sys.country}/${data.name}`;
                const degreeinF =  Math.floor((data.main.temp-273.15) * 1.8+32 );
                tempDegree.textContent = degreeinF;
                tempDescription.textContent = data.weather[0].description ;
                // weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`  ;
                weatherIcon.src = `https://openweathermap.org/img/wn/10d@2x.png`  ;
                
                //change weather degree from F to C
                tempArea.addEventListener('click' , () =>{
                    if(tempSpan.textContent === "F"){
                        tempSpan.textContent = "C";
                        tempDegree.textContent = Math.floor((degreeinF - 32) * 5/9) ;
                    } else if(tempSpan.textContent === "C"){
                        tempSpan.textContent = "F";
                        tempDegree.textContent = degreeinF;
                    }
                    
                })
                
            })
            
        } ) ;

      

    } 
   
})