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
            <form class="row g-2">
              <div class="col-12 col-md-6">
                <div class="form-floating">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="User name"
                    id="inputUserName"
                  />
                  <label for="inputUserName">Team Name</label>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-floating">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Team Id"
                    id="teamId"
                  />
                  <label for="teamId">Team ID</label>
                </div>
              </div>
              <h4 class="mt-4">Assign Permissions</h4>

              <div class="col-4 col-md-2">
                <div class="input-group-text">
                  <input
                    class="form-check-input mt-0"
                    type="checkbox"
                    value=""
                    aria-label="Checkbox for following text input"
                  />
                  <label for="permission">Permission 1</label>
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
                  <label for="permission">Permission 2</label>
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
                  <label for="permission">Permission 3</label>
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
                  <label for="permission">Permission 4</label>
                </div>
              </div>

              <input
                type="submit"
                class="btn btn-success mt-4"
                value="Create Team"
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
      :main-text="team.name"
      :muted-text="team.teamId"
      :creation-date-text="convertPrettyCreationDate(team.creationTime)"
      @item-long-press="selectable ? (team.selected = true) : ''"
      @item-click="onTeamClicked(team)"
    />
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";
import BaseRichListItem from "@/components/ui/BaseRichListItem";
import { calculateDatePrecisionOptions } from "@/renderFunctions";

export default {
  name: "PageTeams",
  components: { BaseRichListItem },

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
    };
  },
  computed: {
    ...mapState("administration/teams", ["teamsList"]),
  },
  methods: {
    ...mapActions("administration/teams", ["loadTeams"]),

    convertPrettyCreationDate(creationTime) {
      //const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      const options = calculateDatePrecisionOptions(new Date(creationTime));
      return new Date(creationTime).toLocaleString(this.$i18n.locale, options);
    },
  },
  created() {
    // this.loadTeams()
    //   .then((response) => {
    //     this.teamsList = response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  },
};
</script>

<style scoped></style>
