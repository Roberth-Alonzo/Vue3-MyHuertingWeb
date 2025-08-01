<template>
  <div class="video-list">
    <h2>Lista de Videos</h2>
    <ul>
      <li v-for="video in videos" :key="video.name">
        <router-link :to="{ name: 'VideoGuia', params: { videoUrl: video.url } }">
          {{ video.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "VideoList",
  data() {
    return {
      videos: [
        { name: "Plantación de Tomates", url: "/videos/plantacion-tomates.mp4" },
        { name: "Cuidado de Plantas", url: "/videos/cuidado-plantas.mp4" },
        { name: "Riego Eficiente", url: "/videos/riego-eficiente.mp4" },
        { name: "Ejemplo", url: "/videos/ejemplo.mp4" }
      ]
    };
  }
};
</script>

<style scoped>
.video-list {
  max-width: 600px;
  margin: 0 auto;
}
</style>
