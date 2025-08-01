<template>
  <div class="container">
    <header class="main-header">
      <router-link to="/menuPrincipal" class="logo-link" title="Volver al menú principal">
        <img src="@/assets/images/arrow.svg" alt="Volver" />
      </router-link>
      <h1 class="title">📽️ Guías de Cultivo</h1>
    </header>
    <main class="main-content">
      <section id="contenedorVideos" class="videos-section">
        <div v-for="planta in plantas" :key="planta.nombre" class="video-card">
          <h2>{{ planta.nombre }}</h2>
          <iframe :src="planta.video" frameborder="0" allowfullscreen></iframe>
          <p class="description">{{ planta.descripcion }}</p>
        </div>
      </section>
    </main>
    <footer class="main-footer">
      <p>&copy; 2024 MyHuertingWeb. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script>
import { plantas } from './js/guias.js';

export default {
  name: 'Guias',
  data() {
    return {
      plantas
    }
  }
}
</script>

<style scoped>
body {
    margin: 0;
    padding: 0;
    font-family: "Josefin Sans", sans-serif;
    background-color: #1e1e1e;
    color: #f0f0f0;
    background-image: url('@/assets/images/fondo.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    font-size: large;
}

.container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.main-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    background-color: rgba(50, 50, 50, 0.8);
    backdrop-filter: blur(10px);
    color: white;
    padding: 0 10px;
    position: relative;
    font-size: 25px;
}

.logo-link {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);
    z-index: 1000;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
}

.logo-link img {
    height: 50px;
    width: auto;
}

.logo-link:hover {
    transform: translateY(-50%) scale(1.1);
}

.videos-section {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 40px;
    margin: 40px 20px;
}

.video-card {
    background-color: rgba(50, 50, 50, 0.655);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    width: 300px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s ease;
}

.video-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.video-card h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    text-align: center;
    color: #3ce744;
}

.description {
    color: #ffffff;
    font-size: 0.9rem;
    margin-top: 10px;
    font-style: italic;
    text-align: center;
}

.video-card iframe {
    width: 100%;
    height: 170px;
    border: 3px solid #4caf50;
    border-radius: 8px;
    box-sizing: border-box;
}

.main-footer {
    background: rgba(50, 50, 50, 0.8);
    color: #fff;
    text-align: center;
    padding: 20px 0;
    margin-top: auto;
    font-size: 1rem;
}
</style>
