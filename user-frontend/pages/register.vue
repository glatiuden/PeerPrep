<template>
  <v-container
    fill-height
    :style="{
      backgroundImage: `url(${require('@/assets/background.png')}`,
    }"
  >
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
                Sign up now to explore our technical interview resources
              </span>
            </div>
            <v-form v-model="valid">
              <v-row class="d-flex text-center justify-center">
                <v-col cols="12" sm="9" md="9" lg="9" xl="8">
                  <v-text-field
                    v-model="register_user.display_name"
                    label="Display Name"
                    name="login"
                    :loading="loading"
                    prepend-inner-icon="mdi-account-outline"
                    type="text"
                    outlined
                    dense
                    required
                    hide-details="auto"
                    :rules="display_name_rules"
                  />
                </v-col>

                <v-col cols="12" sm="9" md="9" lg="9" xl="8">
                  <v-text-field
                    v-model="register_user.email"
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
                    v-model="register_user.password"
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

                <v-col cols="12" sm="9" md="9" lg="9" xl="8">
                  <v-text-field
                    id="confirm_password"
                    :type="view_password ? 'text' : 'password'"
                    label="Confirm Password"
                    :loading="loading"
                    prepend-inner-icon="mdi-lock-outline"
                    outlined
                    dense
                    required
                    :hide-details="auto"
                    :rules="confirm_password_rules"
                  >
                  </v-text-field>
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
                    @click="register"
                  >
                    <span>Sign Up</span>
                  </v-btn>

                  <span class="pt-5 text-caption tnc-text">
                    Already have an account?
                    <v-btn
                      class="pa-2 mb-1"
                      depressed
                      text
                      small
                      color="primary"
                      @click="$router.push('/login')"
                      >Sign In
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

export default {
  name: "Register",
  mixins: [systemMixin, userMixin],
  data() {
    return {
      valid: false,
      register_user: {
        display_name: undefined,
        email: undefined,
        password: undefined,
      },
      view_password: false,
      email_rules: [
        (v) => !!v || "Email Address is required",
        (v) => /.+@.+\..+/.test(v) || "Email Address must be valid.",
      ],
      display_name_rules: [(v) => !!v || "Display name is required"],
      password_rules: [(v) => !!v || "Password is required"],
      confirm_password_rules: [
        (v) => !!v || "Password is required",
        (v) =>
          this.register_user.password === v ||
          "Confirm Password must match Password.",
      ],
    };
  },
  mounted() {
    if (this.has_user) {
      this.$router.push("/");
    }
  },
  methods: {
    async register() {
      try {
        this.SET_LOADING({ data: true });
        await this.CREATE_USER({ user: this.register_user });
        this.$notification.success(
          `You have registered successfully! You can login with your credentials now. Redirect in 3 seconds...`,
        );
        setTimeout(() => {
          this.$router.push("/login");
        }, 3000);
      } catch (err) {
        console.error(err);
        this.$notification.error(`Encountered error registering: ${err}`);
      }
    },
  },
};
</script>
<style scoped>
.background_image {
  background: url("assets/background.png");
}
</style>
