<template>
    <div class="dashboard-wrapper">
        <!-- Loading spinner -->
        <div v-if="loading" class="loading-container">
            <div class="loading-spinner"></div>
            <p>Cargando dashboard...</p>
        </div>

        <!-- Dashboard content -->
        <div v-else>
            <header class="header">
                <router-link to="/log-in" class="logout-link">
                    <img src="/images/exit.svg" alt="Logout" class="logout-icon">
                </router-link>
                <h1>Menú Principal</h1>
            </header>

            <main class="dashboard-content">
                <!-- Resumen rápido -->
                <section class="quick-stats">
                    <div class="stat-card">
                        <div class="stat-icon">🌱</div>
                        <div class="stat-info">
                            <h3>{{ cultivos.length }}</h3>
                            <p>Cultivos Activos</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">✅</div>
                        <div class="stat-info">
                            <h3>{{ tareasHoy.length }}</h3>
                            <p>Tareas Hoy</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">👥</div>
                        <div class="stat-info">
                            <h3>{{ usuarios.length }}</h3>
                            <p>Miembros</p>
                        </div>
                    </div>
                    <div v-if="clima" class="stat-card weather-card">
                        <div class="stat-icon">🌡️</div>
                        <div class="stat-info">
                            <h3>{{ clima.temperatura }}°C</h3>
                            <p>Manta, EC {{ clima.icono }}</p>
                        </div>
                    </div>
                </section>

                <!-- Cultivos activos -->
                <section class="cultivos-section">
                    <h2>🌿 Mis Cultivos</h2>
                    <div class="cultivos-grid">
                        <div v-for="(cultivo, index) in cultivos" :key="index" class="cultivo-card">
                            <div class="cultivo-header">
                                <h3>{{ cultivo.nombre }}</h3>
                                <span class="cantidad-badge">{{ cultivo.cantidad }}</span>
                            </div>
                            <div class="cultivo-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill"
                                        :style="{ width: calcularProgreso(cultivo.fecha) + '%' }"></div>
                                </div>
                                <span class="dias-texto">Día {{ calcularDias(cultivo.fecha) }}</span>
                            </div>
                            <p class="observaciones">{{ cultivo.observaciones }}</p>
                            <div class="cultivo-status">
                                <span :class="['status-badge', getEstadoCultivo(cultivo.fecha)]">
                                    {{ getTextoEstado(cultivo.fecha) }}
                                </span>
                            </div>
                        </div>

                        <router-link to="/add-crop" class="add-cultivo-card">
                            <div class="add-icon">➕</div>
                            <p>Agregar Nuevo Cultivo</p>
                        </router-link>
                    </div>
                </section>

                <!-- Tareas de hoy -->
                <section class="tareas-section">
                    <h2>📅 Tareas de Hoy</h2>
                    <div v-if="tareasHoy.length === 0" class="no-tareas">
                        <div class="success-icon">✅</div>
                        <p>¡Perfecto! No tienes tareas pendientes para hoy</p>
                    </div>
                    <div v-else class="tareas-hoy">
                        <div v-for="(tarea, index) in tareasHoy" :key="index" class="tarea-item">
                            <div class="tarea-time">
                                🕐 {{ tarea.hora }}
                            </div>
                            <div class="tarea-content">
                                <h4>{{ tarea.titulo }}</h4>
                                <p>{{ tarea.descripcion }}</p>
                                <span class="tarea-miembro">👤 {{ tarea.miembro }}</span>
                            </div>
                            <button class="tarea-complete" @click="completarTarea(index)">
                                ✓
                            </button>
                        </div>
                    </div>
                </section>

                <!-- Próximas tareas -->
                <section class="proximas-tareas-section">
                    <h2>⏰ Próximas Tareas</h2>
                    <div v-if="proximasTareas.length === 0" class="no-tareas">
                        <div class="info-icon">📅</div>
                        <p>No hay próximas tareas programadas</p>
                    </div>
                    <div v-else class="proximas-tareas">
                        <div v-for="(tarea, index) in proximasTareas" :key="index" class="proxima-tarea">
                            <div class="fecha-badge">
                                {{ formatearFecha(tarea.fecha) }}
                            </div>
                            <div class="tarea-info">
                                <h4>{{ tarea.titulo }}</h4>
                                <span class="tarea-hora">{{ tarea.hora }}</span>
                                <p class="tarea-descripcion">{{ tarea.descripcion }}</p>
                                <span class="tarea-miembro">👤 {{ tarea.miembro }}</span>
                            </div>
                            <button class="tarea-complete" @click="completarProximaTarea(index)"
                                title="Marcar como completada">
                                ✓
                            </button>
                        </div>
                    </div>
                </section>

                <!-- Accesos rápidos -->
                <section class="quick-actions">
    <h2>🚀 Accesos Rápidos</h2>
    <div class="actions-grid">
        <a href="http://192.168.0.116:3000/demos/butcher/index.html" class="action-card">
            <div class="action-icon">➕</div>
            <h3>Agregar Cultivo</h3>
            <p>Registrar nuevos cultivos</p>
        </a>
        <a href="http://192.168.0.116:3000/demos/butcher/index.html" class="action-card">
            <div class="action-icon">👁️</div>
            <h3>Ver Cultivos</h3>
            <p>Lista completa de cultivos</p>
        </a>
        <a href="http://192.168.0.116:3000/demos/butcher/index.html" class="action-card">
            <div class="action-icon">📅</div>
            <h3>Programar Tarea</h3>
            <p>Crear nuevas tareas</p>
        </a>
        <a href="http://192.168.0.116:3000/demos/butcher/index.html" class="action-card">
            <div class="action-icon">✅</div>
            <h3>Ver Tareas</h3>
            <p>Gestionar tareas existentes</p>
        </a>
        <a href="http://192.168.0.116:3000/demos/butcher/index.html" class="action-card">
            <div class="action-icon">🎥</div>
            <h3>Guías</h3>
            <p>Videos instructivos</p>
        </a>
        <a href="http://192.168.0.116:3000/demos/butcher/index.html" class="action-card">
            <div class="action-icon">🍃</div>
            <h3>Plantas</h3>
            <p>Catálogo de plantas</p>
        </a>
        <a href="http://192.168.0.116:3000/demos/butcher/index.html" class="action-card">
            <div class="action-icon">💾</div>
            <h3>Datos de Usuario</h3>
            <p>Agregar o editar información</p>
        </a>
    </div>
</section>

                <!-- Clima detallado -->
                <section v-if="clima" class="clima-section">
                    <h2>🌤️ Condiciones del Huerto</h2>
                    <div class="clima-card">
                        <div class="clima-main">
                            <div class="temperatura-grande">
                                {{ clima.icono }} {{ clima.temperatura }}°C
                            </div>
                            <p>{{ clima.descripcion }}</p>
                            <p class="ubicacion">📍 Manta, Ecuador</p>
                        </div>
                        <div class="clima-detalles">
                            <div class="clima-item">
                                💧 Humedad: {{ clima.humedad }}%
                            </div>
                            <div class="clima-item">
                                💨 Viento: {{ clima.viento }} km/h
                            </div>
                        </div>
                        <div class="clima-consejo">
                            🌎 {{ clima.consejo }}
                        </div>
                    </div>
                </section>
            </main>

            <footer class="footer">
                <p>© 2025 MyHuertingWeb. Todos los derechos reservados.</p>
            </footer>
        </div>
    </div>
</template>

<script>
import { useDashboard } from './js/Main-Service.js'
import { onActivated } from 'vue'

export default {
    name: 'Dashboard',
    setup() {
        const dashboardComposable = useDashboard()

        // 🔄 Recargar datos cuando se vuelve al dashboard desde otra vista
        onActivated(() => {
            console.log('🔄 Dashboard reactivado - recargando datos...')
            dashboardComposable.inicializar()
        })

        return dashboardComposable
    }
}
</script>

<style scoped>
@import "./css/style.css";
</style>
