import axios from "axios";

const API_URL = "http://localhost:3001/api/users/";

class UserServices {
  getAllUsers() {
    return axios.get(API_URL).then((response) => {
      if (response.data.status) {
        return response.data.data;
      }
      return null;
    });
  }
}

export default new UserServices();
