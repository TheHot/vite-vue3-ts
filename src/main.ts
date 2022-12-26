import { createApp } from 'vue'
// global css
import './style.css'
// dark or light
// import 'element-plus/theme-chalk/dark/css-vars.css'

// ElMessage CSS
import 'element-plus/es/components/message/style/css'
// ElMessageBox CSS
import 'element-plus/es/components/message-box/style/css'

// vant > showConfirmDialog, showNotify
import 'vant/es/dialog/style'
import 'vant/es/notify/style'

import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
