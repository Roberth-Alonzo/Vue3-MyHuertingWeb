<template>
  <section class="video-guia">
    <h2>Video de Guía</h2>

    <!-- Loading state -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Cargando video...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-container">
      <div class="error-icon">⚠️</div>
      <h3>Error al cargar el video</h3>
      <p>{{ errorMessage }}</p>
      <button @click="retryLoad" class="retry-btn">Reintentar</button>
    </div>

    <!-- Video player -->
    <div v-else class="video-container">
      <video
        ref="videoPlayer"
        controls
        width="100%"
        @loadstart="onLoadStart"
        @loadeddata="onLoadedData"
        @error="onError"
        @canplay="onCanPlay"
      >
        <source :src="videoUrl" type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
      </video>

      <small v-if="isValidMp4(videoUrl)" class="video-info">
        Archivo: {{ getVideoFileName(videoUrl) }}
      </small>

      <div v-if="!isValidMp4(videoUrl)" class="warning">
        ⚠️ El archivo no parece ser un video MP4 válido
      </div>
    </div>
  </section>
</template>

<script>
import { isValidMp4, getVideoFileName } from './js/videoUtils';

export default {
  name: "VideoGuia",
  props: {
    videoUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: true,
      error: false,
      errorMessage: ''
    };
  },
  methods: {
    isValidMp4,
    getVideoFileName,

    onLoadStart() {
      this.loading = true;
      this.error = false;
    },

    onLoadedData() {
      this.loading = false;
      this.error = false;
    },

    onCanPlay() {
      this.loading = false;
    },

    onError(event) {
      this.loading = false;
      this.error = true;

      const video = event.target;
      switch(video.error?.code) {
        case 1:
          this.errorMessage = 'La descarga del video fue abortada.';
          break;
        case 2:
          this.errorMessage = 'Error de red al cargar el video.';
          break;
        case 3:
          this.errorMessage = 'Error al decodificar el video.';
          break;
        case 4:
          this.errorMessage = 'El formato de video no es compatible.';
          break;
        default:
          this.errorMessage = 'Error desconocido al cargar el video.';
      }
    },

    retryLoad() {
      this.loading = true;
      this.error = false;
      this.errorMessage = '';

      // Forzar recarga del video
      if (this.$refs.videoPlayer) {
        this.$refs.videoPlayer.load();
      }
    }
  },

  mounted() {
    // Verificar si la URL es válida al montar el componente
    if (!this.videoUrl || !this.isValidMp4(this.videoUrl)) {
      this.loading = false;
      this.error = true;
      this.errorMessage = 'URL de video no válida o no es un archivo MP4.';
    }
  }
};
</script>

<style src="./css/videos.css"></style>
