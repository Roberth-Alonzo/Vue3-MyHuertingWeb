import { ref } from "vue";

export function useSlider() {
  const currentTestimony = ref(0); // índice actual, empieza en 0
  const total = 3; // Cambia según testimonios que tengas

  function changeTestimony(step) {
    currentTestimony.value += step;
    if (currentTestimony.value < 0) {
      currentTestimony.value = total - 1;
    }
    if (currentTestimony.value >= total) {
      currentTestimony.value = 0;
    }
  }

  return { currentTestimony, changeTestimony };
}
