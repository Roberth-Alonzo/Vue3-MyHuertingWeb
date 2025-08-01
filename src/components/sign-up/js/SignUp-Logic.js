import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";

// Función para mostrar modal de confirmación personalizado
function mostrarModalConfirmacion(mensaje, onIrLogin, textoPregunta = '¿Deseas ir al inicio de sesión?') {
  
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
        animation: modalFadeIn 0.3s ease-out;
    `;

    // Agregar keyframes para la animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modalFadeIn {
            from {
                opacity: 0;
                transform: scale(0.9) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    const titulo = document.createElement('h3');
    titulo.textContent = '🎉 ¡Registro exitoso!';
    titulo.style.cssText = `
        margin: 0 0 15px 0;
        color: #66bb6a;
        font-size: 24px;
        font-weight: bold;
    `;

    const texto = document.createElement('p');
    texto.textContent = mensaje;
    texto.style.cssText = `
        margin: 0 0 20px 0;
        font-size: 16px;
        line-height: 1.5;
        color: #e8e8e8;
    `;

    const pregunta = document.createElement('p');
    pregunta.textContent = textoPregunta;
    pregunta.style.cssText = `
        margin: 0 0 25px 0;
        font-size: 14px;
        color: #ccc;
        font-style: italic;
    `;

    const botones = document.createElement('div');
    botones.style.cssText = `
        display: flex;
        gap: 15px;
        justify-content: center;
        flex-wrap: wrap;
    `;

    const btnIrLogin = document.createElement('button');
    btnIrLogin.textContent = '✓ Sí, ir al login';
    btnIrLogin.style.cssText = `
        padding: 12px 24px;
        background: #66bb6a;
        color: #000;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        transition: all 0.3s ease;
        min-width: 140px;
    `;

    const btnQuedarme = document.createElement('button');
    btnQuedarme.textContent = 'Quedarme aquí';
    btnQuedarme.style.cssText = `
        padding: 12px 24px;
        background: transparent;
        color: #ccc;
        border: 1px solid #666;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
        min-width: 140px;
    `;

    // Efectos hover
    btnIrLogin.onmouseover = () => {
        btnIrLogin.style.background = '#4caf50';
        btnIrLogin.style.transform = 'translateY(-2px)';
        btnIrLogin.style.boxShadow = '0 4px 12px rgba(102, 187, 106, 0.4)';
    };
    btnIrLogin.onmouseout = () => {
        btnIrLogin.style.background = '#66bb6a';
        btnIrLogin.style.transform = 'translateY(0)';
        btnIrLogin.style.boxShadow = 'none';
    };
    
    btnQuedarme.onmouseover = () => {
        btnQuedarme.style.background = 'rgba(255,255,255,0.1)';
        btnQuedarme.style.color = 'white';
        btnQuedarme.style.borderColor = '#999';
        btnQuedarme.style.transform = 'translateY(-2px)';
    };
    btnQuedarme.onmouseout = () => {
        btnQuedarme.style.background = 'transparent';
        btnQuedarme.style.color = '#ccc';
        btnQuedarme.style.borderColor = '#666';
        btnQuedarme.style.transform = 'translateY(0)';
    };

    // Event listeners
    btnIrLogin.onclick = () => {
        modalContent.style.animation = 'modalFadeIn 0.2s ease-in reverse';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
            onIrLogin();
        }, 200);
    };

    btnQuedarme.onclick = () => {
        modalContent.style.animation = 'modalFadeIn 0.2s ease-in reverse';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }, 200);
    };

    // Cerrar con ESC
    const cerrarConEsc = (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.head.removeChild(style);
            document.removeEventListener('keydown', cerrarConEsc);
        }
    };
    document.addEventListener('keydown', cerrarConEsc);

    // Construir modal
    botones.appendChild(btnIrLogin);
    botones.appendChild(btnQuedarme);
    modalContent.appendChild(titulo);
    modalContent.appendChild(texto);
    modalContent.appendChild(pregunta);
    modalContent.appendChild(botones);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
}

export function useSignUpValidations() {
  const router = useRouter();
  
  // Referencias a los elementos del DOM
  const registerForm = ref(null);
  const nombreInput = ref(null);
  const emailInput = ref(null);
  const passwordInput = ref(null);
  const passwordConfirmInput = ref(null);
  const nombreError = ref(null);
  const emailError = ref(null);
  const passwordError = ref(null);
  const passwordConfirmError = ref(null);
  const strengthBar = ref(null);
  const strengthText = ref(null);

  // Función para mostrar errores
  const showError = (element, message) => {
    if (element) {
      element.textContent = message;
      element.style.color = "red";
      element.style.display = "block";
    }
  };

  // Función para limpiar errores
  const clearError = (element) => {
    if (element) {
      element.textContent = "";
      element.style.display = "none";
    }
  };

  // Limpiar todos los errores
  const clearAllErrors = () => {
    clearError(nombreError.value);
    clearError(emailError.value);
    clearError(passwordError.value);
    clearError(passwordConfirmError.value);
  };

  // Validar nombre - CON VALIDACIÓN EN TIEMPO REAL
  const validateName = () => {
    const name = nombreInput.value?.value || "";
    console.log("Validando nombre:", name);
    
    if (!name.trim()) {
      showError(nombreError.value, "El nombre es requerido");
      return false;
    }
    if (name.trim().length < 2) {
      showError(nombreError.value, "El nombre debe tener al menos 2 caracteres");
      return false;
    }
    clearError(nombreError.value);
    return true;
  };

  // Validar email 
  const validateEmail = () => {
    const email = emailInput.value?.value || "";
    console.log("Validando email:", email);
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      showError(emailError.value, "El email es requerido");
      return false;
    }
    if (!emailRegex.test(email)) {
      showError(emailError.value, "Por favor ingresa un email válido");
      return false;
    }
    
    // Verificar si el email ya existe
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");
    const emailExists = usuariosRegistrados.some(user => user.email === email.trim());
    
    if (emailExists) {
      showError(emailError.value, "Este email ya está registrado");
      return false;
    }
    
    clearError(emailError.value);
    return true;
  };

  // Actualizar barra de fortaleza
  const updatePasswordStrength = (password) => {
    let strength = 0;
    let feedback = "";
    let color = "";

    if (password.length === 0) {
      feedback = "";
      color = "transparent";
      strength = 0;
    } else if (password.length < 6) {
      strength = 20;
      feedback = "Muy débil";
      color = "#ff4757";
    } else {
      strength = 20;
      if (password.length >= 8) strength += 20;
      if (/[A-Z]/.test(password)) strength += 20;
      if (/[a-z]/.test(password)) strength += 20;
      if (/[0-9]/.test(password)) strength += 10;
      if (/[^A-Za-z0-9]/.test(password)) strength += 10;

      if (strength < 40) {
        feedback = "Débil";
        color = "#ff6b6b";
      } else if (strength < 70) {
        feedback = "Moderada";
        color = "#feca57";
      } else {
        feedback = "Fuerte";
        color = "#48cab2";
      }
    }

    // Actualizar elementos directamente
    if (strengthBar.value) {
      strengthBar.value.style.width = `${strength}%`;
      strengthBar.value.style.backgroundColor = color;
    }

    if (strengthText.value) {
      strengthText.value.textContent = feedback;
      strengthText.value.style.color = color;
    }

    return strength >= 40;
  };

  // Validar contraseña
  const validatePassword = () => {
    const password = passwordInput.value?.value || "";
    console.log("Validando password:", password);
    
    if (!password) {
      showError(passwordError.value, "La contraseña es requerida");
      return false;
    }
    
    if (!updatePasswordStrength(password)) {
      showError(passwordError.value, "La contraseña debe ser más fuerte (mínimo 6 caracteres)");
      return false;
    }
    
    clearError(passwordError.value);
    return true;
  };

  // Validar confirmación
  const validatePasswordConfirm = () => {
    const password = passwordInput.value?.value || "";
    const passwordConfirm = passwordConfirmInput.value?.value || "";
    console.log("Validando confirmación:", { password, passwordConfirm });
    
    if (!passwordConfirm) {
      showError(passwordConfirmError.value, "Confirma tu contraseña");
      return false;
    }
    if (password !== passwordConfirm) {
      showError(passwordConfirmError.value, "Las contraseñas no coinciden");
      return false;
    }
    clearError(passwordConfirmError.value);
    return true;
  };

  // Event listeners
  const setupRealTimeValidation = () => {
    console.log("Configurando validación en tiempo real...");
    
    // NOMBRE - Validación inmediata
    if (nombreInput.value) {
      ['input', 'keyup', 'blur'].forEach(eventType => {
        nombreInput.value.addEventListener(eventType, () => {
          setTimeout(() => {
            validateName(); // Validar inmediatamente
          }, 100);
        });
      });
    }

    // EMAIL - Validación inmediata
    if (emailInput.value) {
      ['input', 'keyup', 'blur'].forEach(eventType => {
        emailInput.value.addEventListener(eventType, () => {
          setTimeout(() => {
            validateEmail(); // Validar inmediatamente
          }, 300); 
        });
      });
    }

    // PASSWORD - Validación inmediata
    if (passwordInput.value) {
      ['input', 'keyup'].forEach(eventType => {
        passwordInput.value.addEventListener(eventType, (e) => {
          setTimeout(() => {
            const password = e.target.value;
            updatePasswordStrength(password);
            
            // Validar solo si hay contenido
            if (password.length > 0) {
              validatePassword();
            } else {
              clearError(passwordError.value);
            }
            
            // Re-validar confirmación si existe
            const confirmValue = passwordConfirmInput.value?.value || "";
            if (confirmValue) {
              validatePasswordConfirm();
            }
          }, 10);
        });
      });
    }

    if (passwordConfirmInput.value) {
      ['input', 'keyup', 'blur'].forEach(eventType => {
        passwordConfirmInput.value.addEventListener(eventType, () => {
          setTimeout(() => {
            const password = passwordInput.value?.value || "";
            const confirmValue = passwordConfirmInput.value?.value || "";
            
            // Solo validar si ambos campos tienen contenido
            if (confirmValue.length > 0 && password.length > 0) {
              validatePasswordConfirm();
            } else if (confirmValue.length === 0) {
              clearError(passwordConfirmError.value);
            }
          }, 10);
        });
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Formulario enviado");
    
    clearAllErrors();

    // Obtener valores
    const nombre = nombreInput.value?.value || "";
    const email = emailInput.value?.value || "";
    const password = passwordInput.value?.value || "";
    const passwordConfirm = passwordConfirmInput.value?.value || "";

    console.log("Valores del formulario:", { nombre, email, password, passwordConfirm });

    // Validar TODOS los campos
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isPasswordConfirmValid = validatePasswordConfirm();

    console.log("Resultados validación:", { 
      isNameValid, 
      isEmailValid, 
      isPasswordValid, 
      isPasswordConfirmValid 
    });

    if (isNameValid && isEmailValid && isPasswordValid && isPasswordConfirmValid) {
      // Obtener usuarios existentes
      const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");

      // Obtener fecha actual 
      const fechaActual = new Date();
      const fechaCreacion = fechaActual.toISOString().split('T')[0]; 

      // Crear nuevo usuario
      const nuevoUsuario = {
        id: Date.now(),
        nombre: nombre.trim(),
        email: email.trim(),
        password: password,
        fechaRegistro: fechaCreacion
      };

      // Guardar en la lista de usuarios
      usuariosRegistrados.push(nuevoUsuario);
      localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));
      
      // Guardar fecha de creación para el menú de usuario 
      localStorage.setItem("userCreatedAt", fechaCreacion);
      
      // Guardar datos del usuario para el menú desplegable
      const userInfo = {
        name: nuevoUsuario.nombre,
        email: nuevoUsuario.email
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      console.log("Usuario registrado:", nuevoUsuario);

      // Limpiar formulario
      if (nombreInput.value) nombreInput.value.value = "";
      if (emailInput.value) emailInput.value.value = "";
      if (passwordInput.value) passwordInput.value.value = "";
      if (passwordConfirmInput.value) passwordConfirmInput.value.value = "";
      
      // Limpiar barra
      if (strengthBar.value) {
        strengthBar.value.style.width = "0%";
        strengthBar.value.style.backgroundColor = "transparent";
      }
      if (strengthText.value) {
        strengthText.value.textContent = "";
      }

      // Limpiar errores
      clearAllErrors();

      mostrarModalConfirmacion(
        '¡Tu cuenta ha sido creada correctamente! Ya puedes iniciar sesión con tus credenciales.',
        () => {
          router.push("/log-in");
        }
      );
    } else {
      console.log("Formulario inválido");
    }
  };

  // Setup cuando monte
  onMounted(() => {
    console.log("Componente montado");
    
    nextTick(() => {
      console.log("Referencias disponibles:", {
        nombre: !!nombreInput.value,
        email: !!emailInput.value,
        password: !!passwordInput.value,
        passwordConfirm: !!passwordConfirmInput.value
      });
      
      setupRealTimeValidation();
    });
  });

  return {
    registerForm,
    nombreInput,
    emailInput,
    passwordInput,
    passwordConfirmInput,
    nombreError,
    emailError,
    passwordError,
    passwordConfirmError,
    strengthBar,
    strengthText,
    handleSubmit
  };
}