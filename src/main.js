import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaStorage from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaStorage);

app.use(pinia);
app.use(router);

app.mount("#app");
