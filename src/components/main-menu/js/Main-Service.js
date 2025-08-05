import { ref, reactive, onMounted, computed } from "vue";

export function useDashboard() {
    // Estados reactivos
    const loading = ref(true);
    const cultivos = ref([]);
    const tareas = ref([]);
    const usuarios = ref([]);
    const clima = ref(null);

    const obtenerFechaHoyString = () => {
        const hoy = new Date();
        const year = hoy.getFullYear();
        const month = String(hoy.getMonth() + 1).padStart(2, '0');
        const day = String(hoy.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const compararFechasString = (fecha1String, fecha2String) => {
        if (fecha1String < fecha2String) return -1;
        if (fecha1String > fecha2String) return 1;
        return 0;
    };

    const calcularDiferenciaDias = (fechaString1, fechaString2) => {
        const [year1, month1, day1] = fechaString1.split('-').map(Number);
        const [year2, month2, day2] = fechaString2.split('-').map(Number);

        const fecha1 = new Date(year1, month1 - 1, day1);
        const fecha2 = new Date(year2, month2 - 1, day2);

        return Math.floor((fecha2 - fecha1) / (1000 * 60 * 60 * 24));
    };

    // Función para convertir hora a formato 24 horas para comparación
    const convertirHoraA24 = (hora) => {
        if (!hora) return '00:00';
        
        // Si ya está en formato 24 horas (HH:MM), retornar tal como está
        if (hora.match(/^\d{2}:\d{2}$/)) {
            return hora;
        }
        
        // Si está en formato 12 horas (HH:MM AM/PM)
        const match = hora.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (match) {
            let horas = parseInt(match[1]);
            const minutos = match[2];
            const ampm = match[3].toUpperCase();
            
            if (ampm === 'PM' && horas !== 12) {
                horas += 12;
            } else if (ampm === 'AM' && horas === 12) {
                horas = 0;
            }
            
            return `${horas.toString().padStart(2, '0')}:${minutos}`;
        }
        
        // Si no coincide con ningún formato, retornar tal como está
        return hora;
    };

    // Función auxiliar para ordenar tareas por fecha y hora
    const ordenarTareasPorFechaYHora = (tareas) => {
        return tareas.sort((a, b) => {
            // Primero comparar por fecha
            if (a.fecha < b.fecha) return -1;
            if (a.fecha > b.fecha) return 1;
            
            // Si las fechas son iguales, comparar por hora
            if (a.hora && b.hora) {
                // Convertir hora a formato comparable (24 horas)
                const horaA = convertirHoraA24(a.hora);
                const horaB = convertirHoraA24(b.hora);
                
                if (horaA < horaB) return -1;
                if (horaA > horaB) return 1;
            }
            
            return 0;
        });
    };

    // Cargar datos del localStorage
    const cargarDatos = () => {
        try {
            // Cargar cultivos
            const cultivosData = localStorage.getItem("cultivos");
            if (cultivosData) {
                cultivos.value = JSON.parse(cultivosData);
            }

            // Cargar tareas
            const tareasData = localStorage.getItem("tareas");
            if (tareasData) {
                tareas.value = JSON.parse(tareasData);
            }

            // Cargar usuarios registrados 
            const usuariosData = localStorage.getItem("usuariosRegistrados");
            if (usuariosData) {
                usuarios.value = JSON.parse(usuariosData);
            }
        } catch (error) {
            console.error("Error cargando datos del localStorage:", error);
        }
    };

    const cargarClima = async () => {
        try {
            const OWM_API_KEY = "399bb3c7a5b6f02b697d7a31da62f4f2"; // Tu API key de OpenWeatherMap
            const owmUrl = `https://api.openweathermap.org/data/2.5/weather?q=Manta,EC&appid=${OWM_API_KEY}&units=metric&lang=es`;

            console.log('🌤️ Cargando clima desde OpenWeatherMap...');

            const response = await fetch(owmUrl);
            const data = await response.json();

            if (response.ok) {
                clima.value = {
                    temperatura: Math.round(data.main.temp),
                    humedad: data.main.humidity,
                    descripcion: data.weather[0].description,
                    icono: getIconoOpenWeather(data.weather[0].icon),
                    viento: Math.round(data.wind.speed * 3.6),
                    consejo: getConsejoClimaReal(data.main.temp, data.main.humidity)
                };
                console.log('🎉 Clima OpenWeatherMap cargado exitosamente:', clima.value);
                return;
            } else {
                console.error('Error en la respuesta de OpenWeatherMap:', data);
                throw new Error('API OpenWeatherMap falló');
            }
        } catch (error) {
            console.error('❌ Error cargando clima de OpenWeatherMap:', error);

            // Solo como último recurso usar datos simulados
            console.log('🔄 Usando datos simulados como respaldo...');
            setTimeout(() => {
                const horaActual = new Date().getHours();
                let temperaturaBase = 28; // Temperatura base para Manta

                // Ajustar por hora del día
                if (horaActual >= 18 || horaActual <= 6) {
                    temperaturaBase -= 4; // Más fresco de noche
                }

                clima.value = {
                    temperatura: temperaturaBase + Math.floor(Math.random() * 4) - 2, // ±2°C de variación
                    humedad: 70 + Math.floor(Math.random() * 20), // 70-90% (costa)
                    descripcion: getDescripcionClimaRealista(horaActual),
                    icono: getIconoClimaRealista(horaActual),
                    viento: 8 + Math.floor(Math.random() * 8), // 8-16 km/h (brisa marina)
                    consejo: getConsejoClima(),
                };
                console.log('🎲 Datos simulados realistas cargados:', clima.value);
            }, 500);
        }
    };

    // Funciones para datos simulados básicos
    const getDescripcionClima = () => {
        const condiciones = [
            "Soleado",
            "Parcialmente nublado",
            "Nublado",
            "Cielo despejado",
            "Algunas nubes",
        ];
        return condiciones[Math.floor(Math.random() * condiciones.length)];
    };

    const getIconoClima = () => {
        const iconos = ["☀️", "⛅", "☁️", "🌤️", "🌥️"];
        return iconos[Math.floor(Math.random() * iconos.length)];
    };

    const getConsejoClima = () => {
        const consejos = [
            "Condiciones ideales para riego matutino",
            "Buen momento para trabajar en el huerto",
            "Considera proteger las plantas del sol",
            "Excelente día para plantar",
            "Revisa la humedad del suelo",
        ];
        return consejos[Math.floor(Math.random() * consejos.length)];
    };

    // Funciones para datos más realistas según hora
    const getDescripcionClimaRealista = (hora) => {
        if (hora >= 18 || hora <= 6) {
            // Condiciones nocturnas más probables
            const condicionesNoche = ["Nublado", "Parcialmente nublado", "Cielo despejado", "Algunas nubes"];
            return condicionesNoche[Math.floor(Math.random() * condicionesNoche.length)];
        } else {
            // Condiciones diurnas
            const condicionesDia = ["Soleado", "Parcialmente nublado", "Algunas nubes", "Cielo despejado"];
            return condicionesDia[Math.floor(Math.random() * condicionesDia.length)];
        }
    };

    const getIconoClimaRealista = (hora) => {
        if (hora >= 18 || hora <= 6) {
            // Iconos nocturnos
            const iconosNoche = ["🌙", "☁️", "🌥️", "🌤️"];
            return iconosNoche[Math.floor(Math.random() * iconosNoche.length)];
        } else {
            // Iconos diurnos
            const iconosDia = ["☀️", "⛅", "🌤️", "🌥️"];
            return iconosDia[Math.floor(Math.random() * iconosDia.length)];
        }
    };

    // Funciones para OpenWeatherMap
    const getIconoOpenWeather = (iconoAPI) => {
        const mapeoIconos = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        return mapeoIconos[iconoAPI] || '🌤️';
    };

    const getConsejoClimaReal = (temperatura, humedad) => {
        if (temperatura > 30 && humedad < 50) {
            return "🌵 Clima caliente y seco. Riega abundantemente tus plantas";
        } else if (temperatura < 20) {
            return "🧥 Temperatura fresca. Protege las plantas sensibles al frío";
        } else if (humedad > 80) {
            return "💧 Alta humedad. Vigila posibles hongos en las plantas";
        } else if (temperatura >= 20 && temperatura <= 30 && humedad >= 50) {
            return "🌱 Condiciones perfectas para el crecimiento de plantas";
        } else {
            return "🌿 Buen día para trabajar en el huerto";
        }
    };

    // Calcular días desde siembra usando strings
    const calcularDias = (fechaSiembra) => {
        if (!fechaSiembra) return 0;

        const fechaHoyString = obtenerFechaHoyString();
        const diferencia = calcularDiferenciaDias(fechaSiembra, fechaHoyString);

        return Math.max(0, diferencia);
    };

    // Calcular progreso del cultivo
    const calcularProgreso = (fechaSiembra) => {
        const dias = calcularDias(fechaSiembra);
        const progreso = Math.min((dias / 90) * 100, 100); // Asumiendo 90 días de ciclo
        return Math.round(progreso);
    };

    // Obtener estado del cultivo
    const getEstadoCultivo = (fechaSiembra) => {
        const dias = calcularDias(fechaSiembra);
        if (dias < 30) return "germinacion";
        if (dias < 60) return "crecimiento";
        if (dias < 90) return "floracion";
        return "cosecha";
    };

    // Obtener texto del estado
    const getTextoEstado = (fechaSiembra) => {
        const dias = calcularDias(fechaSiembra);
        if (dias < 30) return "🌱 Germinación";
        if (dias < 60) return "🌿 Crecimiento";
        if (dias < 90) return "🌸 Floración";
        return "🍅 Listo para cosecha";
    };

    const formatearFecha = (fecha) => {
        if (!fecha) return '';

        // Parsear la fecha manualmente para evitar problemas de zona horaria
        const [year, month, day] = fecha.split('-').map(Number);
        const date = new Date(year, month - 1, day);

        return date.toLocaleDateString("es-ES", {
            month: "short",
            day: "numeric",
        });
    };

    // Modal de confirmación para tarea completada
    const mostrarModalTareaCompletada = (tituloTarea) => {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            font-family: 'Josefin Sans', sans-serif;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: rgba(50, 50, 50, 0.95);
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            color: white;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
        `;

        const titulo = document.createElement('h3');
        titulo.textContent = '✅ ¡Tarea Completada!';
        titulo.style.cssText = `
            margin: 0 0 15px 0;
            color: #66bb6a;
            font-size: 24px;
        `;

        const tituloTareaDiv = document.createElement('p');
        tituloTareaDiv.innerHTML = `<strong>"${tituloTarea}"</strong>`;
        tituloTareaDiv.style.cssText = `
            margin: 0 0 15px 0;
            font-size: 16px;
            color: #e8f5e8;
            line-height: 1.4;
        `;

        const texto = document.createElement('p');
        texto.textContent = '¡Excelente trabajo! La tarea ha sido marcada como realizada y se actualizará automáticamente en tu lista de tareas.';
        texto.style.cssText = `
            margin: 0 0 25px 0;
            font-size: 14px;
            line-height: 1.4;
            color: #ccc;
        `;

        const btnAceptar = document.createElement('button');
        btnAceptar.textContent = 'Perfecto';
        btnAceptar.style.cssText = `
            padding: 12px 25px;
            background: #66bb6a;
            color: black;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            transition: background 0.3s;
        `;

        // Efectos hover
        btnAceptar.onmouseover = () => btnAceptar.style.background = '#4caf50';
        btnAceptar.onmouseout = () => btnAceptar.style.background = '#66bb6a';

        // Event listener
        btnAceptar.onclick = () => {
            document.body.removeChild(modal);
        };

        // Construir modal
        modalContent.appendChild(titulo);
        modalContent.appendChild(tituloTareaDiv);
        modalContent.appendChild(texto);
        modalContent.appendChild(btnAceptar);
        modal.appendChild(modalContent);

        document.body.appendChild(modal);
    };

    // Función para completar tareas de hoy
    const completarTarea = (indexTareasHoy) => {
        // Encontrar la tarea real en el array completo de tareas
        const tareaHoy = tareasHoy.value[indexTareasHoy];

        if (!tareaHoy) {
            console.error('Tarea no encontrada');
            return;
        }

        // Buscar el índice real de la tarea en el array completo
        const indiceReal = tareas.value.findIndex(tarea =>
            tarea.titulo === tareaHoy.titulo &&
            tarea.fecha === tareaHoy.fecha &&
            tarea.hora === tareaHoy.hora
        );

        if (indiceReal === -1) {
            console.error('No se pudo encontrar la tarea en el array principal');
            return;
        }

        console.log(`Tarea completada: ${tareas.value[indiceReal]?.titulo}`);

        const tituloTarea = tareas.value[indiceReal].titulo;

        tareas.value[indiceReal].completada = true;     // Para el dashboard
        tareas.value[indiceReal].estado = "Realizada";  // Para la lista de tareas

        // Guardar en localStorage
        localStorage.setItem("tareas", JSON.stringify(tareas.value));

        mostrarModalTareaCompletada(tituloTarea);

        console.log('✅ Tarea sincronizada:', {
            titulo: tituloTarea,
            completada: tareas.value[indiceReal].completada,
            estado: tareas.value[indiceReal].estado
        });
    };

    // Función para completar próximas tareas
    const completarProximaTarea = (indexProximasTareas) => {
        // Encontrar la tarea real en el array de próximas tareas
        const proximaTarea = proximasTareas.value[indexProximasTareas];
        
        if (!proximaTarea) {
            console.error('Próxima tarea no encontrada');
            return;
        }
        
        // Buscar el índice real de la tarea en el array completo
        const indiceReal = tareas.value.findIndex(tarea => 
            tarea.titulo === proximaTarea.titulo && 
            tarea.fecha === proximaTarea.fecha && 
            tarea.hora === proximaTarea.hora
        );
        
        if (indiceReal === -1) {
            console.error('No se pudo encontrar la próxima tarea en el array principal');
            return;
        }

        console.log(`Próxima tarea completada: ${tareas.value[indiceReal]?.titulo}`);
        
        const tituloTarea = tareas.value[indiceReal].titulo;
        
        tareas.value[indiceReal].completada = true;     // Para el dashboard
        tareas.value[indiceReal].estado = "Realizada";  // Para la lista de tareas
        
        // Guardar en localStorage
        localStorage.setItem("tareas", JSON.stringify(tareas.value));
        
        mostrarModalTareaCompletada(tituloTarea);
        
        console.log('✅ Próxima tarea sincronizada:', {
            titulo: tituloTarea,
            completada: tareas.value[indiceReal].completada,
            estado: tareas.value[indiceReal].estado
        });
    };

    // Función para agregar un nuevo usuario
    const agregarUsuario = (nuevoUsuario) => {
        usuarios.value.push(nuevoUsuario);
        localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios.value));
    };

    // Función para actualizar un usuario
    const actualizarUsuario = (index, usuarioActualizado) => {
        if (usuarios.value[index]) {
            usuarios.value[index] = { ...usuarios.value[index], ...usuarioActualizado };
            localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios.value));
        }
    };

    // Computed para tareas de hoy con ordenamiento
    const tareasHoy = computed(() => {
        const hoy = obtenerFechaHoyString();
        console.log('📅 Fecha de hoy (dashboard):', hoy);

        const tareasDeHoy = tareas.value.filter((tarea) => {
            const cumpleCondicion = tarea.fecha === hoy && !tarea.completada;
            if (cumpleCondicion) {
                console.log(`✅ Tarea de hoy encontrada: ${tarea.titulo} - Fecha: ${tarea.fecha} - Hora: ${tarea.hora}`);
            }
            return cumpleCondicion;
        });

        // Ordenar las tareas de hoy por hora
        const tareasOrdenadas = ordenarTareasPorFechaYHora([...tareasDeHoy]);
        
        console.log(`📊 Total tareas de hoy: ${tareasOrdenadas.length}`);
        console.log('🕐 Tareas de hoy ordenadas por hora:', tareasOrdenadas.map(t => `${t.titulo} - ${t.hora}`));
        
        return tareasOrdenadas;
    });

    // Computed para próximas tareas con ordenamiento
    const proximasTareas = computed(() => {
        const hoy = obtenerFechaHoyString();
        console.log('📅 Calculando próximas tareas desde:', hoy);

        const tareasProximas = tareas.value
            .filter((tarea) => {
                if (!tarea.fecha || tarea.completada) return false;

                const diferenciaDias = calcularDiferenciaDias(hoy, tarea.fecha);
                const esProximaTarea = diferenciaDias > 0 && diferenciaDias <= 20; // Próximos 20 días

                if (esProximaTarea) {
                    console.log(`📋 Próxima tarea: ${tarea.titulo} - En ${diferenciaDias} días (${tarea.fecha}) - Hora: ${tarea.hora}`);
                }

                return esProximaTarea;
            });

        // Ordenar por fecha y hora (las más próximas primero)
        const tareasOrdenadas = ordenarTareasPorFechaYHora([...tareasProximas])
            .slice(0, 5); // Mostrar máximo 5 tareas

        console.log(`📊 Total próximas tareas: ${tareasOrdenadas.length}`);
        console.log('📅 Próximas tareas ordenadas:', tareasOrdenadas.map(t => `${t.titulo} - ${t.fecha} ${t.hora}`));
        
        return tareasOrdenadas;
    });

    // Computed para cultivos ordenados por fecha de siembra
    const cultivosOrdenados = computed(() => {
        if (!cultivos.value || cultivos.value.length === 0) {
            return [];
        }

        const cultivosCopia = [...cultivos.value];

        return cultivosCopia.sort((a, b) => {
            if (!a.fechaSiembra && !b.fechaSiembra) return 0;
            if (!a.fechaSiembra) return 1;
            if (!b.fechaSiembra) return -1;

            const comparacion = compararFechasString(a.fechaSiembra, b.fechaSiembra);
            
            if (comparacion === 0 && a.hora && b.hora) {
                const horaA = convertirHoraA24(a.hora);
                const horaB = convertirHoraA24(b.hora);
                
                if (horaA < horaB) return -1;
                if (horaA > horaB) return 1;
            }
            
            return comparacion;
        });
    });

    // Computed para obtener el total de usuarios registrados
    const totalUsuarios = computed(() => usuarios.value.length);

    // Inicializar dashboard
    const inicializar = async () => {
        loading.value = true;

        try {
            cargarDatos();
            await cargarClima();
        } catch (error) {
            console.error("Error inicializando dashboard:", error);
        } finally {
            loading.value = false;
        }
    };

    // Hook de montaje
    onMounted(() => {
        inicializar();
    });

    // Retornar propiedades y métodos
    return {
        // Estados
        loading,
        cultivos,
        tareas,
        usuarios,
        usuariosRegistrados: usuarios,
        clima,

        // Computed
        tareasHoy,
        proximasTareas,
        cultivosOrdenados,
        totalUsuarios,

        // Métodos
        calcularDias,
        calcularProgreso,
        getEstadoCultivo,
        getTextoEstado,
        formatearFecha,
        completarTarea,
        completarProximaTarea,
        agregarUsuario,
        actualizarUsuario,
        inicializar,

        ordenarTareasPorFechaYHora,
        obtenerTodasLasTareasOrdenadas: () => ordenarTareasPorFechaYHora([...tareas.value]),
        obtenerTareasPorEstadoOrdenadas: (estado) => {
            const tareasFiltradas = tareas.value.filter(tarea => tarea.estado === estado);
            return ordenarTareasPorFechaYHora([...tareasFiltradas]);
        }
    };
}