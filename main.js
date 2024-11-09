async function fetchWeather() {
    const city = document.getElementById('cityName').value
    const apiKey = '99426ff209f948754e9e73568f8001d3'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Cidade não encontrada')
      }

      const data = await response.json()
      createWeatherComponent(data)
      
    } catch (error) {
      alert(error.message);
      document.querySelector('.weather-card').style.display = 'none'
    }

    function createWeatherComponent(data) {
        let divCardElement = document.createElement("div")
        divCardElement.classList.add("weather-card")
        divCardElement.display = "block"

        let cityElement = document.createElement("h3")
        cityElement.classList.add("city")
        cityElement.textContent =  data.name

        let temperatureElement = document.createElement("p")
        temperatureElement.classList.add("temperature")
        temperatureElement.textContent = `Temperatura: ${data.main.temp}°C`

        let weatherDescriptionElement = document.createElement("p")
        weatherDescriptionElement.classList.add("weather-description")
        weatherDescriptionElement.textContent = `Descrição: ${data.weather[0].description}`

        let humidityElement = document.createElement("p")
        humidityElement.classList.add("humidity")
        humidityElement.textContent = `Umidade: ${data.main.humidity}%`

        let imgIconElement = document.createElement("img")
        imgIconElement.classList.add("weather-icon")
        imgIconElement.src = `assets/images/${data.weather[0].icon}.png`

        divCardElement.appendChild(cityElement)
        divCardElement.appendChild(temperatureElement)
        divCardElement.appendChild(weatherDescriptionElement)
        divCardElement.appendChild(humidityElement)
        divCardElement.appendChild(imgIconElement)

        document.querySelector(".container-regions").appendChild(divCardElement)        
    }
  }