import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

function mostrarModalConfirmacion(mensaje, onAceptar, textoBotonPrincipal = 'Sí, continuar', textoPregunta = '¿Deseas continuar?') {
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

    btnAceptar.onclick = () => {
        document.body.removeChild(modal);
        onAceptar();
    };

    btnCancelar.onclick = () => {
        document.body.removeChild(modal);
    };

    botones.appendChild(btnAceptar);
    botones.appendChild(btnCancelar);
    modalContent.appendChild(titulo);
    modalContent.appendChild(texto);
    modalContent.appendChild(pregunta);
    modalContent.appendChild(botones);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
}

export const useUserProfile = () => {
    const router = useRouter();

    const profileForm = ref(null);
    const nombreInput = ref(null);
    const apellidoInput = ref(null);
    const telefonoInput = ref(null);
    const edadInput = ref(null);
    const generoSelect = ref(null);
    const direccionInput = ref(null);
    const experienciaSelect = ref(null);
    const tipoViviendaSelect = ref(null);
    const espacioPlantasSelect = ref(null);
    const interesesSelect = ref(null);

    const nombreError = ref(null);
    const apellidoError = ref(null);
    const telefonoError = ref(null);
    const edadError = ref(null);
    const generoError = ref(null);
    const direccionError = ref(null);
    const experienciaError = ref(null);
    const tipoViviendaError = ref(null);
    const espacioPlantasError = ref(null);
    const interesesError = ref(null);

    const isEditing = ref(false);
    const hasProfileData = ref(false);
    const currentProfile = ref({});

    const formData = reactive({
        nombre: '',
        apellido: '',
        telefono: '',
        edad: '',
        genero: '',
        direccion: '',
        experiencia: '',
        tipoVivienda: '',
        espacioPlantas: '',
        intereses: ''
    });

    const getCurrentUserId = () => {
        // Opción 1: Usar userInfo existente
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const userData = JSON.parse(userInfo);
            return userData.email;
        }
        
        // Opción 2: Usar currentUser si existe
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const userData = JSON.parse(currentUser);
            return userData.id || userData.email;
        }
        
        return null;
    };

    const getProfileStorageKey = () => {
        const userId = getCurrentUserId();
        if (!userId) {
            console.error('No hay usuario logueado');
            return null;
        }
        return `userProfileData_${userId}`;
    };

    const showError = (element, message) => {
        if (element) {
            element.textContent = message;
            element.style.color = "red";
            element.style.display = "block";
            element.style.marginTop = "5px";
        }
    };

    const clearError = (element) => {
        if (element) {
            element.textContent = "";
            element.style.display = "none";
        }
    };

    const clearAllErrors = () => {
        [nombreError, apellidoError, telefonoError, edadError, generoError,
            direccionError, experienciaError, tipoViviendaError, espacioPlantasError, interesesError]
            .forEach(errorRef => clearError(errorRef.value));
    };

    const validateNombre = () => {
        if (!formData.nombre.trim()) {
            showError(nombreError.value, "El nombre es requerido");
            return false;
        }
        if (formData.nombre.trim().length < 2) {
            showError(nombreError.value, "El nombre debe tener al menos 2 caracteres");
            return false;
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombre.trim())) {
            showError(nombreError.value, "El nombre solo puede contener letras");
            return false;
        }
        clearError(nombreError.value);
        return true;
    };

    const validateApellido = () => {
        if (!formData.apellido.trim()) {
            showError(apellidoError.value, "El apellido es requerido");
            return false;
        }
        if (formData.apellido.trim().length < 2) {
            showError(apellidoError.value, "El apellido debe tener al menos 2 caracteres");
            return false;
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.apellido.trim())) {
            showError(apellidoError.value, "El apellido solo puede contener letras");
            return false;
        }
        clearError(apellidoError.value);
        return true;
    };

    const validateTelefono = () => {
        if (!formData.telefono.trim()) {
            showError(telefonoError.value, "El teléfono es requerido");
            return false;
        }
        const telefonoRegex = /^(\+?593|0)?[9][0-9]{8}$/;
        if (!telefonoRegex.test(formData.telefono.replace(/[\s-]/g, ''))) {
            showError(telefonoError.value, "Ingresa un número de teléfono válido (ej: 0987654321)");
            return false;
        }
        clearError(telefonoError.value);
        return true;
    };

    const validateEdad = () => {
        if (!formData.edad) {
            showError(edadError.value, "La edad es requerida");
            return false;
        }
        
        const edadNum = parseInt(formData.edad);
        
        if (isNaN(edadNum)) {
            showError(edadError.value, "Por favor ingresa una edad válida");
            return false;
        }
        
        if (edadNum < 1 || edadNum > 120) {
            showError(edadError.value, "Por favor ingresa una edad entre 1 y 120 años");
            return false;
        }
        
        if (edadNum < 18) {
            showError(edadError.value, "Solo se permite el registro a partir de los 18 años");
            return false;
        }
        
        clearError(edadError.value);
        return true;
    };

    const validateGenero = () => {
        if (!formData.genero) {
            showError(generoError.value, "Por favor selecciona tu género");
            return false;
        }
        clearError(generoError.value);
        return true;
    };

    const validateDireccion = () => {
        if (!formData.direccion.trim()) {
            showError(direccionError.value, "La dirección es requerida");
            return false;
        }
        if (formData.direccion.trim().length < 10) {
            showError(direccionError.value, "La dirección debe ser más específica (mín. 10 caracteres)");
            return false;
        }
        clearError(direccionError.value);
        return true;
    };

    const validateExperiencia = () => {
        if (!formData.experiencia) {
            showError(experienciaError.value, "Por favor selecciona tu nivel de experiencia");
            return false;
        }
        clearError(experienciaError.value);
        return true;
    };

    const validateTipoVivienda = () => {
        if (!formData.tipoVivienda) {
            showError(tipoViviendaError.value, "Por favor selecciona tu tipo de vivienda");
            return false;
        }
        clearError(tipoViviendaError.value);
        return true;
    };

    const validateEspacioPlantas = () => {
        if (!formData.espacioPlantas) {
            showError(espacioPlantasError.value, "Por favor indica si tienes espacio para plantas");
            return false;
        }
        clearError(espacioPlantasError.value);
        return true;
    };

    const validateIntereses = () => {
        if (!formData.intereses) {
            showError(interesesError.value, "Por favor selecciona tus intereses de cultivo");
            return false;
        }
        clearError(interesesError.value);
        return true;
    };

    const getGeneroText = (value) => {
        const opciones = {
            'masculino': 'Masculino',
            'femenino': 'Femenino',
            'otro': 'Otro',
            'prefiero-no-decir': 'Prefiero no decir'
        };
        return opciones[value] || value;
    };

    const getExperienciaText = (value) => {
        const opciones = {
            'principiante': '🌱 Principiante',
            'intermedio': '🌿 Intermedio',
            'avanzado': '🌳 Avanzado'
        };
        return opciones[value] || value;
    };

    const getTipoViviendaText = (value) => {
        const opciones = {
            'casa': '🏠 Casa',
            'apartamento': '🏢 Apartamento',
            'otro': '🏘️ Otro'
        };
        return opciones[value] || value;
    };

    const getEspacioPlantasText = (value) => {
        const opciones = {
            'si': '✅ Sí, tengo buen espacio',
            'limitado': '⚠️ Limitado (balcón/ventana)',
            'no': '❌ No tengo espacio'
        };
        return opciones[value] || value;
    };

    const getInteresesText = (value) => {
        const opciones = {
            'vegetales': '🥕 Vegetales y hortalizas',
            'hierbas': '🌿 Hierbas aromáticas',
            'flores': '🌸 Flores ornamentales',
            'frutas': '🍓 Frutas pequeñas',
            'todo': '🌈 Un poco de todo'
        };
        return opciones[value] || value;
    };

    const loadProfileData = () => {
        const storageKey = getProfileStorageKey();
        if (!storageKey) {
            console.error('No se puede cargar el perfil: usuario no identificado');
            return;
        }

        const savedProfile = localStorage.getItem(storageKey);
        if (savedProfile) {
            currentProfile.value = JSON.parse(savedProfile);
            hasProfileData.value = true;
            Object.assign(formData, currentProfile.value);
        } else {
            hasProfileData.value = false;
            currentProfile.value = {};
            Object.keys(formData).forEach(key => {
                formData[key] = '';
            });
        }
    };

    const enableEditing = () => {
        isEditing.value = true;
        Object.assign(formData, currentProfile.value);
    };

    const cancelEditing = () => {
        isEditing.value = false;
        clearAllErrors();
        Object.assign(formData, currentProfile.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        clearAllErrors();

        const storageKey = getProfileStorageKey();
        if (!storageKey) {
            mostrarModalConfirmacion(
                'No se puede guardar el perfil. Usuario no identificado.',
                () => {},
                'Entendido',
                '¿Necesitas ayuda con la autenticación?'
            );
            return;
        }

        const validations = [
            validateNombre(),
            validateApellido(),
            validateTelefono(),
            validateEdad(),
            validateGenero(),
            validateDireccion(),
            validateExperiencia(),
            validateTipoVivienda(),
            validateEspacioPlantas(),
            validateIntereses()
        ];

        const isFormValid = validations.every(validation => validation === true);

        if (isFormValid) {
            const profileData = {
                nombre: formData.nombre.trim(),
                apellido: formData.apellido.trim(),
                telefono: formData.telefono.trim(),
                edad: parseInt(formData.edad),
                genero: formData.genero,
                direccion: formData.direccion.trim(),
                experiencia: formData.experiencia,
                tipoVivienda: formData.tipoVivienda,
                espacioPlantas: formData.espacioPlantas,
                intereses: formData.intereses,
                fechaActualizacion: new Date().toISOString().split('T')[0],
                userId: getCurrentUserId()
            };

            localStorage.setItem(storageKey, JSON.stringify(profileData));

            currentProfile.value = profileData;
            hasProfileData.value = true;
            isEditing.value = false;

            const mensaje = isEditing.value ? 'Información actualizada exitosamente!' : 'Información guardada exitosamente!';
            mostrarModalConfirmacion(
                mensaje,
                () => {
                    router.push('/main-menu');
                },
                'Sí, ir al menú principal',
                '¿Deseas ir al menú principal?'
            );

            console.log('Perfil guardado para usuario:', getCurrentUserId(), profileData);
        } else {
            console.log('Formulario inválido - revisa los errores');
        }
    };

    onMounted(() => {
        const userId = getCurrentUserId();
        if (!userId) {
            console.error('No hay usuario logueado');
            return;
        }
        
        loadProfileData();
    });

    return {
        profileForm,
        nombreInput,
        apellidoInput,
        telefonoInput,
        edadInput,
        generoSelect,
        direccionInput,
        experienciaSelect,
        tipoViviendaSelect,
        espacioPlantasSelect,
        interesesSelect,
        nombreError,
        apellidoError,
        telefonoError,
        edadError,
        generoError,
        direccionError,
        experienciaError,
        tipoViviendaError,
        espacioPlantasError,
        interesesError,
        isEditing,
        hasProfileData,
        currentProfile,
        formData,
        handleSubmit,
        enableEditing,
        cancelEditing,
        getGeneroText,
        getExperienciaText,
        getTipoViviendaText,
        getEspacioPlantasText,
        getInteresesText
    };
};