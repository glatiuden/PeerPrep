<template>
  <v-app-bar
    color="#FDFEFF"
    class="app-bar soft-box-shadow"
    :clipped-left="clipped"
    app
    clipped-right
  >
    <v-img
      :max-height="80"
      :max-width="160"
      contain
      :src="require('~/assets/logo.png')"
    />

    <v-tabs v-model="tab" align-with-title show-arrows class="ml-0 ml-sm-5">
      <template v-for="(nav, index) in nav_items">
        <v-menu
          v-if="nav.children && nav.children.length > 0"
          :key="index"
          open-on-hover
          bottom
          offset-y
          content-class="soft-box-shadow"
        >
          <template #activator="{ on, attrs }">
            <v-tab v-bind="attrs" :ripple="false" v-on="on">
              <v-icon small class="mr-1">{{ nav.icon }}</v-icon>
              <span class="black--text font-weight-bold">
                {{ nav.title }}
              </span>
              <v-icon v-if="!nav.no_chevron" class="ml-2" small>
                mdi-chevron-down
              </v-icon>
            </v-tab>
          </template>

          <v-list nav>
            <v-list-item
              v-for="(nav_child, child_index) in nav.children"
              :key="child_index"
              :to="nav_child.to"
              :disabled="nav_child.disabled"
              :href="nav_child.href"
              target="blank"
              exact
              color="#FDFEFF"
              class="rounded-0 menu-item"
              active-class="menu-item-active"
            >
              <v-icon
                :small="!nav_child.description"
                class="mr-3 menu-item-icon-color"
              >
                {{ nav_child.icon }}
              </v-icon>
              <v-list-item-content class="py-0">
                <v-list-item-title class="text-none">
                  <span class="menu-item-text">{{ nav_child.title }}</span>
                </v-list-item-title>

                <v-list-item-subtitle
                  v-if="nav_child.description"
                  class="text-none text-caption mt-1"
                >
                  <span class="kinobi-body">
                    {{ nav_child.description }}
                  </span>
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon v-if="nav_child.disabled">
                <v-icon small color="primary">mdi-lock</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-tab v-else-if="!nav.only_mobile" :key="index" :to="nav.to" exact>
          <v-icon small class="mr-1">{{ nav.icon }}</v-icon>
          <span class="black--text font-weight-bold">{{ nav.title }}</span>
        </v-tab>
      </template>
    </v-tabs>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  data() {
    return {
      tab: 0,
      clipped: false,
      fixed: false,
      rightDrawer: false,
      nav_items: [
        {
          id: "home",
          title: "Home",
          to: "/",
        },
        {
          id: "editor",
          title: "Editor",
          to: "/editor",
        },
      ],
    };
  },
};
</script>

<style scoped>
.app-bar {
  z-index: 50 !important;
  background-color: #fdfeff;
}

.app-bar-title {
  cursor: pointer;
  min-width: 70px;
}

.app-bar-text {
  color: #4f4f4f;
  font-size: 22px;
}

.app-bar-name {
  font-weight: bold;
}

.v-tab {
  text-transform: none;
  letter-spacing: 0.25px;
}

.tab-width {
  width: 150px;
}

.menu-item-text {
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.54);
}
.menu-item-active {
  border-bottom: 2px solid #355c7d;
}
.menu-item-icon-color {
  color: rgba(0, 0, 0, 0.54) !important;
}
</style>
