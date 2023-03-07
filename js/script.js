// Time start

const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const greetingEl = document.querySelector('.greeting');
const nameEl = document.querySelector('.name');
const bodyEl = document.querySelector('body');
const sliderNextEl = document.querySelector('.slide-next');
const slidePrevEl = document.querySelector('.slide-prev');
let randomNum;


function showTime() {
    const date = new Date();
    const currenTime = date.toLocaleTimeString();
    timeEl.textContent = currenTime;

    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}

function showDate() {
    const date = new Date();
    const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
    const currenTime = date.toLocaleTimeString('en-US', options);
    dateEl.textContent = currenTime;

    setTimeout(showDate, 1000);
}

showTime();

// Time end

// Greeting start 

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();

    
    if(hours >= 22 || hours < 6) {
        return "night";
    } else if(hours >= 6 && hours < 12) {
        return "morning";
    } else if(hours >= 12 && hours < 17) {
        return "afternoon";
    } else if(hours >= 17 && hours < 22) {
        return "evening";
    }
}

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay},`;
    greetingEl.textContent = greetingText;
}

function setLocalStorage() {
    localStorage.setItem('name', nameEl.value);
}

window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        nameEl.value = localStorage.getItem('name');
    } 
}

window.addEventListener('load', getLocalStorage);

// Greeting end

//  Bacground-image slide start

function getRandomNum() {
    const min = 1;
    const max = 20;
    return Math.floor(Math.random() * (max - min) + min);
}

function setBg() {
    const timeOfDay = getTimeOfDay();
    const bgNum = getRandomNum().toString().padStart(2, "0");
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        bodyEl.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
    };
}

setBg();

randomNum = getRandomNum();

function getSliderNext() {
    let randomNumIncrement = randomNum++;
    
    if(randomNumIncrement === 20) {
        randomNum = 1;
    }

    const timeOfDay = getTimeOfDay();
    const bgNum = randomNumIncrement.toString().padStart(2, "0");
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        bodyEl.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
    };
}

sliderNextEl.addEventListener("click", getSliderNext);


function getSliderPrev() {
    let randomNumIncrement = randomNum--;
    
    if(randomNumIncrement === 1) {
        randomNum = 20;
    }

    const timeOfDay = getTimeOfDay();
    const bgNum = randomNumIncrement.toString().padStart(2, "0");
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        bodyEl.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
    };
}

slidePrevEl.addEventListener("click", getSliderPrev);


// Bacground-image slide end



// Weather start

const weatherIcon = document.querySelector('.weather-icon');
const temperatureEl = document.querySelector('.temperature');
const descriptionWeatherEl = document.querySelector('.weather-description');
const windEl = document.querySelector('.wind');
const humidityEl = document.querySelector('.humidity');
const inputCityEl = document.querySelector('.city');

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCityEl.value}&lang=en&appid=9dd765c38ce417e49d6022829c5841b3&units=metric`;
    const res = await fetch(url);
    const data  = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);  
    temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionWeatherEl.textContent = data.weather[0].description;
    windEl.textContent = `Wind: ${data.wind.speed} m/s`
    humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
}

inputCityEl.addEventListener("change", getWeather);


getWeather();

// Weather end

// Quotes of day start

const quoteEl = document.querySelector('.quote');
const authorEl = document.querySelector('.author');
const changeQuoteEl = document.querySelector('.change-quote');

async function getQuoetOfDay() {
    const quotes = `https://type.fit/api/quotes`;
    const res = await fetch(quotes);
    const data = await res.json();
    const getRundomNumOfQuote = () => {
        let max = data.length;
        let min = 0;

        return Math.floor(Math.random() * (max - min) + min);
    }

    const rundomNumResult = getRundomNumOfQuote();

    quoteEl.textContent = `${data[rundomNumResult].text}`;
    authorEl.textContent = `${data[rundomNumResult].author}`;
}

getQuoetOfDay();

changeQuoteEl.addEventListener("click", getQuoetOfDay);

// Quotes of day end