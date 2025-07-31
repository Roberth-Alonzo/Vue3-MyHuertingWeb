# Despliegue Manual de MyHuertingWeb

## Proceso de construcción

Para construir la aplicación para producción, ejecuta:

```bash
npm run build
```

Esto generará todos los archivos necesarios en el directorio `dist/`.

## Contenido del directorio dist/

El directorio `dist/` contiene todos los archivos necesarios para el despliegue:

- `index.html` - Página principal
- `assets/` - Archivos CSS, JavaScript y otros recursos
- `images/` - Imágenes del sitio
- `videos/` - Videos del sitio
- `favicon.ico` - Icono del sitio

## Opciones de despliegue manual

### 1. Servidor web tradicional

1. Copia todo el contenido del directorio `dist/` a tu servidor web
2. Asegúrate de que el servidor esté configurado para servir archivos estáticos
3. La aplicación estará disponible en la URL configurada de tu servidor

### 2. GitHub Pages (desde la rama principal)

1. Construye la aplicación:
   ```bash
   npm run build
   ```

2. Mueve el contenido de `dist/` a la raíz del proyecto o a una carpeta específica

3. Agrega los cambios al repositorio:
   ```bash
   git add .
   ```

4. Haz commit de los cambios:
   ```bash
   git commit -m "Actualiza build para despliegue"
   ```

5. Empuja los cambios:
   ```bash
   git push origin Rama-Molina
   ```

6. Configura GitHub Pages en la configuración del repositorio:
   - Ve a Settings → Pages
   - Selecciona "Deploy from a branch"
   - Elige la rama "Rama-Molina"
   - Especifica la carpeta donde están los archivos (raíz o carpeta específica)

### 3. Servicios de hosting gratuitos

Puedes usar servicios como:
- Netlify: Arrastra y suelta la carpeta `dist/`
- Vercel: Conecta tu repositorio y despliega automáticamente
- Firebase Hosting: Usa el CLI de Firebase para despliegue

## Notas importantes

- El directorio `dist/` se genera automáticamente y no debe editarse manualmente
- Siempre ejecuta `npm run build` después de hacer cambios en el código fuente
- Los archivos en `dist/` son optimizados y minificados para producción
