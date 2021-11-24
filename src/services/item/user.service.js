import http from "../../http-common-users";
import authHeader from "./auth-header";

class UserService {
  async getUserInfo(id) {
    return await http.get(`${id}`, { headers: authHeader() });
  }

  async updateUserInfo(id, data) {
    return await http.put(`/update/${id}`, data, { headers: authHeader() });
  }

  async changePassword(id, data) {
      console.log(data)
    return await http.put(`/password/change/${id}`, data, {
      headers: authHeader(),
    });
  }

  async addProfileImage(id, image) {
    return await http.post(`profile-image/add/${id}`, image, {
      headers: authHeader(),
    });
  }
  getUserProfileImage(id){
    return http.get(`profile-image/${id}`,{
      headers: authHeader(),
    })
  }
}



export default new UserService();
