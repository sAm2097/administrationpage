<template>
  <div class="container-fluid p-0">
    <div class="container mt-5 mb-5">
      <div lass="alert alert-danger" role="alert" v-if="errorMessage !== null">
        {{ errorMessage }}
      </div>
      <!-- Creating new Team -->
      <div class="card mb-3">
        <div class="card-header">
          <!-- Name of the Team in Teams -> list -->
          <ul class="nav nav-tabs card-header-tabs d-flex">
            <li class="nav-item">
              <a
                v-if="currentTeam.name"
                class="nav-link"
                :class="{ active: !editTeam }"
                @click="editTeam = false"
                href="#"
                >{{ teamName }}</a
              >
            </li>
            <!-- nav-Edit -->
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: editTeam }"
                @click="editTeam = true"
                href="#"
                >{{ $t("edit").capitalize() }}</a
              >
            </li>
            <!-- nav-Delete -->
            <li class="nav-item">
              <a
                class="nav-link text-danger"
                @click="$refs.deleteTeamDialog.show()"
                href="#"
                >{{ $t("delete").capitalize() }}</a
              >
            </li>
            <!-- nav-Save -->
            <li class="ms-auto" v-show="editTeam">
              <button
                class="btn btn-primary"
                :disabled="!saveButtonEnabled"
                @click.stop="submitTeam"
              >
                <span
                  v-if="isLoadingInEditTeamForm"
                  class="spinner-border spinner-border-sm"
                />
                {{ $t("save").capitalize() }}
              </button>
            </li>
          </ul>
        </div>
        <!-- Team details card -->
        <div class="row m-3">
          <!-- Edit Team -->

          <!-- Team details -->
          <div v-if="!editTeam" class="col">
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h1 class="card-title">{{ teamName }}</h1>
                  <p class="card-text">
                    <small class="text-muted">
                      {{ teamId }}
                    </small>
                  </p>
                  <p class="card-text">{{ allowedPermissions }}</p>
                  <p class="card-text">
                    <small class="text-muted"
                      >{{ $t("createdAt").capitalize() }}
                      {{ teamPrettyCreationDate }}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- Edit team -->
          <div v-if="editTeam" class="col">
            <form @submit.prevent="" class="row g-2">
              <div class="col-12 col-md-6">
                <div class="form-floating">
                  <input
                    class="form-control"
                    :class="{
                      'is-invalid':
                        currentTeam.name?.length === undefined ||
                        currentTeam.name?.length < 1,
                    }"
                    type="text"
                    placeholder="Name"
                    v-model="teamName"
                    id="inputTeamName"
                  />
                  <label for="inputTeamName">Name</label>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-floating">
                  <input
                    class="form-control"
                    :class="{
                      'is-invalid':
                        currentTeam.teamId?.length === undefined ||
                        currentTeam.teamId?.length < 1,
                    }"
                    type="text"
                    placeholder="TeamId"
                    v-model="TeamId"
                    id="inputTeamId"
                  />
                  <label for="inputTeamId">Team Id</label>
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
                        :value="permission.id"
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
              <div class="col ms-auto"></div>
            </form>
          </div>
        </div>
      </div>
      <!-- Delete dialog box with name -->

      <bs-dialog ref="deleteTeamDialog" :header="$t('deleteTeam').capitalize()">
        <template v-slot:body>
          <div
            class="alert alert-danger"
            role="alert"
            v-if="errorMessageDeleteDialog !== null"
          >
            {{ errorMessageDeleteDialog }}
          </div>
          <p>{{ $t("delete").capitalize() }} '{{ currentTeam.name }}'?</p>
        </template>
        <template v-slot:footer>
          <button
            class="btn btn-secondary"
            @click.stop="$refs.deleteTeamDialog.close()"
          >
            {{ $t("cancel").capitalize() }}
          </button>
          <button
            class="btn btn-danger"
            @click.stop="
              deleteTeam();
              $refs.deleteTeamDialog.close();
            "
          >
            <span v-if="isLoading" class="spinner-border spinner-border-sm" />
            {{ $t("delete").capitalize() }}
          </button>
        </template>
      </bs-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BsDialog from "@/components/ui/BsDialog";


import {v4 as uuid} from "uuid";

export default {
 name: "PageTeamDetails",
  components: {  BsDialog },
  data() {
    return {
      editTeam: false,
      errorMessageDeleteDialog: null,
      isLoading: false,
      isLoadingInDeleteDialog: false,
      isLoadingInEditTEamForm: false,
      errorMessage: null,
      teamId: null,
      itemRefs: {},
      jsonRawEditorKey: uuid()
    };

  },
    computed:{
       ...mapState("administration/teams", ["currentTeam"]),
    teamName: {
      set(value) {
        this.currentTeam.name = value;
      },
      get() {
        if (this.currentTeam) {
          return this.currentTeam.name;
        } else {
          return "";
        }
      }
    },
    teamId: {
      set(value) {
        this.currentTeam.teamId = value;
      },
      get() {
        if (this.currentTeam) {
          return this.currentTeam.teamId;
        } else {
          return "";
        }
      },     
    },
     permissions: {
      set(value) {
        this.currentTeam.permission = value;
      },
      get() {
          return this.currentTeam.permission;
      }
    },
     saveButtonEnabled() {
      return (
        this.currentTeam.name?.length && this.currentTeam.teamId?.length
      );
    },
      teamPrettyCreationDate() {
      if (this.currentTeam) {
        const options = {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric"
        };
        return new Date(this.currentTeam.creationTime).toLocaleString(
          this.$i18n.locale,
          options
        );
      } else {
        return "";
      }
    },
    teamPrettyEditDate() {
      if (this.currentTeam) {
        const options = {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric"
        };
        return new Date(this.currentTeam.editTime).toLocaleString(
          this.$i18n.locale,
          options
        );
      } else {
        return "";
      }
    },

    
     

},
methods:{
        ...mapActions("administration/teams",[
            "loadTeam",
            "updateTeam",
            "addTeam",
            "deleteTeam",
            "setCurrentTeamName",
            "setCurrentTeamItemNumber",
            "setCurrentTeamPermissions",
            "updateCurrenTeam"
        ]),
    submitTeam() {
      if (this.teamId) {
        this.isLoadingInEditTeamForm = true;
        this.updateTeam(this.currentTeam)
          .then(() => {
            this.editTeam = false;
          })
          .catch(error => {
            console.error(error);
            this.errorMessage = error;
          })
          .finally(() => {
            this.isLoadingInEditTeamForm = false;
          });
      } else {
        this.isLoadingInEditTeamForm = true;
        this.addTeam(this.currentTeam)
          .then(response => {
            this.updateCurrentTeam(response);
            this.editTeam = false;
            this.$router.push({
              name: "TeamDetails",
              params: { teamId: response.id }
            });
          })
          .catch(error => {
            console.error(error);
            this.errorMessage = error;
          })
          .finally(() => {
            this.isLoadingInEditTeamForm = false;
          });
      }
    },
    },
    mounted() {
    if (this.$route.name === "CreateTeam") {
      this.teamId = null;
      this.updateCurrentTeam({});
      this.editTeam = true;
    } else {
      this.teamId = this.$route.params.teamId;
      this.loadTeam({ id: this.teamId });
      this.editTeam = false;
    }
  },
//     watch: {
//     $route(to, from) {
//       if (to.path === from.path) {
//         return;
//       }
//       if (to.name === "CreateTeam") {
//         this.teamId = null;
//         this.updateCurrentTeam({});
//         this.editTeam = true;
//       } else if (to.name === "TeamDetail") {
//         this.teamId = this.$route.params.teamId;
//         this.loadTeam({ id: this.teamId });
//         this.editTeam = false;
//       }
//     }
//   }
}
</script>

