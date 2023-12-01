
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
            const humedadAtmosferica = data.main.humidity;
        
            
            function clasificarVelocidadViento(velocidadViento) {
                let categoriaViento = '';
        
                if (velocidadViento >= 33 && velocidadViento <= 42) {
                    categoriaViento = "Categoría 1";
                } else if (velocidadViento >= 43 && velocidadViento <= 49) {
                    categoriaViento = "Categoría 2";
                } else if (velocidadViento >= 50 && velocidadViento <= 58) {
                    categoriaViento = "Categoría 3";
                } else if (velocidadViento >= 59 && velocidadViento <= 70) {
                    categoriaViento = "Categoría 4";
                } else if (velocidadViento > 70) {
                    categoriaViento = "Categoría 5";
                } else {
                    categoriaViento = "Sin clasificación";
                }
        
                return categoriaViento;
            }
        
            const categoriaVelocidadViento = clasificarVelocidadViento(velocidadViento);

            function clasificarHumedad(humedadAtmosferica) {
                let categoriaHumedad= '';
            
                
                if (humedadAtmosferica < 70) {
                    categoriaHumedad= "Categoria 1";
                } else if (humedadAtmosferica >= 70 && humedadAtmosferica < 75) {
                    categoriaHumedad= "Categoria 2";               
                } else if (humedadAtmosferica >= 75 && humedadAtmosferica < 76) {
                    categoriaHumedad= "Categoria 3";
                } else if (humedadAtmosferica >= 76 && humedadAtmosferica < 77) {
                    categoriaHumedad= "Categoria 4";
                } else if (humedadAtmosferica >= 77 && humedadAtmosferica < 90) {
                    categoriaHumedad= "Categoria 5";
                } else {
                    categoriaHumedad= "Sin clasificacion";
                }
                return categoriaHumedad;
            }

            const categoriaHumedad = clasificarHumedad(humedadAtmosferica);

            function clasificarDireccionViento(direccionViento) {
                let categoriaDireccion ='';

                if (direccionViento >= 0 && direccionViento < 90) {
                    categoriaDireccion = "Viento del Este";
                } else if (direccionViento >= 90 && direccionViento < 180) {
                    categoriaDireccion = "Viento del Sur";
                } else if (direccionViento >= 180 && direccionViento < 270) {
                    categoriaDireccion = "Viento del Oeste";
                } else {
                    categoriaDireccion = "Viento del Norte";
                }
                return categoriaDireccion;
            }

            const categoriaDireccion = clasificarDireccionViento(direccionViento);

            function clasificarTemperatura(temperaturaCelsius) {
                let temperaturaHuracan = '';
            
                if (temperaturaCelsius < 0) {
                    temperaturaHuracan = "Temperatura Muy Fría";
                } else if (temperaturaCelsius >= 0 && temperaturaCelsius < 10) {
                    temperaturaHuracan = "Temperatura Fría";
                } else if (temperaturaCelsius >= 10 && temperaturaCelsius < 20) {
                    temperaturaHuracan = "Temperatura Moderada";
                } else if (temperaturaCelsius >= 20 && temperaturaCelsius < 30) {
                    temperaturaHuracan = "Temperatura Cálida";
                } else {
                    temperaturaHuracan = "Temperatura Caliente";
                }
                return temperaturaHuracan;
            }
            const temperaturaHuracan = clasificarTemperatura(temperaturaCelsius);

            function clasificarPresionAtmosferica(presionAtmosferica) {
                let tipoPresion = '';

                if (presionAtmosferica < 1000) {
                 tipoPresion = "Presión Baja";
                } else if (presionAtmosferica >= 1000 && presionAtmosferica < 1010) {
                 tipoPresion = "Presión Moderada";
                } else {
                 tipoPresion = "Presión Alta";
                }
                return tipoPresion;
            }

            const tipoPresion = clasificarPresionAtmosferica(presionAtmosferica);
        
            resultadoContainer.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperatura: ${temperaturaCelsius}°C  (${temperaturaHuracan})</p>
                <p>Condiciones: ${data.weather[0].description}</p>
                <p>Velocidad del Viento: ${velocidadViento} m/s (${categoriaVelocidadViento})</p>
                <p>Dirección del Viento: ${direccionViento}° (${categoriaDireccion})</p>
                <p>Presión atmosférica: ${presionAtmosferica} hPa (${tipoPresion})</p>
                <p>Humedad atmosférica: ${humedadAtmosferica}% (${categoriaHumedad})</p>
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


            
            
        }


      

   
       