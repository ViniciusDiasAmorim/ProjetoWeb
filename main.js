async function fetchWeather() {
    const city = document.getElementById('cityName').value;
    const apiKey = '99426ff209f948754e9e73568f8001d3';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Cidade não encontrada');
      }
      const data = await response.json();

      document.getElementById('city').textContent = data.name;
      document.getElementById('temperature').textContent = `Temperatura: ${data.main.temp}°C`;
      document.getElementById('weatherDescription').textContent = `Descrição: ${data.weather[0].description}`;
      document.getElementById('humidity').textContent = `Umidade: ${data.main.humidity}%`;
      let img = data.weather[0].icon
      var imagem = document.getElementById('weatherIcon')
      imagem.src = `${img}.png`
      document.getElementById('weatherCard').style.display = 'block';
    } catch (error) {
      alert(error.message);
      document.getElementById('weatherCard').style.display = 'none';
    }
  }