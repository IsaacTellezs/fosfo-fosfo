
        function obtenerPronostico() {
            Swal.fire({
                title: 'Ingrese el nombre de la ciudad',
                input: 'text',
                inputLabel: 'Ciudad',
                inputPlaceholder: 'Ej. Ciudad de México',
                showCancelButton: true,
                confirmButtonText: 'Buscar',
                cancelButtonText: 'Cancelar',
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    const ciudad = result.value;
                    const apiKey = "0afb351050fafd0b9d66a72a606dede3";
                    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&appid=${apiKey}`;
                
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            mostrarMapa(data);
                            mostrarResultado(data);
                        })
                        .catch(error => {
                            console.error('Error al obtener datos meteorológicos:', error);
                            mostrarResultadoError();
                        });
                }
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
        
                if (velocidadViento >= 2 && velocidadViento <= 42) {
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
                } else if (humedadAtmosferica >= 77 && humedadAtmosferica < 100) {
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
                    temperaturaHuracan = "Categoría 1";
                } else if (temperaturaCelsius >= 0 && temperaturaCelsius < 10) {
                    temperaturaHuracan = "Categoría 2";
                } else if (temperaturaCelsius >= 10 && temperaturaCelsius < 20) {
                    temperaturaHuracan = "Categoría 3";
                } else if (temperaturaCelsius >= 20 && temperaturaCelsius < 30) {
                    temperaturaHuracan = "Categoría 4";
                } else {
                    temperaturaHuracan = "Categoría 5";
                }
                return temperaturaHuracan;
            }
            const temperaturaHuracan = clasificarTemperatura(temperaturaCelsius);

            function clasificarPresionAtmosferica(presionAtmosferica) {
                let tipoPresion = '';

                if (presionAtmosferica > 980) {
                 tipoPresion = "Categoría 1";
                } else if (presionAtmosferica <= 980 && presionAtmosferica > 965) {
                 tipoPresion = "Categoría 2";
                } else if (presionAtmosferica <= 965 && presionAtmosferica > 945) {
                    tipoPresion = "Categoría 3";
                }else if (presionAtmosferica <= 945 && presionAtmosferica > 920) {
                    tipoPresion = "Categoría 4";
                } else if (presionAtmosferica <= 920 && presionAtmosferica > 910) {
                    tipoPresion = "Categoría 5";
                } else {
                 tipoPresion = "Sin clasificación";
                }
                return tipoPresion;
            }

            const tipoPresion = clasificarPresionAtmosferica(presionAtmosferica);

            function mostrarAlertaHuracan(
                categoriaVelocidadViento,
                categoriaHumedad,
                tipoPresion,
                temperaturaHuracan
            ) {
                const categorias = [categoriaVelocidadViento, categoriaHumedad, tipoPresion, temperaturaHuracan];
            
                // Contar cuántas veces aparece cada categoría
                const categoriasCinco = categorias.filter(categoria => categoria === "Categoría 5").length;
                const categoriasCuatro = categorias.filter(categoria => categoria === "Categoría 4").length;
                const categoriasTres = categorias.filter(categoria => categoria === "Categoría 3").length;
                const categoriasDos = categorias.filter(categoria => categoria === "Categoría 2").length;
                const categoriasUno = categorias.filter(categoria => categoria === "Categoría 1").length;
            
                let mensaje = "";
            
                if (categoriasCinco >= 3) {
                    Swal.fire({
                        icon: 'error',
                        title: '¡Alerta máxima!',
                        text: 'Peligro de huracán extremo.',
                    });
                } else if (categoriasCuatro >= 3) {
                    Swal.fire({
                        icon: 'warning',
                        title: '¡Alerta de huracán!',
                        text: 'Peligro significativo.',
                    });
                } else if (categoriasTres >= 3) {
                    Swal.fire({
                        icon: 'warning',
                        title: '¡Alerta de tormenta!',
                        text: 'Precauciones necesarias.',
                    });
                } else if (categoriasDos >= 3) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Alerta de condiciones climáticas adversas.',
                        text: 'Se recomienda tomar precauciones.',
                    });
                } else if (categoriasUno >= 3) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Condiciones climáticas estables.',
                        text: 'Sin alerta climática.',
                    });
                } else {
                    Swal.fire({
                        icon: 'info',
                        title: 'Sin alerta climática.',
                        text: 'Todo en calma.',
                    });
                }
                
            }
            
            
            mostrarAlertaHuracan(categoriaVelocidadViento, categoriaHumedad, tipoPresion, temperaturaHuracan);
            
        
            resultadoContainer.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperatura: ${temperaturaCelsius}°C</p>
                <p>Condiciones: ${data.weather[0].description}</p>
                <p>Velocidad del Viento: ${velocidadViento} m/s</p>
                <p>Dirección del Viento: ${direccionViento}°</p>
                <p>Presión atmosférica: ${presionAtmosferica} hPa</p>
                <p>Humedad atmosférica: ${humedadAtmosferica}% </p>
            `;
        }

        //(${temperaturaHuracan})
        //(${categoriaVelocidadViento})
        //(${categoriaDireccion})
        //(${tipoPresion})
        //(${categoriaHumedad})

        function mostrarResultadoError() {
            const resultadoContainer = document.getElementById('resultado');
            resultadoContainer.innerHTML = '<p>Error al obtener datos meteorológicos.</p>';
        }

        let mapa;

        function inicializarMapa(coordenadas) {
            
            if (!mapa) {
                mapa = L.map('map').setView(coordenadas, 10);
        
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(mapa);
            } else {
                
                mapa.setView(coordenadas);
            }
        }
        
        function mostrarMapa(data) {
            const coordenadas = [data.coord.lat, data.coord.lon];
        
            inicializarMapa(coordenadas);
        
            const marcador = L.marker(coordenadas).addTo(mapa);
            marcador.bindPopup(`<b>${data.name}</b><br>${data.weather[0].description}`).openPopup();
        }

   
       