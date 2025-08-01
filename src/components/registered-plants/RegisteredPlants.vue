<template>
  <div class="registered-plants-wrapper">
    <header class="header">
      <router-link to="/main-menu" class="logo-link">
        <img src="/images/arrowM.svg" alt="Volver">
      </router-link>
      <h1>🌱 Plantas Registradas </h1>
    </header>
    <section id="form-container">
      <div id="plant-list" class="plantas-grid">
        <div v-for="plant in plants" :key="plant.nombre" class="tarjeta-planta">
          <h3>{{ plant.nombre }}</h3>
          <p><strong>Tipo:</strong> {{ plant.tipo }}</p>
          <p><strong>Descripción:</strong> {{ plant.descripcion }}</p>
          <p><strong>Tips:</strong> {{ plant.consejos }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import componentScript from './js/RegisteredPlants.js';
export default componentScript;
</script>

<style scoped src="./css/style.css"></style>
