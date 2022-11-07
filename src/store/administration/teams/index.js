import axios from "axios";

import * as types from "@/store/modules/administration/mutation-types";

export default {
  namespaced: true,
  state() {
    return {
      teamsList: [],
    };
  },
  mutations:{

    [types.ADD_TEAM](state,payload){
      state.teamsList.push(payload)
    },
    [types.UPDATE_TEAM_LIST_ITEMS](state,payload){
      state.teamsList=[]
      state.teamsList.push(...payload)
    },
    [types.UPDATE_PERMISSION_TRANSLATIONS](state, payload) {
      const permissions = [];
      for (const key in payload) {
        permissions.push(payload[key]);
      }
      state.permissions = permissions;
    }
  },
  actions: {
  
    addTeam(context,data){
      return new Promise((resolve, reject) => {
       axios.post("http://localhost:3000/administration/teams", data)
          .then(response => {
            context.commit(types.ADD_TEAM, response.data);
            resolve(response.data);
          })
          .catch(error => reject(error));
      });
    },

    loadPermissionTranslation(context){
      console.log("hi");
      return new Promise((resolve,reject)=>{
        axiosService({requiresAuth:true})
        .get("/administration/permission_translations/")
        .then(response=>{
          context.commit(
            types.UPDATE_PERMISSION_TRANSLATIONS,
            response.data
          );
        })
        .catch(error => {
          reject(error)
      });
      })
    },
    loadTeams(context) {
      return new Promise((resolve, reject) => {
       axios
          .get("http://localhost:3000/administration/teams")
          .then(response => {
            context.commit(
            types.UPDATE_TEAM_LIST_ITEMS,
            response.data
            )
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  getters:{
    teamsList(state){
      return state.teamsList
    },
    permissions(state){
      return state.permissions;
    }
  }
};

