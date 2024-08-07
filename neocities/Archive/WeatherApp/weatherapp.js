const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const otherInput = document.querySelector(".otherInput");
const card = document.querySelector(".card");
const celsiusInput = document.getElementById("celsiusInput");
const fahrenheitInput = document.getElementById("fahrenheitInput")
const apiKey = "175ba79bc1c33dfff19ad3e7269d4c4d";

weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please fill in parameters!");
    }
});

async function getWeatherData(city){
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    // https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}
    //https://api.openweathermap.org/data/2.5/weather?q=${city},{state},${country}&appid=${apiKey}

    const response = await fetch(apiURL);
    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data!");
    }
    else
    return await response.json();
}

function displayWeatherInfo(data){

    console.log(data)
    
    let  {name: city,
            sys: {country},
            main: {temp, humidity}, 
            weather: [{description, id}]} = data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;

        if(celsiusInput.checked){
            temp = (temp - 273.15);
            tempDisplay.textContent = `${temp.toFixed(1)}°C`;
        }
        else if (fahrenheitInput.checked){
            temp = ((temp - 273.15)* 9/5 + 32);
            tempDisplay.textContent = `${temp.toFixed(1)}°F`;
        }
        else {
            tempDisplay.textContent = "Pick a unit first!";
            tempDisplay.style.color = "red";
        }

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji")

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherID){

    switch(true){
        case(weatherID >= 200 && weatherID < 300):
            return "⛈";
        case(weatherID >= 300 && weatherID < 400):
            return "🌧";
        case(weatherID >= 500 && weatherID < 600):
            return "🌧";
        case(weatherID >= 600 && weatherID < 700):
            return "❄";
        case(weatherID >= 700 && weatherID < 800):
            return "🌫";
        case(weatherID === 800):
            return "☀";
        case(weatherID >= 801 && weatherID < 810):
            return "☁";
        default:
            return "🌸";
    }

}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}