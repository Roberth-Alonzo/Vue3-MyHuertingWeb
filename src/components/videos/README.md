# Componente VideoGuia

Este componente permite mostrar videos en la aplicación.

## Uso

El componente requiere una propiedad `videoUrl` que debe ser una URL válida a un archivo de video.

```vue
<VideoGuia videoUrl="/videos/mi-video.mp4" />
```

## Propiedades

- `videoUrl` (String, requerido): La URL del video a mostrar.

## Funciones

El componente incluye funciones para:
- Verificar si la URL es un archivo mp4 válido
- Extraer el nombre del archivo de la URL

## Ruta

El componente está disponible en la ruta `/video-guia`.

## Notas

- Asegúrese de que los archivos de video estén en la carpeta `public/videos/`.
- Los formatos recomendados son .mp4, .webm, o .ogg.