/* eslint-disable */

import * as types from "@/store/modules/administration/mutation-types";

import axiosService from "@/util/axios-service";

export default {
  namespaced: true,
  state() {
    return {
      usersList: [
        {
          teamSelected:[]
        }
      ],
      currentUser: {},
      totalNumberOfUsers: 0,
     

    };
  },
  
  mutations: {
    
    [types.ADD_USER](state, payload) {
      state.usersList.push(payload);
    },

    [types.UPDATE_USERS](state, payload) {
      const usersList = [];
      for (const key in payload) {
        usersList.push(payload[key]);
      }
      state.usersList = usersList;
    },

    [types.UPDATE_TOTAL_NUMBER_OF_USERS](state, payload) {
      state.totalNumberOfUsers = parseInt(payload);
    },

    [types.SET_CURRENT_USER_NAME](state, payload) {
      state.currentuser.name = payload;
    },

    [types.SET_CURRENT_USER_EMAIL](state, payload) {
        state.currentuser.email = payload;
    },

    [types.SET_CURRENT_USER_TEAM](state, payload) {
      state.currentDecor.userTeam = payload;
    },

  },
  actions: {
     addUser(context, data) {
      return new Promise((resolve, reject) => {
        axiosService({ requiresAuth: true })
          .post("/administration/users/", data)
          .then((response) => {
            context.commit(types.ADD_USER, response.data);
            resolve(response.data);
          })
          .catch((error) => reject(error));
      });
    },
   
    loadUsers(context, data) {
      return new Promise((resolve, reject) => {
        axiosService({ requiresAuth: true })
          .get("/administration/users/", {
            params: {
              name: data?.name,
              email: data?.email,
              team: data?.team,
            },
          })
          .then((response) => {
            context.commit(types.UPDATE_TOTAL_NUMBER_OF_USERS, response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    loadNumberOfUsers(context, data) {
      return new Promise((resolve, reject) => {
        axiosService({ requiresAuth: true })
          .get("/administration/users/count", {
            params: {
              name: data?.name,
              team: data?.team,
            },
          })
          .then((response) => {
            context.commit(types.UPDATE_TOTAL_NUMBER_OF_USERS, response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    usersList(state) {
      return state.usersList;
    },
    totalNumberOfUsers(state) {
      return state.totalNumberOfUsers;
    },
    currentUser(state){
      return state.currentUser
    }
  },
};
