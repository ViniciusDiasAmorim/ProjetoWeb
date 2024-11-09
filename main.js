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
    const existingCard = document.getElementById(`weather-card-${data.id}`)
    if (existingCard) {
      updateWeatherComponent(existingCard, data)
    } else {
      createWeatherComponent(data)
    }

  } catch (error) {
    alert(error.message)
  }
}

function createWeatherComponent(data) {
  const divCardElement = document.createElement("div")
  divCardElement.classList.add("weather-card")
  divCardElement.id = `weather-card-${data.id}`

  const cityElement = document.createElement("h3")
  cityElement.classList.add("city-name")
  cityElement.textContent = data.name

  const temperatureElement = document.createElement("p")
  temperatureElement.classList.add("temperature")
  temperatureElement.textContent = `Temperatura: ${data.main.temp}°C`

  const weatherDescriptionElement = document.createElement("p")
  weatherDescriptionElement.classList.add("weather-description")
  weatherDescriptionElement.textContent = `Descrição: ${data.weather[0].description}`

  const humidityElement = document.createElement("p")
  humidityElement.classList.add("humidity")
  humidityElement.textContent = `Umidade: ${data.main.humidity}%`

  const imgIconElement = document.createElement("img")
  imgIconElement.classList.add("weather-icon")
  imgIconElement.src = `assets/images/${data.weather[0].icon}.png`

  const removeButton = document.createElement("button")
  removeButton.classList.add("remove-button")
  removeButton.textContent = "Remover"
  removeButton.onclick = () => divCardElement.remove()

  const updateButton = document.createElement("button")
  updateButton.classList.add("update-button")
  updateButton.textContent = "Atualizar"
  updateButton.onclick = () => fetchWeather(data.name)

  const divContainerButtons = document.createElement("div")
  divContainerButtons.classList.add("container-buttons") 
  divContainerButtons.appendChild(removeButton)
  divContainerButtons.appendChild(updateButton)

  divCardElement.appendChild(cityElement)
  divCardElement.appendChild(temperatureElement)
  divCardElement.appendChild(weatherDescriptionElement)
  divCardElement.appendChild(humidityElement)
  divCardElement.appendChild(imgIconElement)
  divCardElement.appendChild(divContainerButtons)

 

  document.querySelector(".container-regions").appendChild(divCardElement)
}

function updateWeatherComponent(card, data) {
  card.querySelector(".temperature").textContent = `Temperatura: ${data.main.temp}°C`
  card.querySelector(".weather-description").textContent = `Descrição: ${data.weather[0].description}`
  card.querySelector(".humidity").textContent = `Umidade: ${data.main.humidity}%`
  card.querySelector(".weather-icon").src = `assets/images/${data.weather[0].icon}.png`
}

function filterCards() {
  const filter = document.getElementById("filter-name").value.toLowerCase()
  const cards = document.querySelectorAll(".weather-card")

  cards.forEach(card => {
    const cityName = card.querySelector(".city-name").textContent.toLowerCase()
    card.style.display = cityName.includes(filter) ? "block" : "none"
  })
}

function sortCards() {
  const sortOrder = document.getElementById("sort-temperature").value
  const container = document.querySelector(".container-regions")
  const cards = Array.from(document.querySelectorAll(".weather-card"))

  cards.sort((a, b) => {
    const tempA = parseFloat(a.querySelector(".temperature").textContent.split(": ")[1])
    const tempB = parseFloat(b.querySelector(".temperature").textContent.split(": ")[1])
    return sortOrder === "asc" ? tempA - tempB : tempB - tempA
  })

  cards.forEach(card => container.appendChild(card))
}
