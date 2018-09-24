import apiClient from "@/utils/apiClient";
import localStore from "@/utils/localStorage";

export default {
    async checkSession(page) {
        const token = localStore.userToken;
        
        let isAuthenticated = false;
        if (token) {
          isAuthenticated = await apiClient.checkSession(token);
        }
  
        if (!isAuthenticated) {
          localStorage.userToken = null;
          page.$router.push({ path: "/painel/login" });
        }
    }
}