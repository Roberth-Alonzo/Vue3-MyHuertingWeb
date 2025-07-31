<template>
  <div>
    <h1>Prueba del Componente VideoGuia</h1>
    <VideoGuia videoUrl="/videos/ejemplo.mp4" />
  </div>
</template>

<script>
import VideoGuia from './VideoGuia.vue';

export default {
  name: "VideoGuiaTest",
  components: {
    VideoGuia
  }
};
</script>
