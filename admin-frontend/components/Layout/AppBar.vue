<template>
  <v-app-bar
    color="background"
    class="app-bar soft-box-shadow"
    app
    clipped-left
  >
    <v-app-bar-nav-icon
      @click="SET_SHOW_DRAWER({ data: true })"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <BaseProfile />
  </v-app-bar>
</template>

<script>
import systemMixin from "@/mixins/system";
import BaseProfile from "@/components/Layout/BaseProfile";

export default {
  name: "TheAppBar",
  components: { BaseProfile },
  mixins: [systemMixin],
  data() {
    return {
      notifications: [
        "Mike John Responded to your email",
        "You have 5 new tasks",
        "You're now friends with Andrew",
        "Another Notification",
        "Another one",
      ],
      clipped: false,
      fixed: false,
      rightDrawer: false,
      title: "PeerPrep",
    };
  },
};
</script>
