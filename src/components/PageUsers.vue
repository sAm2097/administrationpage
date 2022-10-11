/* eslint-disable */
<template>
  <!-- <transition duration="550" name="nested"> -->
  <div class="container-fluid p-0">
    <h1>Create New User</h1>
    <div class="container mt-5 mb-5">
      <div class="card mb-3">
        <!-- navigation buttons Edit,delete and save -->
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs d-flex">
            <li class="nav-item"></li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <button type="button" class="btn btn-primary">Edit User</button>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <button type="button" class="btn btn-danger">
                  Delete User
                </button>
              </a>
            </li>
          </ul>
        </div>
        <div class="row m-3">
          <div class="col">
            <form class="row g-2">
              <div class="col-12 col-md-6">
                <div class="form-floating">
                  <input
                    class="form-control"
                    :class="{
                      'is-valid':
                      currentUser.name?.length===undefined ||
                      currentUser.name?.length<1
                      }"
                    type="text"
                    placeholder="User name"
                    required v-model="userName"
                    id="inputUserName"
                  />
                  <label for="inputUserName">User Name</label>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-floating">
                  <input
                    class="form-control"
                    type="Email"
                    placeholder="Email"
                    id="inputEmail"
                    required v-model="email"
                   
                  />
                  <label for="inputEmail">Email</label>
                </div>
              </div>

              <h4 class="mt-4">Assign Team</h4>
              <div class="col-4 col-md-2">
                <div class="input-group-text" v-for="team in teamsList" :key="team.id">
                  <input
                    class="form-check-input mt-0"
                    type="checkbox"
                    :value="item.name"
                    :id="item.id"
                    v-model="userList.teamSelected"   
                    aria-label="Checkbox for following text input"                
                  />
                  <label :for="team.id">{{team.name}}Team 1</label>
                  
                </div>
              </div>
              <div class="col-4 col-md-2">
                <div class="input-group-text">
                  <input
                    class="form-check-input mt-0"
                    type="checkbox"
                    value=""
                    v-model="teams"
                    aria-label="Checkbox for following text input"
                  />
                  <label for="team">Team 2</label>
                </div>
              </div>
           
              

              <input
                type="submit"
                class="btn btn-success mt-4"
                value="Create User"
              />
            </form>
          </div>
        </div>
      </div>
      <div class="col col-md-3 ms-auto mt-2">
        <div class="form-floating">
          <select id="selectPerPage" class="form-select">
            <option v-for="i in [5, 10, 15, 20]" :key="i">{{ i }}</option>
          </select>
          <label for="selectPerPage">results per page</label>
        </div>
      </div>
    </div>
  </div>
  <!-- </transition> -->
  <!-- <div>
 {{ usersList }}
</div> -->
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "PageUsers",
  data() {
    return {
      isLoading: false,
      userId:null,
    };
  },
  computed: {
    ...mapState("administration/teams",["teamList"]),
    ...mapState("administration/users",["userList","teams","currentUser","totalNumberOfUsers"]),
    userName:{
      set(value){
        this.currentUser.name=value;
      },
      get(){
        if(this.currentUser){
          return this.currentUser.name;
        }else{
          return "";
        }
      }
    },
    email:{
      set(value){
        this.currentUser.email=value
      },
      get(){
        if(this.currentUser){
          return this.currentUser.email;
        }else{
          return "";
        }
      }
    }
  },
  methods: {
    ...mapActions("administration/users", ["loadUsers","addUsers","loadNumberOfUsers"]),
  //     validateEmail() {
  //     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
  //         this.msg['email'] = 'Please enter a valid email address';
  //     } else {
  //         this.msg['email'] = '';
  //     }
  // },
    submitUser(){
      this.addUsers(this.currentUser)
      .then(()=>{
        this.$router.push("/administration/users")

      })
    }
  },
  mounted() {
    this.loadUsers()
      .then((response) => {
        this.usersList = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}
.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}
/* delay enter of nested element */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0.001;
}
</style>