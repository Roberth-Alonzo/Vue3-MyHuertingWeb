// Verifica si la URL es un archivo mp4 válido
export function isValidMp4(url) {
  return typeof url === 'string' && url.trim().toLowerCase().endsWith('.mp4');
}

// Extrae el nombre del archivo de video desde la URL
export function getVideoFileName(url) {
  if (typeof url !== 'string') return '';
  return url.split('/').pop();
}
