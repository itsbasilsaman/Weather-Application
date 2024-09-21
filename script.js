const cityInput = document.querySelector('.city-input');
const searchButton = document.querySelector('.search-btn');
const notFoundSection = document.querySelector('.not-found')
const searchCitySection = document.querySelector('.search-city')
const weatherInfoSection = document.querySelector('.wheather-info')
const countryText = document.querySelector('.country-text')
const tempText = document.querySelector('.temp-txt')
const conditionText = document.querySelector('.condition-text')
const humidityValueText = document.querySelector('.humidity-value-text')
const windValueText = document.querySelector('.wind-value-text')
const weatherImg = document.querySelector('.weather-img')
const currentDateText = document.querySelector('.current-date-txt')


const apiKey = '5fe36b192ffd1c36dffb6752bc1722b2'

searchButton.addEventListener('click', () => {
   if(cityInput.value.trim() != ''){
    updateWeatherInfo(cityInput.value)
    cityInput.value = ''
    cityInput.blur()
   }
    
})

cityInput.addEventListener('keydown', (event) => {
  if(event.key == 'Enter' && cityInput.value.trim() != ''){
    updateWeatherInfo(cityInput.value)
    cityInput.value = ''
    cityInput.blur()
  }
})

// function for getting fetch data

async function getFetchData(endPoint , city){
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`

  const response = await fetch(apiUrl)

  return response.json()
}

function getWeatherIcon(id){
  if(id <= 232 ) return 'thunderstrom.png'
  if(id <= 321) return 'drizzle.png'
  if(id <= 531) return 'rain-removebg-preview.png'
  if(id <= 622) return  'snow.png'
  if(id <= 781) return 'rain-removebg-preview.png'
  if(id <= 800) return  'weather.png'
 
   else return 'cloud.png'
}


function getCurrentDate(){
   const currentDate = new Date()
   
   const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
   }
   return currentDate.toLocaleDateString('en-GB', options)
}

// function for updating weatherinfo using fetch data

async function updateWeatherInfo(city){
  const weatherData = await getFetchData('weather', city)
  console.log(weatherData);
  if(weatherData.cod != 200){
    showDisplaySection(notFoundSection)
    return
  }

  const {
    name: country,                       // 'name' property from weatherData is assigned to a variable named 'country'
    main: { temp, humidity },             // 'temp' and 'humidity' properties from 'main' object within weatherData
    weather: [ { id, main } ],            // Destructuring the first element in the 'weather' array to get 'id' and 'main'
    wind: { speed }                       // 'speed' property from 'wind' object within weatherData
  } = weatherData;



   countryText.textContent = country
   tempText.textContent =  Math.round(temp) + '°C'
   conditionText.textContent = main
   humidityValueText.textContent = humidity + '%'
   windValueText.textContent = speed + 'M/s'
   currentDateText.textContent = getCurrentDate()
   weatherImg.src = `Assets/${getWeatherIcon(id)}`


 
  showDisplaySection(weatherInfoSection)
 
}


// showDnotfound section function 

function showDisplaySection(section){
  [weatherInfoSection, searchCitySection , notFoundSection].forEach(items => items.style.display = 'none')
  section.style.display = 'flex'
 
}


 
