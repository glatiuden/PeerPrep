<template>
  <v-menu bottom :offset-y="true" max-width="21rem">
    <template #activator="{ on: menu, attrs }">
      <v-btn
        v-bind="attrs"
        :small="is_mobile"
        icon
        class="mx-1 mx-sm-2"
        v-on="{ ...menu }"
      >
        <avatar
          :size="is_mobile ? 24 : 36"
          :name="getAvatarName(admin || {})"
          :username="getAvatarName(admin || {})"
          background-color="#E4EDF4"
          color="primary"
        />
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-avatar
          class="clickable"
          @click="$router.push(`/profile/${admin._id}`)"
        >
          <avatar
            :size="56"
            :name="getAvatarName(admin || {})"
            :username="getAvatarName(admin || {})"
            background-color="#E4EDF4"
            color="primary"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="title-info">
            {{ admin.display_name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <p class="subtitle-job-title">
              {{ admin.email }}
            </p>
            <span>
              Joined on
              {{ formatDate(admin.created_at, "DD MMMM YYYY") }}
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    <v-list class="pt-0">
      <v-list-item
        :dense="is_mobile"
        class="menu-item clickable"
        @click="LOGOUT()"
      >
        <v-list-item-icon class="mr-4">
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> Logout </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import systemMixin from "@/mixins/system";
import authMixin from "@/mixins/auth";

export default {
  name: "BaseProfile",
  mixins: [systemMixin, authMixin],
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
<style scoped>
.item-info {
  position: relative;
}
.item-info__activator {
  position: absolute;
  bottom: -5px;
  left: 25px;
}
.title-info {
  font-weight: 600;
  font-size: 1.25rem;
  color: #121f2a;
}
.menu-item:hover {
  background-color: #f2f6fa;
}

.indent-item {
  padding-left: 56px;
}
</style>
