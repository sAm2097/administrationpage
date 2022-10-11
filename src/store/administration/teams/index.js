import axiosService from "@/util/axios-service";
export default {
  namespaced: true,
  state() {
    return {
      teamsList: [],
    };
  },
  actions: {
    loadTeams() {
      return new Promise((resolve, reject) => {
        axiosService({ requiresAuth: true })
          .get("/administration/teams/")
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
