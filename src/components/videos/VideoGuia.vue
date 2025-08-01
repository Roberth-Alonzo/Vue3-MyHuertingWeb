<template>
  <div class="video-guia">
    <h2>Guía en Video</h2>
    <video :src="videoUrl" controls width="640" height="360"></video>
  </div>
</template>

<script>
export default {
  name: "VideoGuia",
  props: {
    videoUrl: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.video-guia {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
