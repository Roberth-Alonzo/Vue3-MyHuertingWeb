<template>
    <div class="add-crop-wrapper">
        <header>
            <router-link to="/main-menu" class="logo-link">
                <img src="/images/arrowM.svg" alt="Volver">
            </router-link>
            <h1>🌱 Registro de Cultivos</h1>
        </header>
        <main class="form-container">
            <form @submit.prevent="handleSubmit" novalidate ref="cultivoForm">
                
                <!-- Campo de selección de planta -->
                <label for="nombre">Selecciona la planta</label>
                <select 
                    id="nombre" 
                    v-model="formData.nombre" 
                    @change="onPlantaSeleccionada"
                    ref="nombreInput" 
                    required
                >
                    <option value="">-- Selecciona una planta --</option>
                    <option 
                        v-for="planta in plantas" 
                        :key="planta.nombre" 
                        :value="planta.nombre"
                    >
                        {{ planta.nombre }} ({{ planta.tipo }})
                    </option>
                </select>
                <div class="error" ref="errorNombre">{{ errors.nombre }}</div>
                
                <!-- Información de la planta seleccionada -->
                <div v-if="plantaSeleccionada" class="planta-info">
                    <div class="info-card">
                        <h3>📋 Información de {{ plantaSeleccionada.nombre }}</h3>
                        <div class="info-item">
                            <strong>Tipo:</strong> {{ plantaSeleccionada.tipo }}
                        </div>
                        <div class="info-item">
                            <strong>Descripción:</strong> {{ plantaSeleccionada.descripcion }}
                        </div>
                        <div class="info-item consejos">
                            <strong>💡 Consejos de cultivo:</strong><br>
                            {{ plantaSeleccionada.consejos }}
                        </div>
                    </div>
                </div>
                
                <label for="fecha">Fecha de siembra</label>
                <input type="date" id="fecha" v-model="formData.fecha" ref="fechaInput" required>
                <div class="error" ref="errorFecha">{{ errors.fecha }}</div>
                
                <label for="cantidad">Cantidad sembrada</label>
                <input type="number" id="cantidad" v-model="formData.cantidad" ref="cantidadInput" required>
                <div class="error" ref="errorCantidad">{{ errors.cantidad }}</div>
                
                <label for="observaciones">Observaciones</label>
                <textarea 
                    id="observaciones" 
                    rows="3" 
                    v-model="formData.observaciones"
                    ref="observacionesInput"
                    placeholder="Añade cualquier observación adicional sobre este cultivo..."
                ></textarea>
                <div class="error" ref="errorObservaciones">{{ errors.observaciones }}</div>
                
                <button type="submit" class="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                    <div class="text">Agregar</div>
                </button>
            </form>
        </main>
    </div>
</template>

<script>
import { useRegistrarCultivos } from './js/Manage-Crops.js'

export default {
    name: 'RegistrarCultivos',
    setup() {
        return useRegistrarCultivos()
    }
}
</script>

<style scoped>
@import "./css/styleAdd.css";
</style>