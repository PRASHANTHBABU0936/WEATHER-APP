

// const apiKey = '64a862d8eafecee9800e0a7054d84e98';
const apiKey = '1a032877ab02f50382245ce448a174f0';

 // Replace with your OpenWeatherMap API key
const searchButton = document.querySelector('.sbtn');

        const cityInput = document.querySelector('.cityinput');
    const countryTxt = document.querySelector('.countrytxt');
const currentDateTxt = document.querySelector('.currentdatetxt');
const temperature = document.querySelector('.temperature');


const condition = document.querySelector('.condition');
    const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const weatherIcon = document.querySelector('.weather-icon');

//  button click
searchButton.addEventListener('click', () => {

  const city = cityInput.value.trim();
                if (city) {
    fetchWeather(city);
  }
});

//   key press
cityInput.addEventListener('keypress', (e) => {

  if (e.key === 'Enter') {
    searchButton.click();
  }
});

// Fetch weather data
function fetchWeather(city) {
    
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
      
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => updateWeather(data))
    .catch(error => {
      alert(error.message);
      console.error(error);
    });
}

// Update DOM
function updateWeather(data) {
 
 
    const date = new Date();
  const options = { weekday: 'short', day: 'numeric', month: 'short' };

    countryTxt.textContent = `${data.name}, ${data.sys.country}`;
      
    currentDateTxt.textContent = date.toLocaleDateString(undefined, options);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
    
  condition.textContent = data.weather[0].description;
  
  humidity.textContent = `${data.main.humidity}%`;
         wind.textContent = `${data.wind.speed} m/s`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIcon.alt = data.weather[0].description;
}
