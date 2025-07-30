<template>
  <div>
    <header class="header">
      <router-link to="/main-menu" class="logo-link">
        <img src="/images/arrow.svg" alt="Back" />
      </router-link>
      <h1>🌱 Planas Registradas </h1>
    </header>
    <section id="form-container">
      <div id="plant-list" class="plantas-grid">
        <div v-for="plant in plants" :key="plant.nombre" class="tarjeta-planta">
          <h3>{{ plant.nombre }}</h3>
          <p><strong>Tipo:</strong> {{ plant.tipo }}</p>
          <p><strong>Descripción:</strong> {{ plant.descripcion }}</p>
          <p><strong>Tips:</strong> {{ plant.consejos }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "RegisteredPlants",
  data() {
    return {
      plants: [
        {
          nombre: "Zanahoria",
          tipo: "Hortaliza",
          descripcion: "Raíz comestible rica en vitaminas.",
          consejos: "Siembra en suelos sueltos y bien drenados. Necesita riego constante sin encharcar."
        },
        {
          nombre: "Pepino",
          tipo: "Hortaliza",
          descripcion: "Fruto fresco ideal para ensaladas.",
          consejos: "Requiere mucho sol y riego frecuente. Utiliza tutores para que crezca vertical."
        },
        {
          nombre: "Pimiento",
          tipo: "Hortaliza",
          descripcion: "Fruto usado en diversas recetas.",
          consejos: "Prefiere temperaturas cálidas. No tolera el exceso de agua."
        },
        {
          nombre: "Fresa",
          tipo: "Fruta",
          descripcion: "Fruta dulce ideal para postres.",
          consejos: "Plántala en macetas o jardineras. Necesita sol directo y riego moderado."
        },
        {
          nombre: "Romero",
          tipo: "Hierba",
          descripcion: "Aromática usada en cocina y medicina.",
          consejos: "Crece bien en suelos secos. No necesita mucho riego y ama el sol."
        },
        {
          nombre: "Lechuga",
          tipo: "Hortaliza",
          descripcion: "Hortaliza de hojas verdes muy usada en ensaladas.",
          consejos: "Necesita semisombra y riegos frecuentes. Protege del calor extremo."
        },
        {
          nombre: "Albahaca",
          tipo: "Hierba",
          descripcion: "Planta aromática ideal para cocinar.",
          consejos: "Requiere sol directo y riego diario en climas cálidos. Pellizca las flores para que no suba a semilla."
        },
        {
          nombre: "Tomate",
          tipo: "Fruta",
          descripcion: "Fruto muy usado en cocina.",
          consejos: "Necesita sol directo, riego constante sin mojar las hojas y tutores para sostener la planta."
        },
        {
          nombre: "Cilantro",
          tipo: "Hierba",
          descripcion: "Aromática de uso común en la cocina.",
          consejos: "Siembra en primavera, en semisombra. Riega con frecuencia para mantener la humedad."
        },
        {
          nombre: "Espinaca",
          tipo: "Hortaliza",
          descripcion: "Hortaliza de hoja verde rica en hierro.",
          consejos: "Prefiere climas frescos. Riega de forma regular y cosecha hojas externas primero."
        }
      ]
    };
  }
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: "Josefin Sans", sans-serif;
  background-color: #1e1e1e;
  color: #f0f0f0;
  background-image: url('/images/fondo.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  font-size: large;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: rgba(50, 50, 50, 0.8);
  backdrop-filter: blur(10px);
  color: white;
  padding: 0 10px;
  position: relative;
  font-size: 25px;
  text-align: center;
}

.logo-link {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
  z-index: 1000;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.logo-link img {
  height: 50px;
  width: auto;
}

.logo-link:hover {
  transform: translateY(-50%) scale(1.1);
}

#form-container {
  padding: 40px 60px;
  max-width: 1300px;
  margin: auto;
}

.plantas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.tarjeta-planta {
  background-color: rgba(50, 50, 50, 0.51);
  border: 1px solid #4caf50;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, background-color 0.3s ease;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.tarjeta-planta:hover {
  background-color: rgba(50, 50, 50, 0.8);
  transform: translateY(-5px);
}

.tarjeta-planta h3 {
  color: #3ce744;
  font-size: 20px;
  margin-bottom: 10px;
}

.tarjeta-planta p {
  margin: 8px 0;
  font-size: 15px;
  color: #dddddd;
}

.tarjeta-planta p strong {
  color: #a5d6a7;
}
</style>
