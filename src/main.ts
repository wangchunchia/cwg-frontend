import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import "~/styles/index.scss";
import "uno.css";
import routes from '~pages'
import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)

app.use(ElementPlus)
app.use(router)

app.mount('#app')