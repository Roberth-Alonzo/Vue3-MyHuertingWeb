<template>
    <div class="login-wrapper">
        <router-link to="/" class="logo-link">MyHuertingWeb</router-link>
        <div class="container">
            <div class="login-content">
                <form id="login-form" @submit.prevent="onSubmit">
                    <img src="/public/images/avatar.svg" alt="Avatar" />
                    <h2 class="title">BIENVENIDO</h2>
                    
                    <div class="input-div one">
                        <div class="div">
                            <input id="email" type="email" class="input" name="email" required placeholder=" " v-model="email" />
                            <h5>Email</h5>
                        </div>
                    </div>
                    <div class="input-div pass">
                        <div class="div">
                            <input type="password" id="input" class="input" name="password" required placeholder=" " v-model="password" />
                            <h5>Contraseña</h5>
                        </div>
                    </div>
                    <span v-if="errorMessage" style="color: red; font-size: 1.1em; display: block; margin-top: 10px; margin-bottom: 10px; text-align: left; width: 100%;">{{ errorMessage }}</span>
                    <div class="text-center">
                        <p>¿No tienes cuenta? <router-link to="/sign-up">Regístrate</router-link></p>
                    </div>
                    <input class="btn" type="submit" value="INICIAR SESIÓN" />
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { useLoginLogic } from "./js/login.js";
export default {
    name: "Login",
    setup() {
        return useLoginLogic();
    },
};
</script>
<style scoped>
@import "./css/style.css";
</style>
