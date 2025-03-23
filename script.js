
document.querySelector(".weather").style.display = 'none';

let factValue = document.querySelector(".input_city");
const button = document.querySelector(".button_click");
let funFact = document.querySelector(".facts_para");
const weatherUpdate = document.querySelector(".weather-icon");


button.addEventListener("click", (click_value) => {
    let inputValue = document.querySelector(".input_city").value;
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${inputValue}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector(".weather").style.display = 'block';
            //console.log(data.extract);
            const htmlString = data.extract;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlString;
            const text = tempDiv.textContent;
            document.querySelector(".city").innerHTML = inputValue;
            // Split into sentences (basic split by period)
            const sentences = text.split('.').map(sentence => sentence.trim()).filter(Boolean);

            // Pick random sentence
            const randomSentence = sentences[Math.floor(Math.random() * sentences.length)] + '.';
            console.log(randomSentence);
            funFact.textContent = `${randomSentence}`;
        })

        .catch(error => console.error(error));

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=3a5607b5f9cc106140176afa79cbaeec&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let tempApi = data.main.temp;
            let humidityApi = data.main.humidity;
            let windSpeedApi = data.wind.speed;
            let currentWeatherApi = data.weather[0].main;

            const temp = document.querySelector(".temp");
            const humidity = document.querySelector(".humidity");
            const windSpeed = document.querySelector(".wind");


            if (currentWeatherApi == "Thunderstorm") {
                console.log('Thunderstorm');
                weatherUpdate.className = '';
                weatherUpdate.classList.add("weather-icon", "fa-solid", "fa-cloud-bolt");
            } else if (currentWeatherApi == "Rain") {
                console.log('Rain');
                weatherUpdate.className = '';
                weatherUpdate.classList.add("weather-icon", "fa-solid", "fa-cloud-rain");
            } else if (currentWeatherApi == "Snow") {
                console.log('Snow');
                weatherUpdate.className = '';
                weatherUpdate.classList.add("weather-icon", "fa-solid", "fa-snowflake");
            } else if (currentWeatherApi == "Mist") {
                console.log('mist');
                weatherUpdate.className = '';
                weatherUpdate.classList.add("weather-icon", "fa-solid", "fa-smog");
            } else if (currentWeatherApi == "Clear") {
                console.log('Clear');
                weatherUpdate.className = '';
                weatherUpdate.classList.add("weather-icon", "fa-solid", "fa-sun");
            } else if (currentWeatherApi == "Clouds") {
                console.log('Clouds');
                weatherUpdate.className = '';
                weatherUpdate.classList.add("weather-icon", "fa-solid", "fa-cloud");
            }
            console.log(tempApi, humidityApi, windSpeedApi, currentWeatherApi);

            temp.textContent = `${tempApi}°c`;
            humidity.textContent = `${humidityApi}%`;
            windSpeed.textContent = `${windSpeedApi} km/h`

        })

        .catch(error => console.error(error));
});
