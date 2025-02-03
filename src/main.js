import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeApp } from 'firebase/app';

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import './api';

const firebaseConfig = {
  apiKey: "AIzaSyCxh3NEQAwvDyT0dGkYiaz_bIREGhqYUco",
  authDomain: "vue-jws-fb.firebaseapp.com",
  projectId: "vue-jws-fb",
  storageBucket: "vue-jws-fb.firebasestorage.app",
  messagingSenderId: "632711203088",
  appId: "1:632711203088:web:8b6d885c59aaf6a643fd95"
};
const app = createApp(App);

app.use(initializeApp(firebaseConfig));
app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount('#app');
