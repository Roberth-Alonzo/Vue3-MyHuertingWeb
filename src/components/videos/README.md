# Componentes de Video

Este módulo contiene los componentes para mostrar videos educativos en la aplicación.

## Componentes

### VideoGuia
Componente individual para reproducir un video específico.

**Uso:**
```vue
<VideoGuia videoUrl="/videos/mi-video.mp4" />
```

**Propiedades:**
- `videoUrl` (String, requerido): La URL del video a mostrar.

**Características:**
- Manejo de errores de carga
- Estados de loading
- Validación de formato MP4
- Interfaz de reintento en caso de error

### VideoList
Componente que muestra una lista de videos disponibles con reproductor integrado.

**Uso:**
```vue
<VideoList />
```

**Características:**
- Grid responsivo de videos
- Thumbnails con overlay de play
- Reproductor integrado
- Información detallada de cada video

## Rutas

- `/videos` - Lista completa de videos (recomendado)
- `/video-guia` - Reproductor individual con video de ejemplo

## Videos Disponibles

1. **Introducción a los Huertos Urbanos** (`ejemplo.mp4`)
2. **Plantación de Tomates** (`plantacion-tomates.mp4`)
3. **Cuidado General de Plantas** (`cuidado-plantas.mp4`)
4. **Riego Eficiente** (`riego-eficiente.mp4`)

## Funciones Utilitarias

El módulo incluye utilidades en `js/videoUtils.js`:
- `isValidMp4()` - Verificar si la URL es un archivo mp4 válido
- `getVideoFileName()` - Extraer el nombre del archivo de la URL

## Estructura de Archivos

```
videos/
├── VideoGuia.vue          # Reproductor individual
├── VideoList.vue          # Lista de videos
├── README.md              # Esta documentación
├── css/
│   ├── videos.css         # Estilos para VideoGuia
│   └── video-list.css     # Estilos para VideoList
└── js/
    └── videoUtils.js      # Utilidades JavaScript
```

## Notas

- Los archivos de video deben estar en `public/videos/`
- Los formatos recomendados son .mp4, .webm, o .ogg
- Las imágenes thumbnail se toman de `public/images/`
- El componente maneja automáticamente errores de red y formato