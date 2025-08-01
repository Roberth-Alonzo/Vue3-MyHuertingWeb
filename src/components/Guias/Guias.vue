<template>
  <div class="guias-container">
    <header class="guias-header">
      <router-link to="/main-menu" class="logo-link">
        <img src="/images/arrowM.svg" alt="Volver">
      </router-link>
      <h1>📽️ Guías de Cultivo</h1>
    </header>

    <div class="contenedor-videos">
      <div
        v-for="planta in plantas"
        :key="planta.nombre"
        class="video-card"
        @click="abrirVideo(planta)"
      >
        <h2>{{ planta.nombre }}</h2>
        <div class="video-thumbnail">
          <iframe
            :src="planta.video"
            frameborder="0"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
        <p class="description">{{ planta.descripcion }}</p>
        <div class="video-actions">
          <button class="btn-ver" @click.stop="abrirVideo(planta)">
            👁️ Ver Video
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para video en pantalla completa -->
    <div v-if="videoSeleccionado" class="video-modal" @click="cerrarModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="cerrarModal">×</button>
        <h3>{{ videoSeleccionado.nombre }}</h3>
        <iframe
          :src="videoSeleccionado.video"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <p>{{ videoSeleccionado.descripcion }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import GuiasLogic from './js/guias.js';
export default GuiasLogic;
</script>

<style scoped>
@import "./css/style.css";
</style>
