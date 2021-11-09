<template>
  <v-card>
    <v-card-title> Change Password </v-card-title>
    <v-divider></v-divider>
    <v-form v-model="valid" lazy-validation>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="old_password"
              label="Old Password*"
              type="password"
              required
              :rules="passwordRules"
              outlined
              dense
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              label="Password*"
              type="password"
              required
              :rules="passwordRules"
              outlined
              dense
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password_confirmation"
              label="Password Confirmation*"
              type="password"
              required
              :rules="passwordConfirmationRules"
              outlined
              dense
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          text
          :loading="loading"
          @click.stop="$emit('close-dialog')"
          >Close</v-btn
        >
        <v-btn color="primary" text :loading="loading" @click.stop="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "BaseChangePassword",
  data() {
    return {
      valid: false,
      loading: false,
      old_password: "",
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
      password_confirmation: "",
      passwordConfirmationRules: [
        (v) => !!v || "Password is required",
        (v) => this.password === v || "Confirm Password must match Password.",
      ],
    };
  },
  methods: {
    ...mapActions({
      UPDATE_USER: "user/UPDATE_USER",
    }),
    async save() {
      try {
        this.loading = true;
        await this.UPDATE_USER({
          old_password: this.old_password,
          password: this.password,
        });
        this.$notification.success(
          "You have successfully updated your password.",
        );
      } catch (err) {
        console.error(err);
        this.$notification.error(`Encountered error changing password: ${err}`);
      } finally {
        this.old_password = "";
        this.password = "";
        this.password_confirmation = "";
        this.loading = false;
        this.$emit("close-dialog");
      }
    },
  },
};
</script>
