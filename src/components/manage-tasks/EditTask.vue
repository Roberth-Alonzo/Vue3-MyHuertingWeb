<template>
    <div class="edit-task-wrapper">
        <header>
            <router-link to="/view-task" class="logo-link">
                <img src="/images/arrowM.svg" alt="Volver">
            </router-link>
            <h1>✏️ Editar Tarea</h1>
        </header>

        <section class="form-container">
            <form @submit="handleSubmit">
                <label for="titulo">Título de la tarea</label>
                <input type="text" id="titulo" name="titulo" :value="tarea.titulo"
                    @input="tarea.titulo = $event.target.value" placeholder="Escribe el título de la tarea">

                <label for="miembro">Asignar a</label>
                <select id="miembro" name="miembro" v-model="tarea.miembro">
                    <option value="">Selecciona un usuario</option>
                    <option v-for="usuario in usuarios" :key="usuario.nombre" :value="usuario.nombre">
                        {{ usuario.nombre }}
                    </option>
                </select>

                <label for="fecha">Fecha</label>
                <input type="date" id="fecha" name="fecha" v-model="tarea.fecha">

                <label for="hora">Hora</label>
                <input type="time" id="hora" name="hora" v-model="tarea.hora">

                <label for="descripcion">Descripción</label>
                <textarea id="descripcion" name="descripcion" :value="tarea.descripcion"
                    @input="tarea.descripcion = $event.target.value" placeholder="Describe la tarea detalladamente"
                    rows="4" style="height: auto; min-height: 100px;"></textarea>

                <button type="submit" class="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="30" width="30"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span class="text">Actualizar</span>
                </button>
            </form>
        </section>
    </div>
</template>

<script>
import { useEditarTarea } from './js/Task-Service.js'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
    name: 'EditTask',
    setup() {
        const route = useRoute()
        const editarTarea = useEditarTarea()

        onMounted(() => {
            const index = parseInt(route.params.index)
            if (!isNaN(index)) {
                editarTarea.cargarDatosEdicion(index)
            }
        })

        return {
            ...editarTarea
        }
    }
}
</script>

<style scoped>
@import "./css/styleEdit.css";
</style>