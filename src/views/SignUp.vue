<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.js';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Message from 'primevue/button';
import VLoader from '@/components/VLoader.vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore();
const router = useRouter();

const email = ref();
const password = ref();

const signup = async () => {
  await authStore.auth({email: email.value, password: password.value}, 'signup');
  router.push('/cars');
};
</script>

<template>
  <h2>Sign Up</h2>
  <form class="flex flex-column gap-3">
    <Message v-if="authStore.error" severity="warn">{{ authStore.error }}</Message>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
          <i class="pi pi-user"></i>
      </span>
      <InputText type="email" v-model="email" placeholder="Your Email" />
    </div>
    <div class=" flex-1">
      <span class="text">
          <i class="pi pi-at"></i>
      </span>
      <InputText type="password" v-model="password" placeholder="Password" />
    </div>
    <VLoader v-if="authStore.loader"/>
    <div v-else class="flex flex-column gap-3">
      <Button label="Signup" @click="signup"/>
      <span>Are you already registered? <router-link to="/signin">Sign in</router-link></span>
    </div>
  </form>
</template>
