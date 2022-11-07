/* eslint-disable */
<template>
  

  <div class="list-group border-0 mt-2">
    <base-rich-list-item
      v-for="user in usersList"
      :key="user.id"
      :id="user.id"
      :selected="user.selected"
      :main-text="user.userName"
      :muted-text="user.userEmail"
     
      @item-long-press="selectable ? (user.selected = true) : ''"
      @item-click="onTeamClicked(user)"
    />
  </div>


</template>

<script>
import { mapActions, mapState } from "vuex";

import BaseRichListItem from "@/components/ui/BaseRichListItem";


export default {
  name: "PageUsers",
  components: {
  
    BaseRichListItem,
  },
  data() {
    return {
      isLoading: false,
      expandFilter: false,

      userId: null,
    };
  },
  computed: {
    ...mapState("administration/teams", ["teamsList"]),
    ...mapState("administration/users", [
      "usersList",
      "teams",
      "currentUser",
      "totalNumberOfUsers",
    ]),
    userName: {
      set(value) {
        this.currentUser.name = value;
      },
      get() {
        if (this.currentUser) {
          return this.currentUser.name;
        } else {
          return "";
        }
      },
    },
    email: {
      set(value) {
        this.currentUser.email = value;
      },
      get() {
        if (this.currentUser) {
          return this.currentUser.email;
        } else {
          return "";
        }
      },
    },
  },
  methods: {
    ...mapActions("administration/users", [
      "loadUsers",
      "addUsers",
      "loadNumberOfUsers",
    ]),

    ...mapActions("administration/teams", ["loadTeams"]),
    submitUser() {
      this.addUsers(this.currentUser).then(() => {
        this.$router.push("/administration/users");
      });
    },


   
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