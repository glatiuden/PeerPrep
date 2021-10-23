<template>
  <v-container fill-height class="background-url">
    <v-layout fill-height>
      <v-row align="stretch">
        <v-spacer></v-spacer>
        <v-col cols="12" lg="6" class="my-auto">
          <v-container
            :class="{
              'white soft-box-shadow py-12': small_screen || is_medium_screen,
            }"
          >
            <div class="py-3">
              <div
                class="
                  text-h6 text-sm-h4
                  d-flex
                  primary--text
                  justify-center
                  text-center
                "
              >
                Welcome to&nbsp;<b>PeerPrep</b>
              </div>

              <span
                class="text-body-2 d-flex justify-center text-center mt-1 mb-5"
              >
                Sign in now to explore our technical interview resources
              </span>
            </div>
            <v-form v-model="valid">
              <v-row class="d-flex text-center justify-center">
                <v-col cols="12" sm="9" md="9" lg="9" xl="8">
                  <v-text-field
                    v-model="login_user.email"
                    label="Email Address"
                    name="login"
                    :loading="loading"
                    prepend-inner-icon="mdi-email-outline"
                    type="text"
                    outlined
                    dense
                    required
                    hide-details="auto"
                    :rules="email_rules"
                  />
                </v-col>
                <v-col cols="12" sm="9" md="9" lg="9" xl="8">
                  <v-text-field
                    id="password"
                    v-model="login_user.password"
                    :type="view_password ? 'text' : 'password'"
                    label="Password"
                    name="password"
                    :loading="loading"
                    prepend-inner-icon="mdi-lock-outline"
                    outlined
                    dense
                    required
                    hide-details="auto"
                    :rules="password_rules"
                  >
                    <template #append>
                      <v-slide-x-reverse-transition mode="out-in">
                        <v-icon
                          :key="`icon-${view_password}`"
                          :color="view_password ? 'grey' : 'primary'"
                          @click="view_password = !view_password"
                          v-text="
                            view_password
                              ? 'mdi-eye-off-outline'
                              : 'mdi-eye-outline'
                          "
                        ></v-icon>
                      </v-slide-x-reverse-transition>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col class="py-0" cols="12" sm="9" md="9" lg="9" xl="8">
                  <v-spacer></v-spacer>
                  <span
                    class="
                      text-caption text-uppercase
                      primary--text
                      clickable
                      float-right
                    "
                  >
                    Forget password
                  </span>
                </v-col>

                <v-col cols="12" sm="9" md="9" lg="9" xl="8">
                  <v-btn
                    class="d-flex my-4 button"
                    color="primary"
                    :loading="loading"
                    large
                    depressed
                    :disabled="!valid"
                    block
                    @click="login"
                  >
                    <span>Sign In</span>
                  </v-btn>

                  <span class="pt-5 text-caption tnc-text">
                    Don't have an account?
                    <v-btn
                      class="pa-2 mb-1"
                      depressed
                      text
                      small
                      color="primary"
                      href="/register"
                      >Sign up
                    </v-btn>
                  </span>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>
<script>
import systemMixin from "@/mixins/system";
import userMixin from "@/mixins/user";
import animationData from "@/assets/searching-lottie.json";

export default {
  name: "Login",
  mixins: [systemMixin, userMixin],
  data() {
    return {
      valid: false,
      login_user: {
        email: undefined,
        password: undefined,
      },
      view_password: false,
      email_rules: [
        (v) => !!v || "Email Address is required",
        (v) => /.+@.+\..+/.test(v) || "Email Address must be valid.",
      ],
      password_rules: [(v) => !!v || "Required"],
      defaultOptions: { animationData, loop: true },
    };
  },
  methods: {
    async login() {
      try {
        await this.LOGIN_USER(this.login_user);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
<style scoped>
.background-url {
  background: url("../assets/background.png") no-repeat center center fixed !important;
  background-size: cover;
}
</style>
