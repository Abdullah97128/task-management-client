import axios from "axios";

const API_URL = "http://localhost:3001/api/roles/";

class RoleServices {
  getRoles() {
    return axios.get(API_URL).then((response) => {
      console.log(response.data);
      if (response.data.status) {
        return response.data.data;
      }
      return null;
    });
  }
}

export default new RoleServices();
