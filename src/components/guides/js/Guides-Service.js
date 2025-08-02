export default {
    name: 'GuiasComponent',
    data() {
        return {
            videoSeleccionado: null,
            plantas: [
                {
                    nombre: "¿Qué Sembrar en Agosto?",
                    video: "https://www.youtube.com/embed/watch?v=LJzkXWQADA4",
                    descripcion: "Consejos sobre que plantas cultivar."
                },
                {
                    nombre: "Zanahoria",
                    video: "https://www.youtube.com/embed/b370Jpruc_0?start=5",
                    descripcion: "Guía paso a paso para cultivar zanahorias."
                },
                {
                    nombre: "Pepino",
                    video: "https://www.youtube.com/embed/LTz8Ao6Q5Y0",
                    descripcion: "Consejos para un cultivar pepinos."
                },
                {
                    nombre: "Pimiento",
                    video: "https://www.youtube.com/embed/13YgrFjEVIo?start=11",
                    descripcion: "Cultiva pimientos con éxito en tu huerto."
                },
                {
                    nombre: "Fresa",
                    video: "https://www.youtube.com/embed/_2XXk4Sn9GU",
                    descripcion: "Aprende a cuidar tus plantas de fresa."
                },
                {
                    nombre: "Romero",
                    video: "https://www.youtube.com/embed/M6iFD2eNSzk?start=37",
                    descripcion: "Romero: cultivo y cuidados básicos."
                },
                {
                    nombre: "Lechuga",
                    video: "https://www.youtube.com/embed/nmrRzRo_wFo",
                    descripcion: "Cómo plantar y cosechar lechugas."
                },
                {
                    nombre: "Albahaca",
                    video: "https://www.youtube.com/embed/Ihq3MIZhs2s?start=18",
                    descripcion: "Guía rápida para cultivar albahaca fresca."
                },
                {
                    nombre: "Tomate",
                    video: "https://www.youtube.com/embed/oWVPWGhofnU",
                    descripcion: "Tips para tomates jugosos y saludables."
                },
                {
                    nombre: "Cilantro",
                    video: "https://www.youtube.com/embed/hFDvlUNCHV8",
                    descripcion: "Cuidados esenciales para el cilantro."
                },
                {
                    nombre: "Espinaca",
                    video: "https://www.youtube.com/embed/TW8hw4BDVNI",
                    descripcion: "Espinaca: cultivo y consejos prácticos."
                },
                {
                    nombre: "Berenjena",
                    video: "https://www.youtube.com/embed/m5uSMafN5RQ?start=14",
                    descripcion: "Aprende cómo sembrar berenjenas."
                },
                {
                    nombre: "Yuca",
                    video: "https://www.youtube.com/embed/1FWS0HJLpBc",
                    descripcion: "Guía práctica para cultivar yuca."
                },
                {
                    nombre: "Camote",
                    video: "https://www.youtube.com/embed/uq1zxHzlang",
                    descripcion: "Cómo cultivar camote fácilmente."
                },
                {
                    nombre: "Maíz",
                    video: "https://www.youtube.com/embed/aEcg02JNyTM",
                    descripcion: "Cultivo de maíz paso a paso."
                },
                {
                    nombre: "Sandía",
                    video: "https://www.youtube.com/embed/kURJxTdGbqc",
                    descripcion: "Aprende cómo sembrar sandía."
                },
                {
                    nombre: "Melón",
                    video: "https://www.youtube.com/embed/N_F7WzND13w",
                    descripcion: "Siembra, cuidados y cosecha de Melón."
                },
                {
                    nombre: "Ajo",
                    video: "https://www.youtube.com/embed/UDYz8PhOZGc",
                    descripcion: "Aprende a sembrar y cosechar ajos."
                },
                {
                    nombre: "Cebolla",
                    video: "https://www.youtube.com/embed/EHRsRLzEHG0",
                    descripcion: "Guía para plantar cebolla."
                },
                {
                    nombre: "Guayaba",
                    video: "https://www.youtube.com/embed/h6EZJbHxP1s?start=54",
                    descripcion: "Técnicas para cultivar guayaba."
                }
            ]
        };
    },
    methods: {
        abrirVideo(planta) {
            this.videoSeleccionado = planta;
            document.body.style.overflow = 'hidden';
        },
        cerrarModal() {
            this.videoSeleccionado = null;
            document.body.style.overflow = 'auto';
        }
    }
}
