import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Función para mostrar error debajo del input/select
export function mostrarError(input, mensaje) {
    limpiarError(input);
    const divError = document.createElement('div');
    divError.className = 'error';
    divError.textContent = mensaje;
    divError.style.color = 'red';
    divError.style.fontSize = '0.9em';
    divError.style.marginTop = '4px';

    input.insertAdjacentElement('afterend', divError);
}

// Limpiar error específico debajo del input
export function limpiarError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains('error')) {
        next.remove();
    }
}

// Limpiar todos los errores del formulario
export function limpiarErrores() {
    document.querySelectorAll('.error').forEach(div => div.remove());
}

// Cargar miembros desde localStorage
export function cargarMiembros() {
    const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
    return usuarios;
}

// Validar formulario, mostrar errores debajo y devolver booleano
export function validarFormulario() {
    limpiarErrores();

    const titulo = document.getElementById('titulo');
    const miembro = document.getElementById('miembro');
    const fecha = document.getElementById('fecha');
    const hora = document.getElementById('hora');
    const descripcion = document.getElementById('descripcion');
    const archivoInput = document.getElementById('archivo');
    const archivo = archivoInput?.files[0];

    let valido = true;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (!titulo.value.trim() || titulo.value.trim().length < 5) {
        mostrarError(titulo, 'El título es obligatorio y debe tener al menos 5 caracteres.');
        valido = false;
    } else if (titulo.value.length > 20) {
        mostrarError(titulo, 'El título no debe tener más de 20 caracteres.');
        valido = false;
    }

    if (!miembro.value) {
        mostrarError(miembro, 'Por favor, asigna un usuario a la tarea.');
        valido = false;
    }

    if (fecha.value) {
        const parts = fecha.value.split('-');
        const fechaSeleccionada = new Date(parts[0], parts[1] - 1, parts[2]);
        
        if (fechaSeleccionada < hoy) {
            mostrarError(fecha, 'La fecha no puede ser anterior al día de hoy.');
            valido = false;
        }
    } else {
        mostrarError(fecha, 'La fecha es obligatoria.');
        valido = false;
    }

    if (!hora.value) {
        mostrarError(hora, 'La hora es obligatoria.');
        valido = false;
    }

    if (!descripcion.value.trim() || descripcion.value.trim().length < 5) {
        mostrarError(descripcion, 'La descripción es obligatoria y debe tener al menos 5 caracteres.');
        valido = false;
    } else if (descripcion.value.length > 300) {
        mostrarError(descripcion, 'La descripción no puede tener más de 300 caracteres.');
        valido = false;
    }

    if (archivo) {
        if (archivo.type !== "application/pdf") {
            mostrarError(archivoInput, 'Solo se permiten archivos en formato PDF.');
            valido = false;
        }
        const maxSizeMB = 2;
        if (archivo.size > maxSizeMB * 1024 * 1024) {
            mostrarError(archivoInput, `El archivo no debe superar los ${maxSizeMB} MB.`);
            valido = false;
        }
    }

    return valido;
}

// Guardar nueva tarea con validaciones y callback de navegación
export function guardarTarea(e, navigationCallback) {
    e.preventDefault();

    if (!validarFormulario()) {
        return false;
    }

    const titulo = document.getElementById('titulo').value.trim();
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const descripcion = document.getElementById('descripcion').value.trim();
    const miembro = document.getElementById('miembro').value;

    const tarea = {
        titulo,
        fecha,
        hora,
        descripcion,
        miembro,
        estado: "Pendiente"
    };

    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.push(tarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));

    alert("¡Tarea programada exitosamente!");
    
    // Limpiar formulario
    document.getElementById('titulo').value = '';
    document.getElementById('miembro').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('descripcion').value = '';
    const archivoInput = document.getElementById('archivo');
    if (archivoInput) archivoInput.value = '';
    
    // Ejecutar callback de navegación si existe
    if (navigationCallback) {
        navigationCallback();
    }
    
    return true;
}

// Obtener todas las tareas
export function obtenerTareas() {
    return JSON.parse(localStorage.getItem("tareas")) || [];
}

// Eliminar tarea por índice
export function eliminarTarea(index) {
    if (!confirm("¿Deseas eliminar esta tarea?")) return false;
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.splice(index, 1);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    return true;
}

// Guardar asignación
export function guardarAsignacion(event) {
    event.preventDefault();

    const miembro = document.getElementById("miembro").value;
    const responsabilidad = document.getElementById("responsabilidad").value.trim();
    const prioridad = document.getElementById("prioridad").value;

    if (!miembro || !responsabilidad || !prioridad) {
        alert("Por favor, completa todos los campos.");
        return false;
    }

    const nuevaAsignacion = {
        miembro,
        responsabilidad,
        prioridad,
        estado: "Pendiente"
    };

    const asignaciones = JSON.parse(localStorage.getItem("asignaciones")) || [];
    asignaciones.push(nuevaAsignacion);
    localStorage.setItem("asignaciones", JSON.stringify(asignaciones));

    return true;
}

// Obtener responsabilidades
export function obtenerResponsabilidades() {
    return JSON.parse(localStorage.getItem("responsabilidades")) || [];
}

// Manejar cambio de archivo
export function handleFileChange(event) {
    const file = event.target.files[0];
    // El archivo será procesado por la función de validación
    return file;
}

// ================= COMPOSABLES PARA VUE =================

// Composable para ProgramarTarea
export function useProgramarTarea() {
    const router = useRouter()
    const usuarios = ref([])

    onMounted(() => {
        usuarios.value = cargarMiembros()
    })

    const handleSubmit = (event) => {
        const success = guardarTarea(event, () => {
            router.push('/view-task')
        })
        return success
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        return file
    }

    return {
        usuarios,
        handleSubmit,
        handleFileChange
    }
}

// Composable para ListaTareas  
export function useListaTareas() {
    const tareas = ref([])

    const cargarTareas = () => {
        const todasLasTareas = obtenerTareas()
        tareas.value = todasLasTareas.filter(tarea => 
            tarea.titulo && 
            tarea.fecha && 
            tarea.hora && 
            tarea.descripcion
        )
    }

    const onEliminarTarea = (index) => {
        if (eliminarTarea(index)) {
            cargarTareas()
        }
    }

    onMounted(() => {
        cargarTareas()
    })

    return {
        tareas,
        onEliminarTarea,
        cargarTareas
    }
}

// ================= FUNCIONES LEGACY (Para compatibilidad) =================

// Inicializar componente ProgramarTarea
export function initProgramarTarea() {
    // Cargar miembros al inicializar
    const usuarios = cargarMiembros();
    
    // Configurar event listener para el formulario
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', guardarTarea);
    }
    
    return {
        usuarios: usuarios
    };
}

// Inicializar componente ListaTareas
export function initListaTareas() {
    const tareas = obtenerTareas();
    
    // Configurar event listeners para botones de eliminar
    setTimeout(() => {
        const botonesEliminar = document.querySelectorAll('.btn-eliminar');
        botonesEliminar.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if (eliminarTarea(index)) {
                    // Recargar la página o actualizar la vista
                    window.location.reload();
                }
            });
        });
    }, 100);
    
    return {
        tareas: tareas.filter(tarea => 
            tarea.titulo && 
            tarea.fecha && 
            tarea.hora && 
            tarea.descripcion
        )
    };
}

// Función para configurar el DOM después del render de Vue
export function setupDOMEventListeners() {
    // Esta función se llamará desde los componentes Vue después del render
    document.addEventListener('DOMContentLoaded', function () {
        // Listeners adicionales si son necesarios
    });
}