import { reactive } from "vue";

export function useQuestions() {
  const questions = reactive([
    { title: "¿Qué es la ULEAM?", answer: "La Universidad Laica “Eloy Alfaro” de Manabí, creada mediante Ley No. 10 publicada en el Registro Oficial No. 313 de noviembre 13 de 1985, es una institución de Educación Superior, con personería jurídica de derecho público sin fines de lucro, de carácter laico, autónoma, democrática, pluralista, crítica y científica.La Universidad Laica “Eloy Alfaro” de Manabí tiene su sede en Manta, una de las cinco principales ciudades del Ecuador, ciudad ribereña al mar, centro pesquero de los mas importantes del Pacifico Sur y ciudad de gran potencialidad en cuanto a desarrollo turístico, es además una ciudad que se proyecta a futuro como posible puerto de transferencia internacional. La Universidad fundamentalmente sirve a la juventud de la tercera provincia del Ecuador que tiene una población que supera el millón doscientos mil habitantes.", isOpen: false },
    { title: "¿Qué es Aplicaciones Web?", answer: "Aplicaciones Web es una asignatura del área de tecnologías de la información que se enfoca en el diseño, desarrollo e implementación de aplicaciones interactivas accesibles desde navegadores web. En esta materia se estudian lenguajes como HTML, CSS y JavaScript El objetivo principal es formar competencias para crear soluciones funcionales que puedan ser usadas desde cualquier dispositivo con acceso a internet, resolviendo problemas reales mediante plataformas digitales.", isOpen: false },
    { title: "¿Por qué este proyecto?", answer: "El proyecto MyHuertingWeb tiene como propósito facilitar la gestión y organización de huertos urbanos comunitarios mediante una plataforma web accesible. Busca apoyar a las comunidades en el registro de cultivos, programación de tareas y visualización de información útil, fomentando el trabajo colaborativo, el cuidado del medio ambiente y la producción sostenible de alimentos a pequeña escala. A través de herramientas digitales simples, permite llevar un control efectivo del huerto, asignar responsabilidades entre los miembros y acceder a recursos formativos como videos de guía.", isOpen: false },
  ]);

  function toggleQuestion(index) {
    questions[index].isOpen = !questions[index].isOpen;
  }

  return { questions, toggleQuestion };
}
