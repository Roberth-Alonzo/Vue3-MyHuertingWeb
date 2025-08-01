<template>
  <div class="guias-cultivo-wrapper">
    <header class="header">
      <router-link to="/main-menu" class="logo-link">
        <img src="/images/arrowM.svg" alt="Volver">
      </router-link>
      <h1>📽️ Guías de Cultivo</h1>
    </header>

    <div class="search-section">
      <div class="search-container">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Buscar planta..."
          class="search-input"
        >
        <div class="filter-buttons">
          <button
            @click="filterByType('all')"
            :class="{ active: selectedType === 'all' }"
            class="filter-btn"
          >
            Todas
          </button>
          <button
            @click="filterByType('Hortaliza')"
            :class="{ active: selectedType === 'Hortaliza' }"
            class="filter-btn"
          >
            Hortalizas
          </button>
          <button
            @click="filterByType('Fruta')"
            :class="{ active: selectedType === 'Fruta' }"
            class="filter-btn"
          >
            Frutas
          </button>
          <button
            @click="filterByType('Hierba')"
            :class="{ active: selectedType === 'Hierba' }"
            class="filter-btn"
          >
            Hierbas
          </button>
        </div>
      </div>
    </div>

    <div id="contenedorVideos" class="videos-container">
      <div
        v-for="planta in filteredPlantas"
        :key="planta.nombre"
        class="video-card"
      >
        <div class="card-header">
          <h2>{{ planta.nombre }}</h2>
          <span class="plant-type">{{ planta.tipo }}</span>
        </div>

        <div class="video-wrapper">
          <iframe
            :src="planta.video"
            frameborder="0"
            allowfullscreen
            :title="`Video guía de ${planta.nombre}`"
          ></iframe>
        </div>

        <div class="card-content">
          <p class="descripcion">{{ planta.descripcion }}</p>
          <div class="card-actions">
            <router-link
              :to="{ name: 'PlantVideoGuide', params: { plantName: planta.nombre } }"
              class="more-videos-btn"
              v-if="hasLocalVideos(planta.nombre)"
            >
              Ver más videos
            </router-link>
            <button @click="toggleFavorite(planta.nombre)" class="favorite-btn">
              <span v-if="isFavorite(planta.nombre)">❤️</span>
              <span v-else>🤍</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredPlantas.length === 0" class="no-results">
      <div class="no-results-icon">🔍</div>
      <h3>No se encontraron resultados</h3>
      <p>Intenta con otro término de búsqueda o cambia el filtro.</p>
    </div>
  </div>
</template>

<script>
// import { getVideosForPlant } from '../videos/js/videoUtils';

export default {
  name: 'GuiasCultivo',
  data() {
    return {
      searchTerm: '',
      selectedType: 'all',
      favorites: JSON.parse(localStorage.getItem('plantFavorites') || '[]'),
      plantas: [
        {
          nombre: "Zanahoria",
          tipo: "Hortaliza",
          video: "https://www.youtube.com/embed/b370Jpruc_0?start=5",
          descripcion: "Guía paso a paso para cultivar zanahorias saludables."
        },
        {
          nombre: "Pepino",
          tipo: "Hortaliza",
          video: "https://www.youtube.com/embed/LTz8Ao6Q5Y0",
          descripcion: "Consejos para un cultivo óptimo de pepinos."
        },
        {
          nombre: "Pimiento",
          tipo: "Hortaliza",
          video: "https://www.youtube.com/embed/13YgrFjEVIo?start=11",
          descripcion: "Cultiva pimientos con éxito en tu huerto."
        },
        {
          nombre: "Fresa",
          tipo: "Fruta",
          video: "https://www.youtube.com/embed/_2XXk4Sn9GU",
          descripcion: "Aprende a cuidar tus plantas de fresa."
        },
        {
          nombre: "Romero",
          tipo: "Hierba",
          video: "https://www.youtube.com/embed/M6iFD2eNSzk?start=37",
          descripcion: "Romero: cultivo y cuidados básicos."
        },
        {
          nombre: "Lechuga",
          tipo: "Hortaliza",
          video: "https://www.youtube.com/embed/nmrRzRo_wFo",
          descripcion: "Cómo plantar y cosechar lechugas."
        },
        {
          nombre: "Albahaca",
          tipo: "Hierba",
          video: "https://www.youtube.com/embed/Ihq3MIZhs2s?start=18",
          descripcion: "Guía rápida para cultivar albahaca fresca."
        },
        {
          nombre: "Tomate",
          tipo: "Fruta",
          video: "https://www.youtube.com/embed/oWVPWGhofnU",
          descripcion: "Tips para tomates jugosos y saludables."
        },
        {
          nombre: "Cilantro",
          tipo: "Hierba",
          video: "https://www.youtube.com/embed/hFDvlUNCHV8",
          descripcion: "Cuidados esenciales para el cilantro."
        },
        {
          nombre: "Espinaca",
          tipo: "Hortaliza",
          video: "https://www.youtube.com/embed/TW8hw4BDVNI",
          descripcion: "Espinaca: cultivo y consejos prácticos."
        }
      ]
    };
  },
  computed: {
    filteredPlantas() {
      let filtered = this.plantas;

      // Filtrar por tipo
      if (this.selectedType !== 'all') {
        filtered = filtered.filter(planta => planta.tipo === this.selectedType);
      }

      // Filtrar por término de búsqueda
      if (this.searchTerm) {
        filtered = filtered.filter(planta =>
          planta.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          planta.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }

      return filtered;
    }
  },
  methods: {
    filterByType(type) {
      this.selectedType = type;
    },

    hasLocalVideos(plantName) {
      // Simplified version - could be connected to a video service later
      return false; // For now, no local videos available
    },

    toggleFavorite(plantName) {
      const index = this.favorites.indexOf(plantName);
      if (index > -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(plantName);
      }
      localStorage.setItem('plantFavorites', JSON.stringify(this.favorites));
    },

    isFavorite(plantName) {
      return this.favorites.includes(plantName);
    }
  }
};
</script>

<style scoped src="./css/GuiasCultivo.css"></style>
