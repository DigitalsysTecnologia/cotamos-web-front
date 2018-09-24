import apiClient from "@/utils/apiClient";
import localStore from "@/utils/localStorage";

function redirectToLogin() {
  if (process.browser) {
    localStorage.userToken = null;
    window.location = "/painel/login";
  }
}

export default {
  async clearSession() {
    localStore.userToken = null
  },
  async checkSession(page) {
    const token = localStore.userToken;

    let isAuthenticated = false;

    if (!token) {
      redirectToLogin();
      return;
    }

    try {
      isAuthenticated = (await apiClient.checkSession(token)).resultCode == 0;
    }
    catch (err) {
      isAuthenticated = false
    }


    if (isAuthenticated != true) {
      redirectToLogin();
    }
  }
}