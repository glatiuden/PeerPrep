<template>
  <v-col>
    <v-card>
      <v-card-title>Create A New User</v-card-title>
      <v-card-text>
        <v-form v-model="valid_create">
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
    <div v-for="(user, index) in users" :key="index">
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
              <v-icon small class="mr-1">mdi-account-remove</v-icon>
              {{ user.editing ? "Cancel" : "Edit User" }}
            </v-btn>
            <v-btn color="primary" @click="deleteUser(user)">
              <v-icon small class="mr-1">mdi-account-remove</v-icon>
              Remove User
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text v-if="!user.editing">
          {{ user.email }}
        </v-card-text>
        <v-card-text v-if="user.editing">
          <v-form>
            <v-col cols="12" sm="9" md="9" lg="9" xl="8">
              <v-text-field
                v-model="user.email"
                label="Email Address"
                name="email"
                prepend-inner-icon="mdi-email-outline"
                type="email"
                outlined
                dense
                required
                hide-details="auto"
                :rules="email_rules"
              />
              <v-text-field
                label="Password"
                name="password"
                prepend-inner-icon="mdi-lock-outline"
                type="text"
                outlined
                dense
                required
                hide-details="true"
                :rules="required"
              />
            </v-col>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
    <v-btn @click="showSnackbar('hello', 'red')">snackbar</v-btn>
    <v-snackbar :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text @click="snackbar.show = false" v-bind="attrs">
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
      required: [(v) => !!v || "Required"],
      confirm_password_rules: [
        (v) => !!v || "Password is required",
        (v) =>
          this.new_user.password === v ||
          "Confirm Password must match Password.",
      ],
      valid_create: false,
      role_types: ["User", "Admin"],
      snackbar: {
        show: false,
        message: undefined,
        color: undefined,
      },
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    print(item) {
      console.log(item);
    },
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
    async fetchUsers() {
      try {
        this.SET_LOADING({ data: true });
        const users = await this.GET_USERS();
        this.users = users.map((user) => ({ ...user, editing: false }));
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
        console.log(user);
        const res = await this.DELETE_USER({ user_id: user._id });
        console.log(res);
      } catch (err) {
        console.error(err);
        this.showSnackbar("Error deleting user", "red");
      } finally {
        this.fetchUsers();
        this.SET_LOADING({ data: false });
        this.showSnackbar("Successfully deleted user", "green");
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
      } catch (err) {
        this.showSnackbar("Error creating user", "red");
        console.error(err);
      } finally {
        this.fetchUsers();
        this.SET_LOADING({ data: false });
        this.showSnackbar("Successfully created user", "green");
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
</style>
