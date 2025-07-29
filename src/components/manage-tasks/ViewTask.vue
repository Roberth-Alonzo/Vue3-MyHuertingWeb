<template>
    <div class="view-task-wrapper">
        <header>
            <router-link to="/main-menu" class="logo-link">
                <img src="/images/arrowM.svg" alt="Volver">
            </router-link>
            <h1>📋 Tareas Programadas</h1>
        </header>

        <section class="form-container">
            <table id="tabla-tareas">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Descripción</th>
                        <th>Archivo</th>
                        <th>Asignado a</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="tareas.length === 0">
                        <td colspan="8" style="text-align:center;">
                            No hay tareas programadas.
                        </td>
                    </tr>
                    <tr v-else v-for="(tarea, index) in tareas" :key="index">
                        <td>{{ tarea.titulo }}</td>
                        <td>{{ tarea.fecha }}</td>
                        <td>{{ tarea.hora }}</td>
                        <td>{{ tarea.descripcion }}</td>
                        <td>
                            <a v-if="tarea.archivo" :href="tarea.archivo" target="_blank">
                                Ver PDF
                            </a>
                            <span v-else>No adjunto</span>
                        </td>
                        <td>{{ tarea.miembro || 'Sin asignar' }}</td>
                        <td :class="{
                            'estado-realizada': tarea.estado === 'Realizada',
                            'estado-pendiente': tarea.estado !== 'Realizada'
                        }">
                            {{ tarea.estado }}
                        </td>
                        <td>
                            <button class="btn-eliminar" @click="onEliminarTarea(index)">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<script>
import { useListaTareas } from './js/Task-Service.js'

export default {
    name: 'ListaTareas',
    setup() {
        return useListaTareas()
    }
}
</script>

<style scoped>
@import url('./css/styleView.css');
</style>