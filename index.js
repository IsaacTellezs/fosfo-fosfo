
        function obtenerPronostico(ciudad) {
            
            const apiKey = "0afb351050fafd0b9d66a72a606dede3";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&appid=${apiKey}`;

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
            const presionAtmosferica = data.main.pressure;
            let mensajeViento = '';
            const umbralVientoAlto = 3;

            if (velocidadViento >= 33 && velocidadViento <= 42) {
                mensajeViento ="Categoría 1: Velocidad del viento entre 119-153 km/h (33-42 m/s)";
            } else if (velocidadViento >= 43 && velocidadViento <= 49) {
                mensajeViento ="Categoría 2: Velocidad del viento entre 154-177 km/h (43-49 m/s)";
            } else if (velocidadViento >= 50 && velocidadViento <= 58) {
                mensajeViento ="Categoría 3: Velocidad del viento entre 178-208 km/h (50-58 m/s)";
            } else if (velocidadViento >= 59 && velocidadViento <= 70) {
                mensajeViento ="Categoría 4: Velocidad del viento entre 209-251 km/h (59-70 m/s)";
            } else if (velocidadViento > 70) {
                mensajeViento ="Categoría 5: Velocidad del viento superior a 251 km/h (>70 m/s)";
            } else {
                mensajeViento ="";
            }

    resultadoContainer.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperatura: ${temperaturaCelsius}°C</p>
        <p>Condiciones: ${data.weather[0].description}</p>
        <p>Velocidad del Viento: ${velocidadViento} m/s</p>
        <p>Dirección del Viento: ${direccionViento}°</p>
        <p> Presión atmosferica: ${presionAtmosferica} hPa</p>
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
   
       