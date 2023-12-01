
        function obtenerPronostico(ciudad) {
            
            const apiKey = "0afb351050fafd0b9d66a72a606dede3";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    mostrarResultado(data);
                    mostrarMapa(data);
                })
                .catch(error => {
                    console.error('Error al obtener datos meteorológicos:', error);
                    mostrarResultadoError();
                });
        }

        function mostrarResultado(data) {
            const resultadoContainer = document.getElementById('resultado');
            const temperaturaCelsius = (data.main.temp - 273.15).toFixed(2);
            const velocidadViento = data.wind.speed;
            const direccionViento = data.wind.deg;
            let mensajeViento = '';
            const umbralVientoAlto = 3;

            if (velocidadViento > umbralVientoAlto) {
                mensajeViento = '¡Viento fuerte! Precaución.';
            }

    resultadoContainer.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperatura: ${temperaturaCelsius}°C</p>
        <p>Condiciones: ${data.weather[0].description}</p>
        <p>Velocidad del Viento: ${velocidadViento} m/s</p>
        <p>Dirección del Viento: ${direccionViento}°</p>
        <p>${mensajeViento}</p>
        
    `;
}

        function mostrarResultadoError() {
            const resultadoContainer = document.getElementById('resultado');
            resultadoContainer.innerHTML = '<p>Error al obtener datos meteorológicos.</p>';
        }

        function mostrarMapa(data) {
            const coordenadas = [data.coord.lat, data.coord.lon];
        
            const mapa = L.map('map').setView(coordenadas, 10);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(mapa);
        
            const marcador = L.marker(coordenadas).addTo(mapa);
            marcador.bindPopup(`<b>${data.name}</b><br>${data.weather[0].description}`).openPopup();
            console.log(data.coord.lat, data.coord.lon);
        }
   
       