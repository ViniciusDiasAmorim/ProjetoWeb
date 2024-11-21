class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
    // Chama a Api
    this.fetchWeather();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li",
);
mobileNavbar.init();

let removedCities = [];

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

  if (cityName !== undefined) {
      const removedIndex = removedCities.indexOf(data.id);
      if (removedIndex !== -1) {
        removedCities.splice(removedIndex, 1);
      }
  }

  if (!removedCities.includes(data.id)) {
      const existingCard = document.getElementById(`weather-card-${data.id}`);
      if (existingCard) {
        updateWeatherComponent(existingCard, data);
      } else {
        createWeatherComponent(data);
      }
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
  removeButton.onclick = () => {
    removedCities.push(data.id);
    divCardElement.remove();
  }

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
  const filter = document.getElementById("filter-name").value.toLowerCase();
  const cards = document.querySelectorAll(".weather-card");

  cards.forEach(card => {
    const cityName = card.querySelector(".city-name").textContent.toLowerCase();
    if (cityName.includes(filter)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function sortCards() {
  const sortOrder = document.getElementById("sort-temperature").value;
  const container = document.querySelector(".container-regions");
  const cards = Array.from(document.querySelectorAll(".weather-card"));

  cards.sort((a, b) => {
    const tempA = parseFloat(a.querySelector(".temperature").textContent.split(": ")[1]);
    const tempB = parseFloat(b.querySelector(".temperature").textContent.split(": ")[1]);

    if (sortOrder === "asc") {
      return tempA - tempB;
    } else {
      return tempB - tempA;
    }
  });

  cards.forEach(card => container.appendChild(card));
}

function exibirIntegrantes() {
  alert(`
        Filomena Jose Cabita
        Danilo Cristino de Lima
        Guilherme de Oliveira Detling
        João Vitor dos Santos Pereira
        Taís Camila Reyes Ramos
        Vinícius Dias`
    )
}