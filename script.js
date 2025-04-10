const content = document.querySelector('.content');
const weatherIcon = document.querySelector('#icon');


function getDayName(datestr){
    const date = new Date(datestr);
    return date.toLocaleDateString('en-US', {weekday: 'long'});
}

document.getElementById("getWeatherBtn").addEventListener("click", () => {
    const place = document.getElementById("locationInput").value.trim();
    if (place !== "") {
        weather(place);
    }
});

async function weather(place){
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=MAUTMUFL5DAHHQV4KF7AZWFZW`,{mode:"cors"});
    const weatherData = await response.json();
    console.log(weatherData);
    weatherIcon.src = `Assets/${weatherData.currentConditions.icon}.gif`;
    document.querySelector('#weatherTemp').innerHTML = `${weatherData.currentConditions.temp}°F`;
    document.querySelector('#day0text').innerHTML = getDayName(weatherData.days[0].datetime);
    document.querySelector('#address').innerHTML = weatherData.resolvedAddress;
    document.querySelector('#humidity').innerHTML = `Humidity: ${weatherData.currentConditions.humidity}`;
    document.querySelector('#wind').innerHTML = `Wind: ${weatherData.currentConditions.windspeed}`;
    document.querySelector('.description').innerHTML = weatherData.description;
    // content.innerHTML = weatherData.currentConditions.conditions;

    for(let i =1;i<=5;i++){
        document.querySelector(`#day${i}img`).src = `Assets/${weatherData.days[i].icon}.gif`;
        console.log(weatherData.days[i].icon);
        
        const dayName  = getDayName(weatherData.days[i].datetime);
        document.querySelector(`#day${i}text`).innerHTML = `${dayName} | ${weatherData.days[i].temp}°F`
    }
}

weather();
