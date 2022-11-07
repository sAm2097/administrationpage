/*eslint-disable*/
<template>
  <!-- <transition duration="550" name="nested"> -->
  <div class="container-fluid p-0">
    <h1>Teams</h1>
    <div class="container mt-5 mb-5">
      <div class="card mb-3">
        <!-- navigation buttons Edit,delete and save -->
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs d-flex">
            <li class="nav-item"></li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <button type="button" class="btn btn-primary">Edit Team</button>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <button type="button" class="btn btn-danger">
                  Delete Team
                </button>
              </a>
            </li>
          </ul>
        </div>
        <div class="row m-3">
          <div class="col">
            <form class="row g-2" @submit.prevent="">
              <div class="col-12 col-md-6">
                <div class="form-floating">
                  <input
                    v-model="teamName"
                    class="form-control"
                    type="text"
                    placeholder="User name"
                    id="inputUserName"
                    autocomplete="off"
                  />
                  <label for="inputUserName">Team Name</label>
                </div>
              </div>

              <div class="card-body">
                <h5
                  class="card-title cursor-pointer"
                  @click="$refs.collapseFilter.toggle()"
                >
                  Assign Permissions
                  <i class="bi bi-filter" />
                </h5>
                <bs-collapse
                  id="collapseFilter"
                  ref="collapseFilter"
                  :show="expandFilter"
                  @close="expandFilter = false"
                >
                  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2">
                    <ul v-for="permission in permissions" :key="permission.id">
                      <input
                        class="form-check-input mt-0"
                        type="checkbox"
                        :id="permission.id"
                        :value="{ permissionType: permission.id }"
                        v-model="allowedPermissions"
                        aria-label="Checkbox for following text input"
                      />
                      <label class="ms-2" :for="permission.id">
                        {{ permission.name.toLowerCase() }}
                      </label>
                    </ul>
                  </div>
                </bs-collapse>
              </div>

              <input
                type="submit"
                class="btn btn-success mt-2"
                value="Create Team"
                @click="submitTeam"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="list-group border-0 mt-2">
    <base-rich-list-item
      v-for="team in teamsList"
      :key="team.id"
      :id="team.id"
      :selected="team.selected"
      :main-text="team.teamName"
      :muted-text="team.teamId"
      :creation-date-text="convertPrettyCreationDate(team.creationTime)"
      @item-long-press="selectable ? (team.selected = true) : ''"
      @item-click="onTeamClicked(team)"
    />
  </div>

  <div class="" v-show="!isLoading">
    <base-pagination class="d-flex justify-content-center mt-2" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BaseRichListItem from "@/components/ui/BaseRichListItem";
import { calculateDatePrecisionOptions } from "@/renderFunctions";
import BsCollapse from "@/components/ui/BsCollapse";
import BasePagination from "@/components/ui/BasePagination";

export default {
  name: "PageTeams",
  components: { BaseRichListItem, BsCollapse, BasePagination },

  props: {
    selectable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      isLoading: false,
      expandFilter: false,
      teamName: "",
      allowedPermissions: [],
      errorMessage: null,
    };
  },
  computed: {
    ...mapState("administration/teams", ["teamsList", "permissions"]),
  },
  methods: {
    ...mapActions("administration/teams", ["loadTeams", "addTeam"]),

    submitTeam() {
      // console.log('Before Post')
      // console.log('TEAMNAME',this.teamName);
      // console.log('PERMISSIONS', this.allowedPermissions);

      this.addTeam({
        teamName: this.teamName,
        permissions: this.allowedPermissions,
      })
        .then(() => {
          this.teamName = "";
          this.allowedPermissions = [];
          this.errorMessage = null;
          console.log("submitSuccess");
          this.$emit("submitSuccess");
        })
        .catch((e) => {
          console.log("submitError");
          this.$emit("submitError");
          this.errorMessage = e;
          console.log(e);
        });
    },

    convertPrettyCreationDate(creationTime) {
      //const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      const options = calculateDatePrecisionOptions(new Date(creationTime));
      return new Date(creationTime).toLocaleString(this.$i18n.locale, options);
    },
  },
  watch: {
    submit(n) {
      if (n) {
        this.submitTeam();
      }
    },
  },
  created() {
    this.loadTeams()
      .then((response) => {
        this.teamsList = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped></style>
