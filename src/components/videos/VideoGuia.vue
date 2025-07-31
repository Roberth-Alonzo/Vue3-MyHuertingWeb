<template>
  <section class="video-guia">
    <h2>Video de Guía</h2>
    <!-- Aquí puedes insertar el reproductor de video o contenido relacionado -->
    <video controls width="100%">
      <source src="" type="video/mp4" />
      Tu navegador no soporta la reproducción de video.
    </video>
  </section>
</template>

<script>
export default {
  name: "VideoGuia",
};
</script>

<style scoped>
.video-guia {
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
</style>
