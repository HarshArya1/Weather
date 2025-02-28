document.getElementById('wind').addEventListener('click',(event)=>{
    const place = document.getElementById('location').value;
    
    function updateTemp(data){
       const element = document.getElementById('weatherInfo');
       element.innerHTML = `Today's Temperature: ${data.current.temp_c} &deg;C`;

       const wind=document.createElement('div');
       wind.id="yo";
       wind.innerHTML=`Wind Speed is ${data.current.wind_kph} km/h`;
       document.getElementById('wind').appendChild(wind); 
       wind.style.marginTop="5px";

       const hummi=document.createElement('div');
       hummi.id="hum"
       hummi.innerHTML=`humidity is ${data.current.humidity}`;
       document.getElementById('wind').appendChild(hummi); 
       hummi.style.marginTop="5px";


       const container=document.createElement('div')
       container.id="container";
       let img = document.createElement('img');
       img.src = `${data.current.condition.icon}`;
       container.appendChild(img);

       let weather=document.createElement('span');
       weather.innerHTML=data.current.condition.text;
       weather.style.fontSize="20px"
       container.appendChild(weather);
       document.getElementById('wind').appendChild(container);
    }
       if(event.target.id==="submit"){
        const prom = fetch(`http://api.weatherapi.com/v1/current.json?key=cb6538f8a8fc4df1be492634250201&q=${place}&aqi=yes`)
        prom
        .then(response=>response.json())
        .then(data=> updateTemp(data));
    }
    else if(event.target.id==="reset"){
        document.querySelector('#location').value="";
        document.getElementById('weatherInfo').innerHTML = ``;
        if (document.getElementById('yo')) document.getElementById('yo').remove();
        if (document.getElementById('hum')) document.getElementById('hum').remove();
        if (document.getElementById('container')) document.getElementById('container').remove();
    }
})



