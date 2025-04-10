document.getElementById('submit').addEventListener('click', () => {
    const place = document.getElementById('location').value;

    function updateTemp(data) {
        const weatherIcon = document.getElementById("weatherIcon");
        weatherIcon.src = data.current.condition.icon;
        weatherIcon.style.display = "block"; 
        document.getElementById("temp").innerHTML = `${data.current.temp_c}&deg;C`;
        document.getElementById('city').innerHTML=data.location.name;
        document.getElementById("condition").innerHTML = `Condition: ${data.current.condition.text}`;
        document.getElementById("humidity").innerHTML = `Humidity: ${data.current.humidity}%`;
        document.getElementById('speed').innerHTML=`wind speed: ${data.current.wind_kph}km/h`;
        document.getElementById('update').innerHTML=`last updated: ${data.current.last_updated}`;
    }

    if (place.trim() !== "") {
        fetch(`https://api.weatherapi.com/v1/current.json?key=cb6538f8a8fc4df1be492634250201&q=${place}&aqi=yes`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch weather data");
            }
            return response.json();
        })
        .then(data => updateTemp(data))
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('Unable to fetch weather for that location. Please enter a valid city name.');
        });
    } else {
        alert("Please enter a location.");
    }
});

document.getElementById('reset').addEventListener('click', () => {
    document.getElementById('location').value = "";
    document.getElementById("weatherIcon").style.display = "none"; // Hide image on reset
    document.getElementById("temp").innerHTML = "";
    document.getElementById("condition").innerHTML = "";
    document.getElementById("humidity").innerHTML = "";
    document.getElementById('city').innerHTML="";
    document.getElementById('speed').innerHTML="";
    document.getElementById('update').innerHTML="";
});

// document.addEventListener("DOMContentLoaded", () => {
//     const checkbox = document.getElementById("dark");

//     checkbox.addEventListener("change", () => {
//         document.body.classList.toggle("darkmode", checkbox.checked);//classList.toggle("darkmode", checkbox.checked) adds the class if checked and removes it if unchecked
//     });
// });
// local save
document.addEventListener("DOMContentLoaded",()=>{
    const checkbox=document.getElementById("dark");

    if(localStorage.getItem("darkMode")==="enabled"){
        document.body.classList.add("darkmode");
        checkbox.checked=true;
    }
    checkbox.addEventListener("change",()=>{
        if(checkbox.checked){
            document.body.classList.add("darkmode");
            localStorage.setItem("darkMode","enabled"); // save the state in local memory
        }
        else{
            document.body.classList.remove("darkmode");
            localStorage.setItem("darkMode","disabled") // remove the state
        }
    })
})