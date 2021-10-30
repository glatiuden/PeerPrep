<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="soft-box-shadow py-2">
          <v-card-title
            class="justify-center text-uppercase font-weight-bold pb-0"
          >
            Admin Panel
          </v-card-title>
          <v-form v-model="valid" class="mx-2" @submit.prevent>
            <v-card-text class="pb-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="login_user.email"
                    label="Email"
                    name="login"
                    prepend-inner-icon="mdi-email"
                    type="text"
                    outlined
                    dense
                    :rules="email_rules"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    id="password"
                    v-model="login_user.password"
                    label="Password"
                    name="password"
                    outlined
                    dense
                    prepend-inner-icon="mdi-lock"
                    :rules="password_rules"
                    type="password"
                    hide-details
                    @keyup.enter="login"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="py-4 mx-2">
              <v-btn
                color="primary"
                :loading="loading"
                :disabled="!valid"
                block
                depressed
                large
                @click="login"
                >Login</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import systemMixin from "@/mixins/system";
import authMixin from "@/mixins/auth";

export default {
  mixins: [systemMixin, authMixin],
  layout: "guest",
  data() {
    return {
      valid: false,
      login_user: {
        email: undefined,
        password: undefined,
      },
      email_rules: [
        (v) => !!v || "Email Address is required",
        (v) => /.+@.+\..+/.test(v) || "Email Address must be valid.",
      ],
      password_rules: [(v) => !!v || "Password is required"],
    };
  },
  mounted() {
    if (this.has_admin) {
      this.$router.push("/");
    }
  },
  methods: {
    async login() {
      try {
        this.SET_LOADING({ data: true });
        await this.LOGIN(this.login_user);
        if (this.has_admin) {
          this.$notification.success(
            `Welcome back to PeerPrep, ${this.admin.display_name}!`,
          );
          this.$router.push("/");
        }
      } catch (err) {
        console.error(err);
        this.$notification.error(`Encountered error logging in: ${err}`);
      } finally {
        this.SET_LOADING({ data: false });
      }
    },
  },
};
</script>
<style scoped>
.fill-height {
  background-image: url("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
