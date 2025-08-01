export default {
    name: 'GuiasComponent',
    data() {
        return {
            videoSeleccionado: null,
            plantas: [
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
                }
            ]
        }
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