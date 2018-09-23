import apiClient from "@/utils/apiClient";
import localStorage from "@/utils/localStorage";

export default {
    async checkSession(page) {
        const token = localStorage.userToken;
        let isAuthenticated = false;
        if (token) {
          isAuthenticated = await apiClient.checkSession(token);
        }
  
        if (!isAuthenticated) {
          localStorage.userToken = null;
          page.$router.push({ path: "/painel/login" });
        }
    },
    async setUserToken() {

    }
}