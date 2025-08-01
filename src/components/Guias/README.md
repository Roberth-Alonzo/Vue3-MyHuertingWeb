# Componente Guias

## Descripción
Componente Vue 3 que muestra una colección de videos instructivos sobre cultivo de plantas. Adaptado desde HTML estático a Vue 3.

## Funcionalidades
- ✅ Muestra 10 videos de YouTube sobre cultivo de diferentes plantas
- ✅ Diseño responsive con tarjetas de video
- ✅ Modal para ver videos en pantalla completa
- ✅ Navegación integrada con Vue Router
- ✅ Estilos scoped para evitar conflictos CSS
- ✅ Botón de retorno al menú principal
- ✅ Botones de acción para cada video
- ✅ Carga lazy de iframes para mejor rendimiento

## Plantas incluidas
1. Zanahoria
2. Pepino
3. Pimiento
4. Fresa
5. Romero
6. Lechuga
7. Albahaca
8. Tomate
9. Cilantro
10. Espinaca

## Rutas
- **URL**: `/guias`
- **Nombre**: `Guias`
- **Componente**: `Guias.vue`

## Integración
- ✅ Agregado al router (`src/router/index.js`)
- ✅ Enlace en el menú principal (`Main-Menu.vue`)
- ✅ Estilos adaptados a Vue 3

## Archivos originales (ya no necesarios)
- `guias.html` - HTML estático original
- `css/styleGuias.css` - Estilos originales
- `js/guias.js` - JavaScript original

## Uso
```vue
<router-link to="/guias">Guías de Cultivo</router-link>
```

## Características técnicas
- Vue 3 Composition API
- CSS Scoped
- Responsive design
- YouTube embeds
- Vue Router integration 