import apiClient from "@/utils/apiClient";
import localStorage from "@/utils/localStorage";

export default {
    async checkSession(page) {
        const token = localStorage.getItem('userToken');
        
        console.log('token', token)

        let isAuthenticated = false;
        if (token) {
          isAuthenticated = await apiClient.checkSession(token);
          console.log('isAuthenticated', isAuthenticated)
        }
  
        if (!isAuthenticated) {
          localStorage.userToken = null;
          page.$router.push({ path: "/painel/login" });
        }
    }
}