<template>
  <v-card>
    <v-card-title> Change Display Name </v-card-title>
    <v-divider></v-divider>
    <v-form v-model="valid" lazy-validation>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              :value="user.email"
              label="Email"
              required
              outlined
              dense
              disabled
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="display_name"
              label="Display Name"
              required
              :rules="display_name_rules"
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
          :loading="change_loading"
          @click.stop="$emit('close-dialog')"
          >Close</v-btn
        >
        <v-btn
          color="primary"
          text
          :loading="change_loading"
          @click.stop="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import userMixin from "@/mixins/user";

export default {
  name: "BaseChangeDisplayName",
  mixins: [userMixin],
  props: {
    dialog: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      valid: false,
      change_loading: false,
      display_name: "",
      display_name_rules: [(v) => !!v || "Display name is required"],
    };
  },
  mounted() {
    if (this.user) {
      this.display_name = this.user.display_name;
    }
  },
  methods: {
    async save() {
      try {
        this.change_loading = true;
        await this.UPDATE_USER({
          display_name: this.display_name,
        });
        this.$notification.success(
          "You have successfully updated your profile.",
        );
        await this.AUTH_USER();
      } catch (err) {
        console.error(err);
        this.$notification.error(
          `Encountered error changing display name: ${err}`,
        );
      } finally {
        this.change_loading = false;
        this.$emit("close-dialog");
      }
    },
  },
};
</script>
