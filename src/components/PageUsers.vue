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
                    type="text"
                    placeholder="User name"
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
                  />
                  <label for="inputEmail">Email</label>
                </div>
              </div>

              <h4 class="mt-4">Assign Team</h4>
              <div class="col-4 col-md-2">
                <div class="input-group-text">
                  <input
                    class="form-check-input mt-0"
                    type="checkbox"
                    value=""
                    aria-label="Checkbox for following text input"
                  />
                  <label for="team">Team 1</label>
                </div>
              </div>
              <div class="col-4 col-md-2">
                <div class="input-group-text">
                  <input
                    class="form-check-input mt-0"
                    type="checkbox"
                    value=""
                    aria-label="Checkbox for following text input"
                  />
                  <label for="team">Team 2</label>
                </div>
              </div>
              <div class="col-4 col-md-2">
                <div class="input-group-text">
                  <input
                    class="form-check-input mt-0"
                    type="checkbox"
                    value=""
                    aria-label="Checkbox for following text input"
                  />
                  <label for="team">Team 3</label>
                </div>
              </div>
              <div class="col-4 col-md-2">
                <div class="input-group-text">
                  <input
                    class="form-check-input mt-0"
                    type="checkbox"
                    value=""
                    aria-label="Checkbox for following text input"
                  />
                  <label for="team">Team 4</label>
                </div>
              </div>
              <!-- <div class="input-group mb-3 mt-3">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input type="checkbox" aria-label="Checkbox for following text input">
                    </div>
                  </div>
                </div> -->

</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PageUsers",
  components: {
  
    BaseRichListItem,
  },
  data() {
    return {
      usersList: [],
      isLoading: false,
    };
  },
  computed: {},
  methods: {
    ...mapActions("administration/users", ["loadUsers"]),
  },
  mounted() {
    // this.loadUsers()
    //   .then((response) => {
    //     this.usersList = response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  },
  created() {
    this.loadTeams()
      .then((response) => {
        this.teamsList = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
      console.log('created Teams');
    this.loadUsers()
      .then((response) => {
        this.usersList = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
      console.log('created Teams');

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