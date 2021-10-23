<template>
  <v-navigation-drawer
    v-model="drawer"
    class="soft-box-shadow"
    :clipped="false"
    fixed
    app
  >
    <v-list dense nav>
      <v-list-item three-line class="align-left">
        <v-img
          :src="require('~/assets/logo.png')"
          :height="35"
          :width="200"
          contain
        />
        <v-spacer></v-spacer>
      </v-list-item>

      <v-divider></v-divider>

      <span v-for="(nav, i) in nav_items" :key="`list-item-${i}`">
        <v-list-group
          v-if="nav.children && nav.children.length > 0"
          no-action
          class="my-2"
          :value="i === 1"
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>{{ nav.title || "Others" }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <span
            v-for="(nav_child, child_index) in nav.children"
            :key="`list-item-child-${child_index}`"
          >
            <v-list-group
              v-if="nav_child.children && nav_child.children.length > 0"
              no-action
              class="my-2"
              sub-group
              :prepend-icon="false"
            >
              <template #activator>
                <v-list-item-content>
                  <v-list-item-title>{{ nav_child.title }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>$expand</v-icon>
                </v-list-item-icon>
              </template>

              <span
                v-for="(
                  nav_inner_child, child_inner_index
                ) in nav_child.children"
                :key="`list-item-inner_child-${child_inner_index}`"
              >
                <v-list-item
                  :to="nav_inner_child.to"
                  :href="nav_inner_child.href"
                  target="blank"
                  exact
                >
                  <v-list-item-action class="nav-action-icon">
                    <v-icon>{{ nav_inner_child.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title class="nav-title">{{
                      nav_inner_child.title
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </span>
            </v-list-group>
            <v-list-item
              v-else-if="nav_child.super_admin_only ? should_show_tab : true"
              :to="nav_child.to"
              :href="nav_child.href"
              target="blank"
              exact
            >
              <v-list-item-action class="nav-action-icon">
                <v-icon>{{ nav_child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="nav-title">{{
                  nav_child.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </span>
        </v-list-group>
        <v-list-item
          v-else-if="nav.super_admin_only ? should_show_tab : true"
          :key="i"
          :to="nav.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ nav.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="nav.title" />
          </v-list-item-content>
        </v-list-item>
      </span>
    </v-list>

    <template #append>
      <div class="pa-2">
        <v-btn color="primary" depressed large block>
          <v-icon left>mdi-logout</v-icon>Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import systemMixin from "@/mixins/system";

export default {
  mixins: [systemMixin],
  data() {
    return {
      drawer: true,
      src: "",
      nav_items: [
        {
          id: "home",
          icon: "mdi-view-dashboard-outline",
          title: "Dashboard",
          to: "/",
        },
        {
          id: "user",
          icon: "mdi-account-group",
          title: "Users",
          to: "/users",
        },
        {
          id: "question",
          icon: "mdi-text-box-multiple-outline",
          title: "Questions",
          to: "/question",
        },
        {
          id: "match",
          icon: "mdi-file-document-multiple-outline",
          title: "Matches",
          to: "/match",
        },
        {
          id: "match",
          icon: "mdi-file-document-multiple-outline",
          title: "Editors",
          to: "/editor",
        },
      ],
    };
  },
};
</script>

<style scoped>
.side-nav.image {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url("https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg");
  background-position: center center;
}
</style>
