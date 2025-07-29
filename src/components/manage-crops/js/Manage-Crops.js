import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Composable para registrar cultivos (AddCrop.vue)
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
            errors.nombre = 'Por favor, ingresa el nombre del cultivo.'
            valido = false
        } else if (formData.nombre.trim().length < 3) {
            errors.nombre = 'El nombre debe tener al menos 3 caracteres.'
            valido = false
        } else if (formData.nombre.trim().length > 20) {
            errors.nombre = 'El nombre no debe tener más de 20 caracteres.'
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
        
        console.log('Validación completada:', { valido, errors }) // Para debug
        return valido
    }
    
    // Función para guardar cultivo
    const guardarCultivo = () => {
        const cultivo = {
            nombre: formData.nombre.trim(),
            fecha: formData.fecha,
            cantidad: formData.cantidad, // Sin .trim() porque es un número
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
        formData.cantidad = '' // Mantener como string vacío para el input
        formData.observaciones = ''
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
            
            alert('✅ Cultivo agregado correctamente.')
            // Navegar a la vista de cultivos
            router.push('/view-crop')
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
        handleSubmit,
        limpiarErrores,
        resetearFormulario
    }
}

// Composable para ver cultivos (ViewCrop.vue)
export function useVerCultivos() {
    const router = useRouter()
    
    // Lista reactiva de cultivos
    const cultivos = ref([])
    
    // Función para cargar cultivos desde localStorage
    const cargarCultivos = () => {
        const cultivosGuardados = JSON.parse(localStorage.getItem('cultivos')) || []
        cultivos.value = cultivosGuardados
    }
    
    // Función para eliminar un cultivo
    const eliminarCultivo = (index) => {
        let cultivosActuales = JSON.parse(localStorage.getItem('cultivos')) || []
        cultivosActuales.splice(index, 1)
        localStorage.setItem('cultivos', JSON.stringify(cultivosActuales))
        
        // Recargar la lista
        cargarCultivos()
        alert("✅ Cultivo eliminado correctamente.")
    }
    
    // Función para confirmar eliminación
    const confirmarEliminacion = (index) => {
        const confirmar = confirm("¿Estás seguro de que deseas eliminar este cultivo? Los usuarios no podrán tener acceso a este")
        if (confirmar) {
            eliminarCultivo(index)
        }
    }
    
    // Cargar cultivos al montar el componente
    onMounted(() => {
        cargarCultivos()
    })
    
    return {
        cultivos,
        cargarCultivos,
        eliminarCultivo,
        confirmarEliminacion
    }
}

// Función utilitaria para obtener todos los cultivos (puede ser útil en otros componentes)
export function obtenerCultivos() {
    return JSON.parse(localStorage.getItem('cultivos')) || []
}

// Función utilitaria para guardar cultivos (puede ser útil en otros componentes)
export function guardarCultivos(cultivos) {
    localStorage.setItem('cultivos', JSON.stringify(cultivos))
}