import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueApexCharts from "vue3-apexcharts";
import Popper from "vue3-popper";
import JsonExcel from "vue-json-excel3";

const app = createApp(App);
// eslint-disable-next-line
app.component("Popper", Popper);
// eslint-disable-next-line
app.component("downloadExcel", JsonExcel);

app.use(VueApexCharts);
app.use(store).use(router).mount('#app')
