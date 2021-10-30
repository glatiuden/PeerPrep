<template>
  <v-col>
    <v-card>
      <v-card-title>Create A New User</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid_create">
          <v-col>
            <v-row class="gap">
              <v-text-field
                v-model="new_user.display_name"
                label="Display Name"
                prepend-inner-icon="mdi-account-outline"
                type="text"
                outlined
                dense
                required
                hide-details="auto"
                :rules="required"
              />
              <v-text-field
                v-model="new_user.email"
                label="Email Address"
                prepend-inner-icon="mdi-email-outline"
                type="email"
                outlined
                dense
                required
                hide-details="auto"
                :rules="email_rules"
              />
            </v-row>
            <v-row class="gap">
              <v-text-field
                v-model="new_user.password"
                label="Password"
                prepend-inner-icon="mdi-lock-outline"
                type="password"
                outlined
                dense
                required
                hide-details="auto"
                :rules="required"
              />

              <v-text-field
                label="Confirm Password"
                prepend-inner-icon="mdi-lock-outline"
                type="password"
                outlined
                dense
                required
                hide-details="auto"
                :rules="confirm_password_rules"
              />
            </v-row>
            <v-row>
              <v-select
                v-model="new_user.role"
                :items="role_types"
                label="User Role"
                :rules="required"
                outlined
                dense
                required
              ></v-select>
              <v-spacer></v-spacer>
            </v-row>
          </v-col>
          <v-btn :disabled="!valid_create" @click="createNewUser()">
            Create User
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <v-skeleton-loader
      v-if="loading"
      type="table-heading, table-tbody, table-tfoot"
    >
    </v-skeleton-loader>
    <div v-for="(user, index) in users" v-else :key="index">
      <v-card>
        <v-card-title class="title">
          <v-row class="margin-0">
            {{ user.display_name }}
            <div :class="'role-tag ' + user.role.toLowerCase()">
              {{ user.role.toUpperCase() }}
            </div>
          </v-row>
          <div>
            <v-btn outlined color="primary" @click="toggleEditing(user)">
              <v-icon v-if="!user.editing" small class="mr-1"
                >mdi-account-remove</v-icon
              >
              {{ user.editing ? "Cancel" : "Edit User" }}
            </v-btn>
            <v-btn color="primary" @click="deleteUser(user)">
              <v-icon small class="mr-1">mdi-account-remove</v-icon>
              Remove User
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text v-if="!user.editing">
          <p>
            <b> Email: </b>
            {{ user.email }}
          </p>
        </v-card-text>
        <v-card-text v-if="user.editing">
          <v-col cols="12" sm="9" md="9" lg="9" xl="8" class="gap">
            <v-row class="gap align-bottom">
              <v-form v-model="valid_display_name">
                <v-text-field
                  v-model="user.new_display_name"
                  label="Display Name"
                  name="email"
                  prepend-inner-icon="mdi-account-outline"
                  outlined
                  dense
                  required
                  hide-details="auto"
                  :rules="[(v) => v !== user.display_name && !!v]"
                />
              </v-form>
              <v-btn
                :disabled="!valid_display_name"
                @click="updateUserDisplayName(user)"
              >
                Update
              </v-btn>
            </v-row>
            <v-row class="gap align-bottom">
              <v-form v-model="valid_new_password">
                <v-text-field
                  v-model="user.new_password"
                  label="New Password"
                  prepend-inner-icon="mdi-lock-outline"
                  type="password"
                  outlined
                  dense
                  hide-details="true"
                  :rules="required"
                />
              </v-form>
              <v-btn
                :disabled="!valid_new_password"
                @click="updateUserPassword(user)"
              >
                Update
              </v-btn>
            </v-row>
          </v-col>
        </v-card-text>
      </v-card>
    </div>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.message }}
      <template #action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-col>
</template>

<script>
import userMixin from "@/mixins/user";

export default {
  name: "UserDashBoard",
  mixins: [userMixin],
  data() {
    return {
      new_user: {
        display_name: undefined,
        password: undefined,
        email: undefined,
        role: undefined,
      },
      users: [],
      email_rules: [
        (v) => !!v || "Email Address is required",
        (v) => /.+@.+\..+/.test(v) || "Email Address must be valid.",
      ],
      required: [(v) => !!v || "Password is required"],
      confirm_password_rules: [
        (v) => !!v || "Password is required",
        (v) =>
          this.new_user.password === v ||
          "Confirm Password must match Password.",
      ],
      valid_create: false,
      valid_display_name: false,
      valid_new_password: false,
      role_types: ["User", "Admin"],
      snackbar: {
        show: false,
        message: undefined,
        color: undefined,
      },
    };
  },
  async fetch() {
    this.fetchUsers();
  },
  methods: {
    showSnackbar(message, color) {
      this.snackbar = {
        show: true,
        message: message,
        color: color,
      };
    },
    toggleEditing(user) {
      user.editing = !user.editing;
    },
    resetCreateUserForm() {
      this.new_user.display_name = undefined;
      this.new_user.password = undefined;
      this.new_user.email = undefined;
      this.new_user.role = undefined;
      this.$refs.form.reset();
    },
    async fetchUsers() {
      try {
        this.SET_LOADING({ data: true });
        const users = await this.GET_USERS();
        this.users = users.map((user) => ({
          ...user,
          editing: false,
          new_display_name: user.display_name,
          new_password: undefined,
        }));
      } catch (err) {
        console.error(err);
      } finally {
        this.SET_LOADING({ data: false });
      }
    },
    async deleteUser(user) {
      if (!confirm(`Are you sure you want to delete ${user.display_name}?`))
        return;
      try {
        this.SET_LOADING({ data: true });
        const res = await this.DELETE_USER({ user_id: user._id });
        this.showSnackbar("Successfully deleted user", "green");
      } catch (err) {
        console.error(err);
        this.showSnackbar("Error deleting user", "red");
      } finally {
        this.fetchUsers();
        this.SET_LOADING({ data: false });
      }
    },
    async createNewUser() {
      try {
        this.SET_LOADING({ data: true });
        console.log(this.new_user);
        if (this.new_user.role === "Admin") {
          await this.CREATE_ADMIN({ admin: this.new_user });
        } else if (this.new_user.role == "User") {
          await this.CREATE_USER({ user: this.new_user });
        }
        this.showSnackbar("Successfully created user", "green");
        this.resetCreateUserForm();
      } catch (err) {
        this.showSnackbar("Error creating user", "red");
        console.error(err);
      } finally {
        this.fetchUsers();
        this.SET_LOADING({ data: false });
      }
    },
    async updateUserDisplayName(user) {
      try {
        this.SET_LOADING({ data: true });
        const users = await this.UPDATE_USER({
          user: { _id: user._id, display_name: user.new_display_name },
        });
        this.showSnackbar("Successfully updated user display name", "green");
      } catch (err) {
        console.error(err);
        this.showSnackbar("Error updating user display name", "red");
      } finally {
        user.editing = false;
        this.fetchUsers();
      }
    },
    async updateUserPassword(user) {
      try {
        this.SET_LOADING({ data: true });
        const users = await this.UPDATE_USER({
          user: { _id: user._id, password: user.new_password },
        });
        this.showSnackbar("Successfully updated user password", "green");
      } catch (err) {
        console.error(err);
        this.showSnackbar("Error updating user password", "red");
      } finally {
        user.editing = false;
        this.fetchUsers();
      }
    },
  },
};
</script>
<style>
.title {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.v-text-field.v-text-field--enclosed .v-text-field__details,
.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot {
  margin: 10px 0 0 0;
}

.v-sheet.v-card {
  margin: 10px;
}

.role-tag {
  display: flex;
  align-self: center;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 0 5px;
  height: 20px;
  border-radius: 5px;
  font-size: x-small;
  margin-left: 10px;
}

.role-tag.user {
  background-color: #cecece;
}

.role-tag.admin {
  background-color: cadetblue;
}

.margin-0 {
  margin: 0 !important;
}

.gap {
  column-gap: 10px;
  row-gap: 10px;
}

.align-bottom {
  align-items: flex-end;
}
</style>
