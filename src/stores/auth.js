import { ref } from 'vue';
import { defineStore } from 'pinia';
import axiosApiInstance from '../api'

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE;

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
  });
  const error = ref('');
  const loader = ref(false);

  const auth = async (payload, type) => {
    const stringUrl = type === 'signup' ? 'signUp' : 'signInWithPassword';
    error.value = '';
    loader.value = true;
    try {
      let response = await axiosApiInstance.post(`https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`, {
        ...payload,
        returnSecureToken: true
      });
      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
      };
      localStorage.setItem('userTokens', JSON.stringify({
        token: userInfo.value.token,
        refreshToken: userInfo.value.refreshToken,
      }));
    } catch(err) {
      switch (err.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Email exists'
          break;
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Operation not allowed'
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          error.value = 'Invalid password or login'
          break;
        default:
          error.value = 'Error'
          break;
      };
      throw error.value;
    } finally {
      loader.value = false;
    };
  };

  const logout = () => {
    userInfo.value = {
      token: '',
      email: '',
      userId: '',
      refreshToken: '',
    }
  }
  return { userInfo, error, loader, auth, logout }
});
