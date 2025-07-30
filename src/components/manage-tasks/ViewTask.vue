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
                        <th>Asignado a</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="tareas.length === 0">
                        <td colspan="7" class="no-tasks-message">
                            No hay tareas programadas.
                            <a href="#" @click.prevent="irAgregarTarea" class="add-first-task-link">
                                Agregar primera tarea
                            </a>
                        </td>
                    </tr>
                    <tr v-for="(tarea, index) in tareas" :key="index">
                        <td>{{ tarea.titulo }}</td>
                        <td>{{ formatearFecha(tarea.fecha) }}</td>
                        <td>{{ tarea.hora }}</td>
                        <td>{{ tarea.descripcion }}</td>
                        <td>{{ tarea.miembro }}</td>
                        <td>
                            <span :class="tarea.estado === 'Realizada' ? 'estado-realizada' : 'estado-pendiente'">
                                {{ tarea.estado }}
                            </span>
                        </td>
                        <td>
                            <button @click="onEliminarTarea(index)" class="btn-eliminar">
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
    name: 'ViewTask',
    setup() {
        const { tareas, onEliminarTarea, irAgregarTarea } = useListaTareas()
        
        const formatearFecha = (fecha) => {
            if (!fecha) return ''
            const date = new Date(fecha)
            return date.toLocaleDateString('es-ES')
        }

        return {
            tareas,
            onEliminarTarea,
            irAgregarTarea,
            formatearFecha
        }
    }
}
</script>

<style scoped>
@import url('./css/styleView.css');
</style>