import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";

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

  // Validar email - CON VALIDACIÓN EN TIEMPO REAL
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

  // Validar contraseña - CON VALIDACIÓN EN TIEMPO REAL
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

  // Validar confirmación - CON VALIDACIÓN EN TIEMPO REAL
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

  // Event listeners CON VALIDACIÓN EN TIEMPO REAL
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
          }, 300); // Delay más largo para email por la verificación de duplicados
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

    // PASSWORD CONFIRM - Validación inmediata
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

  // Submit handler
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

    // Si todo está bien
    if (isNameValid && isEmailValid && isPasswordValid && isPasswordConfirmValid) {
      // Obtener usuarios existentes
      const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");

      // Crear nuevo usuario
      const nuevoUsuario = {
        id: Date.now(),
        nombre: nombre.trim(),
        email: email.trim(),
        password: password,
        fechaRegistro: new Date().toISOString()
      };

      // Guardar en la lista de usuarios
      usuariosRegistrados.push(nuevoUsuario);
      localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));
      
      // CORREGIDO: No sobrescribir userData aquí, solo guardarlo si es necesario
      // userData debería establecerse solo en el login exitoso
      localStorage.setItem("userData", JSON.stringify(nuevoUsuario));

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

      // Mostrar mensaje de éxito y redirigir
      console.log("Registro Exitoso....................");
      alert("¡Registro exitoso! Serás redirigido al login.");
      
      // Redirigir después de que el usuario haga click en "Aceptar"
      router.push("/log-in");
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
      
      setupRealTimeValidation(); // Cambié el nombre para ser más claro
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