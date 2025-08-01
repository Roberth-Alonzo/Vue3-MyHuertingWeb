<template>
  <div class="plant-video-guide">
    <h2>Guía en Video para {{ plantName }}</h2>
    <video :src="videoUrl" controls width="640" height="360"></video>
  </div>
</template>

<script>
export default {
  name: "PlantVideoGuide",
  props: {
    plantName: {
      type: String,
      required: true
    }
  },
  computed: {
    videoUrl() {
      // Ejemplo simple: asume que el nombre de la planta coincide con el nombre del archivo
      return `/videos/${this.plantName}.mp4`;
    }
  }
};
</script>

<style scoped>
.plant-video-guide {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
