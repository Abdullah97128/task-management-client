import axios from "axios";

const API_URL = "http://localhost:3001/api/status/";

class StatusServices {
  getStatus() {
    return axios.get(API_URL).then((response) => {
      if (response.data.status) {
        return response.data.data;
      }
      return null;
    });
  }
}

export default new StatusServices();
