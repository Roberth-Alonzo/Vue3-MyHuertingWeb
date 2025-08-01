<template>
  <div class="registered-plants-wrapper">
    <header class="header">
      <router-link to="/main-menu" class="logo-link">
         <img src="/images/arrowM.svg" alt="Volver">
      </router-link>
      <h1>🌱 Plantas Registradas </h1>
      <router-link to="/guias-cultivo" class="guias-link">
        📽️ Ver Guías de Cultivo
      </router-link>
    </header>
    <section id="form-container">
      <div id="plant-list" class="plantas-grid">
        <div v-for="plant in plants" :key="plant.nombre" class="tarjeta-planta">
          <h3>{{ plant.nombre }}</h3>
          <p><strong>Tipo:</strong> {{ plant.tipo }}</p>
          <p><strong>Descripción:</strong> {{ plant.descripcion }}</p>
          <p><strong>Tips:</strong> {{ plant.consejos }}</p>

          <!-- Video section -->
          <div class="plant-videos">
            <div v-if="hasVideos(plant.nombre)" class="videos-available">
              <div class="video-indicator">
                <span class="video-icon">🎥</span>
                <span class="video-count">{{ getVideoCount(plant.nombre) }} video(s) disponible(s)</span>
              </div>
              <router-link
                :to="{ name: 'PlantVideoGuide', params: { plantName: plant.nombre } }"
                class="watch-videos-btn"
              >
                Ver Videos de {{ plant.nombre }}
              </router-link>
            </div>
            <div v-else class="no-videos">
              <span class="no-video-icon">📹</span>
              <span class="no-video-text">Sin videos específicos</span>
              <router-link to="/videos" class="general-videos-link">
                Ver videos generales
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import componentScript from './js/RegisteredPlants.js';
export default componentScript;
</script>

<style scoped src="./css/RegisteredPlants.css"></style>
