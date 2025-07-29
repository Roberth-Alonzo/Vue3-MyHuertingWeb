<template>
  <div class="signup-wrapper">
    <router-link to="/" class="logo-link">MyHuertingWeb</router-link>
    <div class="container">
      <div class="register-content">
        <form ref="registerForm" @submit.prevent="handleSubmit">
          <h2 class="title">REGISTRO</h2>

          <div class="input-div">
            <label for="nombre">Nombre completo</label>
            <input ref="nombreInput" id="nombre" type="text" name="nombre" />
            <span ref="nombreError" class="error"></span>
          </div>

          <div class="input-div">
            <label for="email">Email</label>
            <input ref="emailInput" id="email" type="text" name="email" />
            <span ref="emailError" class="error"></span>
          </div>

          <div class="input-div">
            <label for="password">Contraseña</label>
            <input ref="passwordInput" id="password" type="password" name="password" />
            <div id="strengthMeter">
              <div ref="strengthBar" class="strength-bar"></div>
            </div>
            <span ref="strengthText" id="strengthText"></span>
            <span ref="passwordError" class="error"></span>
          </div>

          <div class="input-div">
            <label for="passwordConfirm">Confirmar contraseña</label>
            <input
              ref="passwordConfirmInput"
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
            />
            <span ref="passwordConfirmError" class="error"></span>
          </div>

          <p class="have-account">
            ¿Ya tienes cuenta? <router-link to="/log-in">Inicia sesión</router-link>
          </p>

          <input class="btn" type="submit" value="REGISTRARSE" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useSignUpValidations } from "./js/SignUp-Logic.js";

export default {
  name: "SignUp",
  setup() {
    return useSignUpValidations();
  },
};
</script>

<style scoped>
@import "./css/style.css";
@import "./css/validations.css";
</style>
