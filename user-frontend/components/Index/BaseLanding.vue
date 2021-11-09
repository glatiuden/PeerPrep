<template>
  <div>
    <v-row
      class="app-max-width mx-auto fill-height"
      align="center"
      justify="space-around"
    >
      <v-col class="px-8 my-4 my-sm-8" cols="12" sm="5">
        <div class="text-center text-md-left">
          <h1 class="text-h3 font-weight-bold">
            Welcome to
            <span class="primary--text">PeerPrep </span>
          </h1>
          <br />
          <p class="text-body-1">
            A peer support system, collaborative whiteboard-style programming
            platform to prepare for your
            <b class="primary--text">next technical interview</b>!
          </p>
          <v-btn
            color="primary"
            class="font-weight-bold white--text rounded-lg my-2"
            large
            depressed
            @click="$router.push('/register')"
          >
            Start Your Experience Now
          </v-btn>
        </div>
      </v-col>
      <v-col align="center" cols="12" sm="5">
        <Lottie
          class="my-auto"
          :options="defaultOptions"
          :width="is_mobile ? 200 : 450"
        />
      </v-col>
    </v-row>

    <div class="section-color">
      <v-row
        class="app-max-width mx-auto fill-height"
        align="center"
        justify="space-around"
      >
        <v-col cols="5">
          <v-img :src="require('@/assets/pair-programming.png')" />
        </v-col>
        <v-col
          cols="12"
          sm="5"
          class="my-auto"
          :align="small_screen ? 'center' : 'left'"
        >
          <h1>Why PeerPrep?</h1>
          <p class="text-subtitle-1">
            Pair programming may progressively improve one’s algorithmic design
            capability and eventually, one’s confidence.
          </p>
          <p class="text-subtitle-1">
            You can find a suitable partner either via similar level, determined
            by your <u>Elo</u>, or via the question chosen. The choice is all
            yours!
          </p>

          <v-btn
            depressed
            large
            color="primary"
            class="rounded-lg white--text"
            @click="$router.push('/login')"
          >
            Find Your Match
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div class="text-center app-max-width mx-auto my-12">
      <h1 class="my-3">Features of PeerPrep</h1>
      <v-row>
        <v-col>
          <v-card elevation="0">
            <v-card-title class="d-flex justify-center">
              <v-avatar tile color="primary" size="70">
                <v-icon color="white" large>
                  mdi-frequently-asked-questions
                </v-icon>
              </v-avatar>
            </v-card-title>
            <v-card-subtitle class="mt-2 black--text">
              <h2>Question Bank</h2>
            </v-card-subtitle>
            <v-card-text>
              Curated questions from popular online competitive programming
              platforms for you to practice!
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="0">
            <v-card-title class="d-flex justify-center">
              <v-avatar tile color="primary" size="70">
                <v-icon color="white" large> mdi-handshake </v-icon>
              </v-avatar>
            </v-card-title>
            <v-card-subtitle class="mt-2 black--text">
              <h2>Pair Programming</h2>
            </v-card-subtitle>
            <v-card-text>
              Solve the challenging technical question <b>LIVE</b>, with a
              partner on the similar levels!
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="0">
            <v-card-title class="d-flex justify-center">
              <v-avatar tile color="primary" size="70">
                <v-icon color="white" large> mdi-av-timer </v-icon>
              </v-avatar>
            </v-card-title>
            <v-card-subtitle class="mt-2 black--text">
              <h2>Timed Challenge</h2>
            </v-card-subtitle>
            <v-card-text>
              Challenge to finish the technical question within the recommended
              time limit to improve yourself!
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div class="primary white--text d-flex justify-center py-8">
      <v-row justify="center" align="center">
        <v-col cols="10" sm="8" class="fill-height" align="center">
          <v-icon class="my-2" x-large color="white">
            mdi-crosshairs-question
          </v-icon>

          <div class="text-h6 text-sm-h4 white--text mb-4">
            Time is Ticking! Start Practicing Now!
          </div>

          <v-btn
            class="rounded-lg"
            outlined
            depressed
            :large="!is_mobile"
            color="white"
            width="40%"
            @click="$router.push('/login')"
          >
            Start Now
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import systemMixin from "@/mixins/system";

import animationData from "@/assets/programming-lottie.json";

export default {
  name: "BaseLanding",
  mixins: [systemMixin],
  data() {
    return {
      defaultOptions: { animationData, loop: true },
    };
  },
};
</script>
