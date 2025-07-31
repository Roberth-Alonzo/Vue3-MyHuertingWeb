<template>
  <section class="video-guia">
    <h2>Video de Guía</h2>
    <video controls width="100%">
      <source :src="videoUrl" type="video/mp4" />
      Tu navegador no soporta la reproducción de video.
    </video>
    <small v-if="isValidMp4(videoUrl)">
      Archivo: {{ getVideoFileName(videoUrl) }}
    </small>
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
  methods: {
    isValidMp4,
    getVideoFileName,
  },
};
</script>

<style src="./css/videos.css"></style>
