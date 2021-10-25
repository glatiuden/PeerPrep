<template>
  <v-card class="rounded-lg soft-box-shadow">
    <v-card-text>
      <v-card class="rounded-lg justify-center light_primary" elevation="0">
        <v-card-text class="py-5 d-flex justify-center">
          <v-avatar size="120">
            <avatar
              :size="100"
              :name="getAvatarName(user || {})"
              :username="getAvatarName(user || {})"
              background-color="#E4EDF4"
              color="#44759F"
            />
          </v-avatar>
        </v-card-text>
      </v-card>
      <div class="d-flex justify-center">
        <h2 class="text-center my-3">
          {{ user.display_name }}
        </h2>
        <v-btn icon class="my-auto"><v-icon>mdi-pencil</v-icon></v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import systemMixins from "@/mixins/system";
import userMixin from "@/mixins/user";

export default {
  name: "BaseAvatar",
  mixins: [systemMixins, userMixin],
};
</script>

<style scoped>
.avatar-card {
  background-color: rgba(53, 92, 125, 0.2);
}
</style>
