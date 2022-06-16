import axios from "axios";

const API_URL = "http://localhost:3001/api/tasks/";

class TaskServices {
  createTask(task) {
    return axios.post(API_URL, task).then((response) => {
      if (response.data.status) {
        return response.data.status;
      }
      return false;
    });
  }

  updateTask(task) {
    console.log(task);
    return axios.put(API_URL, task).then((response) => {
      if (response.data.status) {
        return response.data.status;
      }
      return false;
    });
  }

  deleteTask(id) {
    return axios.delete(API_URL + `/delete/${id}`).then((response) => {
      if (response.data.status) {
        return true;
      }
      return false;
    });
  }

  getAllTasks() {
    return axios.get(API_URL).then((response) => {
      if (response.data.status && response.data.data.length > 0) {
        return response.data.data;
      }
      return null;
    });
  }

  getTaskById(id) {
    return axios.get(API_URL + id).then((response) => {
      if (response.data.status && response.data.data) {
        return response.data.data;
      }
      return null;
    });
  }

  getTaskCreated(id) {
    return axios.get(API_URL + `addedBy/${id}`).then((response) => {
      if (response.data.status && response.data.data.length > 0) {
        return response.data.data;
      }
      return null;
    });
  }

  getTaskAssigned(id) {
    return axios.get(API_URL + `assignedTo/${id}`).then((response) => {
      if (response.data.status && response.data.data.length > 0) {
        return response.data.data;
      }
      return null;
    });
  }
}

export default new TaskServices();
