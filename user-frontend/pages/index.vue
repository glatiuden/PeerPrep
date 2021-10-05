<template>
  <div class="py-6">
    <v-row class="d-flex" justify="space-around">
      <v-col cols="12" sm="5">
        <Lottie
          class="my-auto"
          :options="defaultOptions"
          :height="is_mobile ? 170 : 400"
          :width="is_mobile ? 170 : 400"
        />
      </v-col>
      <v-col
        cols="12"
        sm="5"
        class="my-auto"
        :align="small_screen ? 'center' : 'left'"
      >
        <h1>Welcome to PeerPrep</h1>
        <p class="text-subtitle-1">
          A peer support system, collaborative whiteboard-style programming to
          practice challenging
          <b class="primary--text">Technical Interviews</b>!
        </p>

        <v-btn
          depressed
          large
          color="primary"
          class="rounded-lg white--text"
          @click="$router.push('/question')"
        >
          Start Your Experience
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="d-flex" justify="space-around">
      <v-spacer></v-spacer>
      <v-col
        cols="12"
        sm="5"
        class="my-auto"
        :align="small_screen ? 'center' : 'left'"
      >
        <h1>Why PeerPrep?</h1>
        <p class="text-subtitle-1">
          Having a platform to allow pair programming may progressively improve
          one’s algorithmic design capability and eventually, one’s confidence.
        </p>

        <v-btn
          depressed
          large
          color="primary"
          class="rounded-lg white--text"
          @click="$router.push('/question')"
        >
          Find Your Match
        </v-btn>
      </v-col>
      <v-col cols="5">
        <v-img :src="require('@/assets/pair-programming.png')" contain />
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";
import animationData from "@/assets/programming-lottie.json";

export default {
  name: "BaseQuestions",
  mixins: [systemMixins],
  data() {
    return {
      defaultOptions: { animationData, loop: true },
    };
  },
};
</script>
