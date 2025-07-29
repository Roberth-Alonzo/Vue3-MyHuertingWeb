<template>
    <div class="add-task-wrapper">
        <header>
            <router-link to="/main-menu" class="logo-link">
                <img src="/images/arrowM.svg" alt="Volver">
            </router-link>
            <h1>📅 Programar Tarea</h1>
        </header>

        <section class="form-container" id="programar-tareas">
            <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
                <label for="titulo">Título de la tarea</label>
                <input type="text" id="titulo" name="titulo">

                <label for="miembro">Asignar miembro</label>
                <select id="miembro" name="miembro">
                    <option value="">-- Selecciona un miembro --</option>
                    <option v-for="usuario in usuarios" :key="usuario.nombre" :value="usuario.nombre">
                        {{ usuario.nombre }}
                    </option>
                </select>

                <label for="fecha">Fecha</label>
                <input type="date" id="fecha" name="fecha">

                <label for="hora">Hora</label>
                <input type="time" id="hora" name="hora">

                <label for="descripcion">Descripción</label>
                <textarea id="descripcion" name="descripcion" rows="3"></textarea>

                <label for="archivo">Documento adjunto (PDF opcional)</label>
                <input type="file" id="archivo" name="archivo" accept=".pdf" @change="handleFileChange">

                <button type="submit" class="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                    <div class="text">Programar</div>
                </button>
            </form>
        </section>
    </div>
</template>

<script>
import { useProgramarTarea } from './js/Task-Service.js'

export default {
    name: 'ProgramarTarea',
    setup() {
        return useProgramarTarea()
    }
}
</script>

<style scoped>
@import url('./css/styleAdd.css');
</style>