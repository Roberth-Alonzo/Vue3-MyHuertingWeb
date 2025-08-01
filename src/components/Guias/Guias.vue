<template>
  <div class="guias-container">
    <header class="guias-header">
      <router-link to="/main-menu" class="logo-link">
        <img src="/images/arrow.svg" alt="Volver">
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
export default {
  name: 'GuiasComponent',
  data() {
    return {
      videoSeleccionado: null,
      plantas: [
        {
          nombre: "Zanahoria",
          video: "https://www.youtube.com/embed/b370Jpruc_0?start=5",
          descripcion: "Guía paso a paso para cultivar zanahorias saludables."
        },
        {
          nombre: "Pepino",
          video: "https://www.youtube.com/embed/LTz8Ao6Q5Y0",
          descripcion: "Consejos para un cultivo óptimo de pepinos."
        },
        {
          nombre: "Pimiento",
          video: "https://www.youtube.com/embed/13YgrFjEVIo?start=11",
          descripcion: "Cultiva pimientos con éxito en tu huerto."
        },
        {
          nombre: "Fresa",
          video: "https://www.youtube.com/embed/_2XXk4Sn9GU",
          descripcion: "Aprende a cuidar tus plantas de fresa."
        },
        {
          nombre: "Romero",
          video: "https://www.youtube.com/embed/M6iFD2eNSzk?start=37",
          descripcion: "Romero: cultivo y cuidados básicos."
        },
        {
          nombre: "Lechuga",
          video: "https://www.youtube.com/embed/nmrRzRo_wFo",
          descripcion: "Cómo plantar y cosechar lechugas."
        },
        {
          nombre: "Albahaca",
          video: "https://www.youtube.com/embed/Ihq3MIZhs2s?start=18",
          descripcion: "Guía rápida para cultivar albahaca fresca."
        },
        {
          nombre: "Tomate",
          video: "https://www.youtube.com/embed/oWVPWGhofnU",
          descripcion: "Tips para tomates jugosos y saludables."
        },
        {
          nombre: "Cilantro",
          video: "https://www.youtube.com/embed/hFDvlUNCHV8",
          descripcion: "Cuidados esenciales para el cilantro."
        },
        {
          nombre: "Espinaca",
          video: "https://www.youtube.com/embed/TW8hw4BDVNI",
          descripcion: "Espinaca: cultivo y consejos prácticos."
        }
      ]
    }
  },
  methods: {
    abrirVideo(planta) {
      this.videoSeleccionado = planta;
      document.body.style.overflow = 'hidden';
    },
    cerrarModal() {
      this.videoSeleccionado = null;
      document.body.style.overflow = 'auto';
    }
  }
}
</script>

<style scoped>
.guias-container {
  margin: 0;
  padding: 0;
  font-family: "Josefin Sans", sans-serif;
  background-color: #1e1e1e;
  color: #f0f0f0;
  background-image: url('/images/fondo.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  font-size: large;
  min-height: 100vh;
}

.guias-header {
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
  text-decoration: none;
}

.logo-link img {
  height: 50px;
  width: auto;
}

.logo-link:hover {
  transform: translateY(-50%) scale(1.1);
}

.contenedor-videos {
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

.video-card .description {
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

.video-thumbnail {
  position: relative;
  width: 100%;
}

.video-actions {
  margin-top: 10px;
  width: 100%;
}

.btn-ver {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  width: 100%;
}

.btn-ver:hover {
  background-color: #45a049;
}

/* Modal styles */
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.modal-content {
  background-color: #2a2a2a;
  border-radius: 10px;
  padding: 20px;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 10001;
}

.modal-content h3 {
  color: #3ce744;
  margin-bottom: 15px;
  text-align: center;
}

.modal-content iframe {
  width: 100%;
  height: 400px;
  border: 3px solid #4caf50;
  border-radius: 8px;
  margin-bottom: 15px;
}

.modal-content p {
  color: #ffffff;
  text-align: center;
  font-style: italic;
}

/* Responsive design */
@media (max-width: 768px) {
  .logo-link {
    left: 15px;
  }
  
  .logo-link img {
    height: 40px;
  }
  
  .guias-header {
    font-size: 20px;
    height: 80px;
  }
  
  .contenedor-videos {
    padding: 20px;
    margin: 20px 10px;
  }
  
  .video-card {
    width: 280px;
  }
}
</style>
