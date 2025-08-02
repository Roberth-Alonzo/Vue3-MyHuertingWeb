import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Array de plantas disponibles
const plantas = [
    {
        nombre: "Zanahoria",
        tipo: "Hortaliza",
        descripcion: "Raíz comestible rica en vitaminas.",
        consejos: "Siembra en suelos sueltos y bien drenados. Necesita riego constante sin encharcar."
    },
    {
        nombre: "Pepino",
        tipo: "Hortaliza",
        descripcion: "Fruto fresco ideal para ensaladas.",
        consejos: "Requiere mucho sol y riego frecuente. Utiliza tutores para que crezca vertical."
    },
    {
        nombre: "Pimiento",
        tipo: "Hortaliza",
        descripcion: "Fruto usado en diversas recetas.",
        consejos: "Prefiere temperaturas cálidas. No tolera el exceso de agua."
    },
    {
        nombre: "Fresa",
        tipo: "Fruta",
        descripcion: "Fruta dulce ideal para postres.",
        consejos: "Plántala en macetas o jardineras. Necesita sol directo y riego moderado."
    },
    {
        nombre: "Romero",
        tipo: "Hierba",
        descripcion: "Aromática usada en cocina y medicina.",
        consejos: "Crece bien en suelos secos. No necesita mucho riego y ama el sol."
    },
    {
        nombre: "Lechuga",
        tipo: "Hortaliza",
        descripcion: "Hortaliza de hojas verdes muy usada en ensaladas.",
        consejos: "Necesita semisombra y riegos frecuentes. Protege del calor extremo."
    },
    {
        nombre: "Albahaca",
        tipo: "Hierba",
        descripcion: "Planta aromática ideal para cocinar.",
        consejos: "Requiere sol directo y riego diario en climas cálidos. Pellizca las flores para que no suba a semilla."
    },
    {
        nombre: "Tomate",
        tipo: "Fruta",
        descripcion: "Fruto muy usado en cocina.",
        consejos: "Necesita sol directo, riego constante sin mojar las hojas y tutores para sostener la planta."
    },
    {
        nombre: "Cilantro",
        tipo: "Hierba",
        descripcion: "Aromática de uso común en la cocina.",
        consejos: "Siembra en primavera, en semisombra. Riega con frecuencia para mantener la humedad."
    },
    {
        nombre: "Espinaca",
        tipo: "Hortaliza",
        descripcion: "Hortaliza de hoja verde rica en hierro.",
        consejos: "Prefiere climas frescos. Riega de forma regular y cosecha hojas externas primero."
    },

    {
        nombre: "Berenjena",
        tipo: "Hortaliza",
        descripcion: "Fruto de color morado, ideal para guisos.",
        consejos: "Requiere mucho sol, suelos bien drenados y riego moderado."
    },
    {
        nombre: "Yuca",
        tipo: "Raíz",
        descripcion: "Tubérculo rico en carbohidratos.",
        consejos: "Prefiere suelos sueltos y profundos. Necesita poco riego y mucho sol."
    },
    {
        nombre: "Camote",
        tipo: "Raíz",
        descripcion: "Dulce y rica en nutrientes.",
        consejos: "Siembra en suelos sueltos. Requiere sol pleno y riego ocasional."
    },
    {
        nombre: "Maíz",
        tipo: "Cereal",
        descripcion: "Planta alta con mazorcas.",
        consejos: "Requiere sol pleno, riego constante y espacio amplio para crecer."
    },
    {
        nombre: "Sandía",
        tipo: "Fruta",
        descripcion: "Fruto grande y jugoso ideal para climas cálidos.",
        consejos: "Necesita mucho sol, suelos arenosos y riego moderado."
    },
    {
        nombre: "Melón",
        tipo: "Fruta",
        descripcion: "Fruta dulce con alto contenido de agua.",
        consejos: "Requiere sol pleno, suelos bien drenados y poco riego durante la maduración."
    },
    {
        nombre: "Papaya",
        tipo: "Fruta",
        descripcion: "Fruto tropical dulce y digestivo.",
        consejos: "Requiere buen sol, riego regular y suelos fértiles."
    },
    {
        nombre: "Ajo",
        tipo: "Bulbo",
        descripcion: "Muy usado en la cocina.",
        consejos: "Prefiere semisombra, suelo suelto y riego moderado."
    },
    {
        nombre: "Cebolla",
        tipo: "Bulbo",
        descripcion: "Base aromática para muchas comidas.",
        consejos: "Requiere sol parcial a pleno, riego moderado y suelo fértil."
    },
    {
        nombre: "Guayaba",
        tipo: "Fruta",
        descripcion: "Rica en vitamina C.",
        consejos: "Requiere sol pleno, riego regular y poda ocasional."
    }
];

// Función para mostrar modal de confirmación personalizado
function mostrarModalConfirmacion(mensaje, onAceptar, textoBotonPrincipal = 'Sí, ir a lista', textoPregunta = '¿Deseas ir a la lista de cultivos?') {
    // Crear el modal de confirmación
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
    titulo.textContent = '✅ ¡Éxito!';
    titulo.style.cssText = `
        margin: 0 0 15px 0;
        color: #66bb6a;
        font-size: 24px;
    `;

    const texto = document.createElement('p');
    texto.textContent = mensaje;
    texto.style.cssText = `
        margin: 0 0 25px 0;
        font-size: 16px;
        line-height: 1.4;
    `;

    const pregunta = document.createElement('p');
    pregunta.textContent = textoPregunta;
    pregunta.style.cssText = `
        margin: 0 0 25px 0;
        font-size: 14px;
        color: #ccc;
    `;

    const botones = document.createElement('div');
    botones.style.cssText = `
        display: flex;
        gap: 15px;
        justify-content: center;
    `;

    const btnAceptar = document.createElement('button');
    btnAceptar.textContent = textoBotonPrincipal;
    btnAceptar.style.cssText = `
        padding: 10px 20px;
        background: #66bb6a;
        color: black;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        transition: background 0.3s;
    `;

    const btnCancelar = document.createElement('button');
    btnCancelar.textContent = 'Quedarme aquí';
    btnCancelar.style.cssText = `
        padding: 10px 20px;
        background: transparent;
        color: #ccc;
        border: 1px solid #666;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s;
    `;

    // Efectos hover
    btnAceptar.onmouseover = () => btnAceptar.style.background = '#4caf50';
    btnAceptar.onmouseout = () => btnAceptar.style.background = '#66bb6a';

    btnCancelar.onmouseover = () => {
        btnCancelar.style.background = 'rgba(255,255,255,0.1)';
        btnCancelar.style.color = 'white';
    };
    btnCancelar.onmouseout = () => {
        btnCancelar.style.background = 'transparent';
        btnCancelar.style.color = '#ccc';
    };

    // Event listeners
    btnAceptar.onclick = () => {
        document.body.removeChild(modal);
        onAceptar();
    };

    btnCancelar.onclick = () => {
        document.body.removeChild(modal);
    };

    // Construir modal
    botones.appendChild(btnAceptar);
    botones.appendChild(btnCancelar);
    modalContent.appendChild(titulo);
    modalContent.appendChild(texto);
    modalContent.appendChild(pregunta);
    modalContent.appendChild(botones);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

// Función para mostrar modal de confirmación de eliminación
function mostrarModalEliminacion(mensaje, onConfirmar) {
    // Crear el modal de confirmación
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
    titulo.textContent = '⚠️ Confirmar eliminación';
    titulo.style.cssText = `
        margin: 0 0 15px 0;
        color: #ff6b6b;
        font-size: 24px;
    `;

    const texto = document.createElement('p');
    texto.textContent = mensaje;
    texto.style.cssText = `
        margin: 0 0 25px 0;
        font-size: 16px;
        line-height: 1.4;
    `;

    const advertencia = document.createElement('p');
    advertencia.textContent = 'Los usuarios no podrán tener acceso a este cultivo';
    advertencia.style.cssText = `
        margin: 0 0 25px 0;
        font-size: 14px;
        color: #ffab91;
        font-style: italic;
    `;

    const botones = document.createElement('div');
    botones.style.cssText = `
        display: flex;
        gap: 15px;
        justify-content: center;
    `;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Sí, eliminar';
    btnEliminar.style.cssText = `
        padding: 10px 20px;
        background: #e57373;
        color: black;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        transition: background 0.3s;
    `;

    const btnCancelar = document.createElement('button');
    btnCancelar.textContent = 'Cancelar';
    btnCancelar.style.cssText = `
        padding: 10px 20px;
        background: transparent;
        color: #ccc;
        border: 1px solid #666;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s;
    `;

    // Efectos hover
    btnEliminar.onmouseover = () => btnEliminar.style.background = '#c62828';
    btnEliminar.onmouseout = () => btnEliminar.style.background = '#e57373';

    btnCancelar.onmouseover = () => {
        btnCancelar.style.background = 'rgba(255,255,255,0.1)';
        btnCancelar.style.color = 'white';
    };
    btnCancelar.onmouseout = () => {
        btnCancelar.style.background = 'transparent';
        btnCancelar.style.color = '#ccc';
    };

    // Event listeners
    btnEliminar.onclick = () => {
        document.body.removeChild(modal);
        onConfirmar();
    };

    btnCancelar.onclick = () => {
        document.body.removeChild(modal);
    };

    // Construir modal
    botones.appendChild(btnEliminar);
    botones.appendChild(btnCancelar);
    modalContent.appendChild(titulo);
    modalContent.appendChild(texto);
    modalContent.appendChild(advertencia);
    modalContent.appendChild(botones);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

// Composable para registrar cultivos
export function useRegistrarCultivos() {
    const router = useRouter()

    // Datos reactivos del formulario
    const formData = reactive({
        nombre: '',
        fecha: '',
        cantidad: '',
        observaciones: ''
    })

    // Errores de validación
    const errors = reactive({
        nombre: '',
        fecha: '',
        cantidad: '',
        observaciones: ''
    })

    // Referencias a elementos del formulario (si necesitas acceso directo)
    const cultivoForm = ref(null)
    const nombreInput = ref(null)
    const fechaInput = ref(null)
    const cantidadInput = ref(null)
    const observacionesInput = ref(null)

    // Estado para manejar la planta seleccionada
    const plantaSeleccionada = ref(null)

    // Función para manejar la selección de planta
    const onPlantaSeleccionada = () => {
        if (formData.nombre) {
            plantaSeleccionada.value = plantas.find(planta => planta.nombre === formData.nombre)
        } else {
            plantaSeleccionada.value = null
        }
    }

    // Función para limpiar errores
    const limpiarErrores = () => {
        errors.nombre = ''
        errors.fecha = ''
        errors.cantidad = ''
        errors.observaciones = ''
    }

    // Función para validar el formulario
    const validarFormulario = () => {
        limpiarErrores()
        let valido = true

        // Validar nombre
        if (formData.nombre.trim() === '') {
            errors.nombre = 'Por favor, selecciona una planta.'
            valido = false
        }

        // Validar fecha
        if (formData.fecha === '') {
            errors.fecha = 'Por favor, selecciona una fecha de siembra.'
            valido = false
        }

        // Validar cantidad
        if (formData.cantidad === '' || formData.cantidad === null) {
            errors.cantidad = 'Por favor, ingresa la cantidad sembrada.'
            valido = false
        } else if (Number(formData.cantidad) <= 0) {
            errors.cantidad = 'La cantidad debe ser mayor que cero.'
            valido = false
        }

        // Validar observaciones 
        if (formData.observaciones !== '' && formData.observaciones.trim().length < 5) {
            errors.observaciones = 'Las observaciones deben tener al menos 5 caracteres si se escriben.'
            valido = false
        } else if (formData.observaciones.length > 300) {
            errors.observaciones = 'Las observaciones no pueden tener más de 300 caracteres.'
            valido = false
        }

        console.log('Validación completada:', { valido, errors }) // Para debug
        return valido
    }

    // Función para guardar cultivo
    const guardarCultivo = () => {
        const plantaInfo = plantas.find(planta => planta.nombre === formData.nombre)

        const cultivo = {
            nombre: formData.nombre.trim(),
            tipo: plantaInfo ? plantaInfo.tipo : '',
            descripcion: plantaInfo ? plantaInfo.descripcion : '',
            consejos: plantaInfo ? plantaInfo.consejos : '',
            fecha: formData.fecha,
            cantidad: formData.cantidad,
            observaciones: formData.observaciones.trim()
        }

        let cultivos = JSON.parse(localStorage.getItem('cultivos')) || []
        cultivos.push(cultivo)
        localStorage.setItem('cultivos', JSON.stringify(cultivos))

        console.log('Cultivo guardado:', cultivo) // Para debug
    }

    // Función para resetear el formulario
    const resetearFormulario = () => {
        formData.nombre = ''
        formData.fecha = ''
        formData.cantidad = ''
        formData.observaciones = ''
        plantaSeleccionada.value = null
        limpiarErrores()

        console.log('Formulario reseteado') // Para debug
    }

    // Manejador del submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('Formulario enviado:', formData) // Para debug

        if (validarFormulario()) {
            guardarCultivo()
            resetearFormulario()

            // Mostrar modal elegante en lugar de alert
            mostrarModalConfirmacion(
                '¡Cultivo agregado correctamente!',
                () => {
                    router.push('/view-crop')
                }
            )
        }
    }

    return {
        formData,
        errors,
        cultivoForm,
        nombreInput,
        fechaInput,
        cantidadInput,
        observacionesInput,
        plantas,
        plantaSeleccionada,
        onPlantaSeleccionada,
        handleSubmit,
        limpiarErrores,
        resetearFormulario
    }
}

// Composable para editar cultivos 
export function useEditarCultivos() {
    const router = useRouter()
    const route = useRoute()

    // Datos reactivos del formulario
    const formData = reactive({
        nombre: '',
        fecha: '',
        cantidad: '',
        observaciones: ''
    })

    // Errores de validación
    const errors = reactive({
        nombre: '',
        fecha: '',
        cantidad: '',
        observaciones: ''
    })

    // Referencias a elementos del formulario
    const cultivoForm = ref(null)
    const nombreInput = ref(null)
    const fechaInput = ref(null)
    const cantidadInput = ref(null)
    const observacionesInput = ref(null)

    // Estado para manejar la planta seleccionada
    const plantaSeleccionada = ref(null)

    // Índice del cultivo que se está editando
    const cultivoIndex = ref(null)

    // Función para cargar datos del cultivo a editar
    const cargarCultivoParaEditar = () => {
        const index = route.params.index
        if (index !== undefined) {
            cultivoIndex.value = parseInt(index)
            const cultivos = JSON.parse(localStorage.getItem('cultivos')) || []
            
            if (cultivos[cultivoIndex.value]) {
                const cultivo = cultivos[cultivoIndex.value]
                formData.nombre = cultivo.nombre
                formData.fecha = cultivo.fecha
                formData.cantidad = cultivo.cantidad
                formData.observaciones = cultivo.observaciones
                
                // Establecer la planta seleccionada
                plantaSeleccionada.value = plantas.find(planta => planta.nombre === cultivo.nombre)
            }
        }
    }

    // Función para manejar la selección de planta
    const onPlantaSeleccionada = () => {
        if (formData.nombre) {
            plantaSeleccionada.value = plantas.find(planta => planta.nombre === formData.nombre)
        } else {
            plantaSeleccionada.value = null
        }
    }

    // Función para limpiar errores
    const limpiarErrores = () => {
        errors.nombre = ''
        errors.fecha = ''
        errors.cantidad = ''
        errors.observaciones = ''
    }

    // Función para validar el formulario
    const validarFormulario = () => {
        limpiarErrores()
        let valido = true

        // Validar nombre
        if (formData.nombre.trim() === '') {
            errors.nombre = 'Por favor, selecciona una planta.'
            valido = false
        }

        // Validar fecha
        if (formData.fecha === '') {
            errors.fecha = 'Por favor, selecciona una fecha de siembra.'
            valido = false
        }

        // Validar cantidad
        if (formData.cantidad === '' || formData.cantidad === null) {
            errors.cantidad = 'Por favor, ingresa la cantidad sembrada.'
            valido = false
        } else if (Number(formData.cantidad) <= 0) {
            errors.cantidad = 'La cantidad debe ser mayor que cero.'
            valido = false
        }

        // Validar observaciones (opcional)
        if (formData.observaciones !== '' && formData.observaciones.trim().length < 5) {
            errors.observaciones = 'Las observaciones deben tener al menos 5 caracteres si se escriben.'
            valido = false
        } else if (formData.observaciones.length > 300) {
            errors.observaciones = 'Las observaciones no pueden tener más de 300 caracteres.'
            valido = false
        }

        return valido
    }

    // Función para actualizar cultivo
    const actualizarCultivo = () => {
        const plantaInfo = plantas.find(planta => planta.nombre === formData.nombre)

        const cultivoActualizado = {
            nombre: formData.nombre.trim(),
            tipo: plantaInfo ? plantaInfo.tipo : '',
            descripcion: plantaInfo ? plantaInfo.descripcion : '',
            consejos: plantaInfo ? plantaInfo.consejos : '',
            fecha: formData.fecha,
            cantidad: formData.cantidad,
            observaciones: formData.observaciones.trim()
        }

        let cultivos = JSON.parse(localStorage.getItem('cultivos')) || []
        cultivos[cultivoIndex.value] = cultivoActualizado
        localStorage.setItem('cultivos', JSON.stringify(cultivos))

        console.log('Cultivo actualizado:', cultivoActualizado)
    }

    // Manejador del submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault()

        if (validarFormulario()) {
            actualizarCultivo()

            // Mostrar modal elegante
            mostrarModalConfirmacion(
                '¡Cultivo actualizado correctamente!',
                () => {
                    router.push('/view-crop')
                },
                'Ir a lista de cultivos',
                '¿Deseas ver la lista de cultivos?'
            )
        }
    }

    // Cargar datos al montar el componente
    onMounted(() => {
        cargarCultivoParaEditar()
    })

    return {
        formData,
        errors,
        cultivoForm,
        nombreInput,
        fechaInput,
        cantidadInput,
        observacionesInput,
        plantas,
        plantaSeleccionada,
        onPlantaSeleccionada,
        handleSubmit,
        limpiarErrores
    }
}

export function useVerCultivos() {
    const router = useRouter()

    // Lista reactiva de cultivos
    const cultivos = ref([])

    // Función para cargar cultivos desde localStorage
    const cargarCultivos = () => {
        const cultivosGuardados = JSON.parse(localStorage.getItem('cultivos')) || []
        cultivos.value = cultivosGuardados
    }

    // Función para editar un cultivo
    const editarCultivo = (index) => {
        router.push(`/edit-crop/${index}`)
    }

    // Función para eliminar un cultivo
    const eliminarCultivo = (index) => {
        let cultivosActuales = JSON.parse(localStorage.getItem('cultivos')) || []
        cultivosActuales.splice(index, 1)
        localStorage.setItem('cultivos', JSON.stringify(cultivosActuales))

        // Recargar la lista
        cargarCultivos()

        // Mostrar modal de confirmación de eliminación exitosa
        mostrarModalConfirmacion(
            '¡Cultivo eliminado correctamente!',
            () => {
                router.push('/add-crop')
            },
            'Agregar nuevo cultivo',
            '¿Deseas agregar un nuevo cultivo?'
        )
    }

    // Función para confirmar eliminación
    const confirmarEliminacion = (index) => {
        mostrarModalEliminacion(
            '¿Estás seguro de que deseas eliminar este cultivo?',
            () => {
                eliminarCultivo(index)
            }
        )
    }

    // Función para ir a agregar cultivo
    const irAgregarCultivo = () => {
        router.push('/add-crop')
    }

    // Cargar cultivos al montar el componente
    onMounted(() => {
        cargarCultivos()
    })

    return {
        cultivos,
        cargarCultivos,
        editarCultivo,
        eliminarCultivo,
        confirmarEliminacion,
        irAgregarCultivo
    }
}

// Función utilitaria para obtener todos los cultivos
export function obtenerCultivos() {
    return JSON.parse(localStorage.getItem('cultivos')) || []
}

// Función utilitaria para guardar cultivos
export function guardarCultivos(cultivos) {
    localStorage.setItem('cultivos', JSON.stringify(cultivos))
}