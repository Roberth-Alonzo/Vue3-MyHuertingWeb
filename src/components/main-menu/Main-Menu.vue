<template>
    <div class="main-menu-wrapper">
        <header>
            <router-link to="/log-in" class="icon-link">
                <img src="/images/exit.svg" alt="Logout" class="logout-icon">
            </router-link>
            <h1>MyHuertingWeb</h1>
        </header>

        <main class="main-content">
            <h2>Gestión de Huertos Urbanos</h2>
            <div class="card-container">
                <div class="card">
                    <h3>Registro de cultivos</h3>
                    <p>Agrega información sobre cultivos en los huertos.</p>
                    <router-link to="/add-crop" class="btn">Acceder</router-link>
                </div>

                <div class="card">
                    <h3>Cultivos registrados</h3>
                    <p>Lista de los cultivos registrados.</p>
                    <router-link to="/view-crop" class="btn">Acceder</router-link>
                </div>

                <div class="card">
                    <h3>Videos de guía</h3>
                    <p>Videos sobre cómo plantar y cuidar tus cultivos.</p>
                    <router-link to="/guias" class="btn">Acceder</router-link>
                </div>

                <div class="card">
                    <h3>Plantas registradas</h3>
                    <p>Permite visualizar una lista de las plantas disponibles.</p>
                    <router-link to="/plantas" class="btn">Acceder</router-link>
                </div>

                <div class="card">
                    <h3>Programar Tareas</h3>
                    <p>Permite programar tareas del huerto.</p>
                    <router-link to="/add-task" class="btn">Acceder</router-link>
                </div>

                <div class="card">
                    <h3>Tareas Registradas</h3>
                    <p>Permite visualizar las tareas del huerto registradas.</p>
                    <router-link to="/view-task" class="btn">Acceder</router-link>
                </div>
            </div>
        </main>

        <footer>
            <p>© 2025 MyHuertingWeb. Todos los derechos reservados.</p>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'MainMenu'
}
</script>

<style scoped>
@import "./css/style.css";
</style>