<template>
  <v-card class="rounded-lg soft-box-shadow px-2">
    <v-card-title
      class="level-body text-uppercase font-weight-bold d-flex mt-1"
    >
      <v-icon color="#FF9529" class="mr-1">mdi-star-circle</v-icon>
      Elo
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text class="pb-5">
      <v-card
        class="rounded-lg justify-center"
        color="light_primary"
        elevation="0"
      >
        <v-card-text class="py-5">
          <h3 class="text-uppercase">Grandmaster</h3>
          <v-progress-linear
            class="my-3"
            color="primary"
            height="5"
            :value="50"
          ></v-progress-linear>
          <span class="level-caption text-uppercase"> Level 5 </span>
          <span class="level-caption float-right">
            <b>500</b>/<span class="grey--text">1000</span>
          </span>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>
<script>
import userMixin from "@/mixins/user";

export default {
  name: "BaseElo",
  mixins: [userMixin],
};
</script>
<style>
.level-caption {
  font-size: 13px;
  color: black;
}

.level-body {
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.25px;
}
</style>
