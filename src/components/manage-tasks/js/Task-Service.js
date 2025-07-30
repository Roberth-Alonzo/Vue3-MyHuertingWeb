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

    if (!fecha.value) {
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

    return valido;
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
    advertencia.textContent = 'Esta acción no se puede deshacer';
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

// NUEVA: Función para mostrar modal después de eliminar tarea
function mostrarModalPostEliminacion(onAgregarNueva) {
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
    titulo.textContent = '✅ ¡Tarea eliminada!';
    titulo.style.cssText = `
        margin: 0 0 15px 0;
        color: #66bb6a;
        font-size: 24px;
    `;

    const texto = document.createElement('p');
    texto.textContent = 'La tarea ha sido eliminada correctamente.';
    texto.style.cssText = `
        margin: 0 0 25px 0;
        font-size: 16px;
        line-height: 1.4;
    `;

    const pregunta = document.createElement('p');
    pregunta.textContent = '¿Deseas agregar una nueva tarea?';
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

    const btnAgregar = document.createElement('button');
    btnAgregar.textContent = 'Sí, agregar tarea';
    btnAgregar.style.cssText = `
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

    const btnQuedar = document.createElement('button');
    btnQuedar.textContent = 'Quedarme aquí';
    btnQuedar.style.cssText = `
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
    btnAgregar.onmouseover = () => btnAgregar.style.background = '#4caf50';
    btnAgregar.onmouseout = () => btnAgregar.style.background = '#66bb6a';
    
    btnQuedar.onmouseover = () => {
        btnQuedar.style.background = 'rgba(255,255,255,0.1)';
        btnQuedar.style.color = 'white';
    };
    btnQuedar.onmouseout = () => {
        btnQuedar.style.background = 'transparent';
        btnQuedar.style.color = '#ccc';
    };

    // Event listeners
    btnAgregar.onclick = () => {
        document.body.removeChild(modal);
        onAgregarNueva();
    };

    btnQuedar.onclick = () => {
        document.body.removeChild(modal);
    };

    // Construir modal
    botones.appendChild(btnAgregar);
    botones.appendChild(btnQuedar);
    modalContent.appendChild(titulo);
    modalContent.appendChild(texto);
    modalContent.appendChild(pregunta);
    modalContent.appendChild(botones);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
}

// Función para mostrar diálogo de confirmación personalizado con opción de redirección
function mostrarConfirmacionConRedireccion(mensaje, onAceptar) {
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
    pregunta.textContent = '¿Deseas ir a la lista de tareas?';
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
    btnAceptar.textContent = 'Sí, ir a lista';
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

// Guardar nueva tarea con validaciones y callback de navegación ACTUALIZADA
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

    // Mostrar confirmación personalizada con opción de redirección
    mostrarConfirmacionConRedireccion(
        "¡Tarea programada exitosamente!",
        navigationCallback
    );
    
    // Limpiar formulario
    document.getElementById('titulo').value = '';
    document.getElementById('miembro').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('descripcion').value = '';
    
    return true;
}

// Obtener todas las tareas
export function obtenerTareas() {
    return JSON.parse(localStorage.getItem("tareas")) || [];
}

// Eliminar tarea por índice ACTUALIZADA
export function eliminarTarea(index) {
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

// Composable para ProgramarTarea ACTUALIZADO
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

// Composable para ListaTareas ACTUALIZADO
export function useListaTareas() {
    const router = useRouter()
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
        mostrarModalEliminacion(
            '¿Estás seguro de que deseas eliminar esta tarea?',
            () => {
                if (eliminarTarea(index)) {
                    cargarTareas()
                    
                    // MODIFICADO: Mostrar modal personalizado para después de eliminar
                    mostrarModalPostEliminacion(() => {
                        router.push('/add-task')  // Ir a agregar nueva tarea
                    })
                }
            }
        )
    }

    // NUEVA: Función para ir a agregar tarea
    const irAgregarTarea = () => {
        router.push('/add-task')
    }

    onMounted(() => {
        cargarTareas()
    })

    return {
        tareas,
        onEliminarTarea,
        cargarTareas,
        irAgregarTarea  // Exportar la nueva función
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