<template>
  <v-app-bar
    color="background"
    class="app-bar soft-box-shadow"
    app
    clipped-left
  >
    <v-app-bar-nav-icon
      @click="$emit('update-drawer', true)"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-menu
      v-if="false"
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template #activator="{ attrs, on }">
        <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
          <v-badge color="red" overlap bordered>
            <template #badge>
              <span>5</span>
            </template>

            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list :tile="false" nav>
        <div>
          <app-bar-item v-for="(n, i) in notifications" :key="`item-${i}`">
            <v-list-item-title v-text="n" />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { VHover, VListItem } from "vuetify/lib";

export default {
  name: "TheAppBar",
  components: {
    AppBarItem: {
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    "black--text": !hover,
                    "white--text secondary elevation-12": hover,
                  },
                  props: {
                    activeClass: "",
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                },
                this.$slots.default,
              );
            },
          },
        });
      },
    },
  },
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
