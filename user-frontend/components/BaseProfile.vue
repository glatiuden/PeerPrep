<template>
  <div>
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
            :name="getAvatarName(user || {})"
            :username="getAvatarName(user || {})"
            background-color="#E4EDF4"
            color="primary"
          />
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-avatar
            class="clickable"
            @click="$router.push(`/profile/${user._id}`)"
          >
            <avatar
              :size="56"
              :name="getAvatarName(user || {})"
              :username="getAvatarName(user || {})"
              background-color="#E4EDF4"
              color="primary"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="title-info">
              {{ user.display_name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <p class="subtitle-job-title">
                {{ user.email }}
              </p>
              <span>
                Joined on
                {{ formatDate(user.created_at, "DD MMMM YYYY") }}
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
          @click="$router.push('/')"
        >
          <v-list-item-icon class="mr-4">
            <v-icon>mdi-face-man-profile</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> View My Profile </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :dense="is_mobile"
          class="menu-item clickable"
          @click="openDialog"
        >
          <v-list-item-icon class="mr-4">
            <v-icon>mdi-lock</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Change Password </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item
          :dense="is_mobile"
          class="menu-item clickable"
          @click="LOGOUT_USER()"
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
    <v-dialog v-model="dialog" max-width="600px">
      <BaseChangePassword @close-dialog="closeDialog" />
    </v-dialog>
  </div>
</template>

<script>
import BaseChangePassword from "@/components/BaseChangePassword";

import systemMixin from "@/mixins/system";
import userMixin from "@/mixins/user";

export default {
  name: "BaseProfile",
  components: { BaseChangePassword },
  mixins: [systemMixin, userMixin],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    /**
     * @description open change password dialog
     */
    openDialog() {
      this.dialog = true;
    },
    /**
     * @description close change password dialog
     */
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>
