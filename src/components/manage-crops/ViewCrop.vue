<template>
    <div class="view-crop-wrapper">
        <header>
            <router-link to="/main-menu" class="logo-link">
                <img src="/images/arrowM.svg" alt="Volver">
            </router-link>
            <h1>🌱 Cultivos Registrados</h1>
        </header>

        <section id="form-container">
            <div id="contenedorCultivos" class="cultivos-grid">
                <!-- Si no hay cultivos -->
                <div v-if="cultivos.length === 0" class="no-cultivos">
                    <p>No hay cultivos registrados aún.</p>
                    <router-link to="/add-crop" class="btn-agregar">
                        Agregar primer cultivo
                    </router-link>
                </div>

                <!-- Lista de cultivos -->
                <div v-for="(cultivo, index) in cultivos" :key="index" class="tarjeta-cultivo">
                    <h3>{{ cultivo.nombre }}</h3>
                    <p><strong>Fecha:</strong> {{ cultivo.fecha }}</p>
                    <p><strong>Unidades:</strong> {{ cultivo.cantidad }}</p>
                    <p><strong>Observaciones:</strong> {{ cultivo.observaciones || 'Ninguna' }}</p>

                    <div class="botones-accion">
                        <!-- Botón de editar -->
                        <button @click="editarCultivo(index)" class="edit-btn"
                            :title="`Editar ${cultivo.nombre}`">
                            <span class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </span>
                        </button>

                        <!-- Botón de eliminar -->
                        <button @click="confirmarEliminacion(index)" class="delete-btn"
                            :title="`Eliminar ${cultivo.nombre}`">
                            <span class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="30"
                                    width="30">
                                    <path
                                        d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z"
                                        clip-rule="evenodd" fill-rule="evenodd">
                                    </path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { useVerCultivos } from './js/Manage-Crops.js'

export default {
    name: 'ViewCrop',
    setup() {
        return useVerCultivos()
    }
}
</script>

<style scoped>
@import "./css/styleView.css";
</style>