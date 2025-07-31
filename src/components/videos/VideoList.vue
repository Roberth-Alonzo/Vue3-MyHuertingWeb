<template>
  <section class="video-list">
    <h2>Videos de Guía para Huertos</h2>
    <p class="description">
      Aprende técnicas esenciales para el cuidado de tu huerto urbano con nuestros videos educativos.
    </p>

    <div class="video-grid">
      <div
        v-for="video in videos"
        :key="video.id"
        class="video-card"
        @click="selectVideo(video)"
        :class="{ active: selectedVideo?.id === video.id }"
      >
        <div class="video-thumbnail">
          <div class="play-icon">▶</div>
          <img :src="video.thumbnail" :alt="video.title" />
        </div>
        <div class="video-info">
          <h3>{{ video.title }}</h3>
          <p>{{ video.description }}</p>
          <span class="duration">{{ video.duration }}</span>
        </div>
      </div>
    </div>

    <!-- Video player section -->
    <div v-if="selectedVideo" class="video-player-section">
      <VideoGuia :videoUrl="selectedVideo.url" :key="selectedVideo.id" />
    </div>

    <!-- Default message when no video is selected -->
    <div v-else class="no-video-selected">
      <div class="icon">🎥</div>
      <h3>Selecciona un video para comenzar</h3>
      <p>Haz clic en cualquier video de la lista para reproducirlo.</p>
    </div>
  </section>
</template>

<script>
import VideoGuia from './VideoGuia.vue';

export default {
  name: 'VideoList',
  components: {
    VideoGuia
  },
  data() {
    return {
      selectedVideo: null,
      videos: [
        {
          id: 1,
          title: 'Introducción a los Huertos Urbanos',
          description: 'Aprende los conceptos básicos para comenzar tu huerto en casa.',
          url: '/videos/ejemplo.mp4',
          duration: '5:30',
          thumbnail: '/images/huerto.jpg'
        },
        {
          id: 2,
          title: 'Plantación de Tomates',
          description: 'Guía completa para plantar y cuidar tomates en tu huerto.',
          url: '/videos/plantacion-tomates.mp4',
          duration: '8:15',
          thumbnail: '/images/foto1.jpg'
        },
        {
          id: 3,
          title: 'Cuidado General de Plantas',
          description: 'Técnicas esenciales para mantener tus plantas saludables.',
          url: '/videos/cuidado-plantas.mp4',
          duration: '6:45',
          thumbnail: '/images/foto2.jpg'
        },
        {
          id: 4,
          title: 'Riego Eficiente',
          description: 'Aprende las mejores técnicas de riego para tu huerto.',
          url: '/videos/riego-eficiente.mp4',
          duration: '4:20',
          thumbnail: '/images/foto3.jpg'
        }
      ]
    };
  },
  methods: {
    selectVideo(video) {
      this.selectedVideo = video;
    }
  }
};
</script>

<style src="./css/video-list.css"></style>
