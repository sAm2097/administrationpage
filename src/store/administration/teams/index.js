import axiosService from "@/util/axios-service";
export default {
  namespaced: true,
  state() {
    return {
      teamsList: [
        {
          allowedPermissions:[]
        }
      ],
      permissions:[
        {name: 'permission 1'},
        {name: 'permission 2'},
        {name: 'permission 3'},
        {name: 'permission 4'},


      ]
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
