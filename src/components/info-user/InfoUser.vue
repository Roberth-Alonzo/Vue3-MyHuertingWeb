<template>
    <div class="profile-wrapper">
        <header>
            <router-link to="/main-menu" class="logo-link">
                <img src="/images/arrowM.svg" alt="Volver">
            </router-link>
            <h1>👤 Mi Perfil</h1>
        </header>

        <div class="container">
            <div class="profile-content">
                <form @submit.prevent="handleSubmit" ref="profileForm">
                    <h2 class="title">{{ isEditing ? 'EDITAR PERFIL' : 'COMPLETAR PERFIL' }}</h2>

                    <!-- ========== INFORMACIÓN PERSONAL ========== -->
                    <div class="section-title">👤 Información Personal</div>

                    <div class="input-div">
                        <label for="nombre">Nombre</label>
                        <input ref="nombreInput" id="nombre" type="text" name="nombre" placeholder="Tu nombre"
                            v-model="formData.nombre" />
                        <span ref="nombreError" class="error"></span>
                    </div>

                    <div class="input-div">
                        <label for="apellido">Apellido</label>
                        <input ref="apellidoInput" id="apellido" type="text" name="apellido" placeholder="Tu apellido"
                            v-model="formData.apellido" />
                        <span ref="apellidoError" class="error"></span>
                    </div>

                    <div class="input-div">
                        <label for="telefono">Teléfono</label>
                        <input ref="telefonoInput" id="telefono" type="tel" name="telefono" placeholder="0987654321"
                            v-model="formData.telefono" />
                        <span ref="telefonoError" class="error"></span>
                    </div>

                    <div class="input-div">
                        <label for="edad">Edad</label>
                        <input ref="edadInput" id="edad" type="number" name="edad" min="1" max="120" placeholder="25"
                            v-model="formData.edad" />
                        <span ref="edadError" class="error"></span>
                    </div>

                    <div class="input-div">
                        <label for="genero">Género</label>
                        <select ref="generoSelect" id="genero" name="genero" v-model="formData.genero">
                            <option value="">-- Selecciona --</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                        </select>
                        <span ref="generoError" class="error"></span>
                    </div>

                    <!-- ========== INFORMACIÓN DE UBICACIÓN ========== -->
                    <div class="section-title">📍 Ubicación</div>

                    <div class="input-div">
                        <label for="direccion">Dirección</label>
                        <input ref="direccionInput" id="direccion" type="text" name="direccion"
                            placeholder="Calle, número, sector" v-model="formData.direccion" />
                        <span ref="direccionError" class="error"></span>
                    </div>

                    <!-- ========== INFORMACIÓN DE JARDINERÍA ========== -->
                    <div class="section-title">🌱 Experiencia en Jardinería</div>

                    <div class="input-div">
                        <label for="experiencia">Nivel de experiencia</label>
                        <select ref="experienciaSelect" id="experiencia" name="experiencia"
                            v-model="formData.experiencia">
                            <option value="">-- Selecciona tu nivel --</option>
                            <option value="principiante">🌱 Principiante (Sin experiencia)</option>
                            <option value="intermedio">🌿 Intermedio (Algo de experiencia)</option>
                            <option value="avanzado">🌳 Avanzado (Mucha experiencia)</option>
                        </select>
                        <span ref="experienciaError" class="error"></span>
                    </div>

                    <div class="input-div">
                        <label for="tipoVivienda">Tipo de vivienda</label>
                        <select ref="tipoViviendaSelect" id="tipoVivienda" name="tipoVivienda"
                            v-model="formData.tipoVivienda">
                            <option value="">-- Selecciona --</option>
                            <option value="casa">🏠 Casa</option>
                            <option value="apartamento">🏢 Apartamento</option>
                            <option value="otro">🏘️ Otro</option>
                        </select>
                        <span ref="tipoViviendaError" class="error"></span>
                    </div>

                    <div class="input-div">
                        <label for="espacioParaPlantas">¿Tienes espacio para plantas en casa?</label>
                        <select ref="espacioPlantasSelect" id="espacioParaPlantas" name="espacioParaPlantas"
                            v-model="formData.espacioPlantas">
                            <option value="">-- Selecciona --</option>
                            <option value="si">✅ Sí, tengo buen espacio</option>
                            <option value="limitado">⚠️ Limitado (balcón/ventana)</option>
                            <option value="no">❌ No tengo espacio</option>
                        </select>
                        <span ref="espacioPlantasError" class="error"></span>
                    </div>

                    <div class="input-div">
                        <label for="intereses">¿Qué te interesa cultivar más?</label>
                        <select ref="interesesSelect" id="intereses" name="intereses" v-model="formData.intereses">
                            <option value="">-- Selecciona --</option>
                            <option value="vegetales">🥕 Vegetales y hortalizas</option>
                            <option value="hierbas">🌿 Hierbas aromáticas</option>
                            <option value="flores">🌸 Flores ornamentales</option>
                            <option value="frutas">🍓 Frutas pequeñas</option>
                            <option value="todo">🌈 Un poco de todo</option>
                        </select>
                        <span ref="interesesError" class="error"></span>
                    </div>

                    <!-- Mostrar información actual si existe -->
                    <div v-if="hasProfileData && !isEditing" class="current-info">
                        <h3>📋 Tu información actual:</h3>
                        <div class="info-grid">
                            <div class="info-item"><strong>Nombre:</strong> {{ currentProfile.nombre }} {{
                                currentProfile.apellido }}</div>
                            <div class="info-item"><strong>Teléfono:</strong> {{ currentProfile.telefono }}</div>
                            <div class="info-item"><strong>Edad:</strong> {{ currentProfile.edad }} años</div>
                            <div class="info-item"><strong>Género:</strong> {{ getGeneroText(currentProfile.genero) }}
                            </div>
                            <div class="info-item"><strong>Dirección:</strong> {{ currentProfile.direccion }}</div>
                            <div class="info-item"><strong>Experiencia:</strong> {{
                                getExperienciaText(currentProfile.experiencia) }}</div>
                            <div class="info-item"><strong>Vivienda:</strong> {{
                                getTipoViviendaText(currentProfile.tipoVivienda) }}</div>
                            <div class="info-item"><strong>Espacio para plantas:</strong> {{
                                getEspacioPlantasText(currentProfile.espacioPlantas) }}</div>
                            <div class="info-item"><strong>Intereses:</strong> {{
                                getInteresesText(currentProfile.intereses) }}</div>
                        </div>
                    </div>

                    <div class="button-group">
                        <button v-if="!hasProfileData || isEditing" type="submit" class="button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                            </svg>
                            <div class="text">{{ isEditing ? 'ACTUALIZAR INFORMACIÓN' : 'GUARDAR INFORMACIÓN' }}</div>
                        </button>

                        <button v-if="hasProfileData && !isEditing" type="button" class="button btn-secondary"
                            @click="enableEditing">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            <div class="text">EDITAR INFORMACIÓN</div>
                        </button>

                        <button v-if="isEditing" type="button" class="button btn-cancel" @click="cancelEditing">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            <div class="text">CANCELAR</div>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserProfile } from './js/User-Profile.js'

export default {
    name: 'UserProfile',
    setup() {
        return useUserProfile()
    }
}
</script>

<style scoped>
@import "./css/style.css";
</style>