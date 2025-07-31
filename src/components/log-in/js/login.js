import { ref } from "vue";
import { useRouter } from "vue-router";

export function useLoginLogic() {
  const router = useRouter();
  const email = ref("");
  const password = ref("");
  const errorMessage = ref("");

  const onSubmit = () => {
    // Buscar en la lista completa de usuarios registrados
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");
    
    console.log("Intentando login con:", { email: email.value, password: password.value });
    console.log("Usuarios registrados:", usuariosRegistrados);
    
    // Buscar el usuario en la lista completa
    const usuarioEncontrado = usuariosRegistrados.find(user => 
      user.email === email.value.trim() && 
      user.password === password.value
    );
    
    if (usuarioEncontrado) {
      console.log("Usuario encontrado:", usuarioEncontrado);
      
      // Limpiar mensaje de error
      errorMessage.value = "";
      
      // Establecer el usuario actual en userData
      localStorage.setItem("userData", JSON.stringify(usuarioEncontrado));
      
      // Redirigir al menú principal
      router.push("/main-menu");
    } else {
      console.log("Usuario no encontrado o credenciales incorrectas");
      errorMessage.value = "Credenciales incorrectas";
    }
  };

  return { email, password, errorMessage, onSubmit };
}