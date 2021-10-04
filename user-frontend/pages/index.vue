<template>
  <div class="py-10">
    <v-row class="d-flex" justify="space-around">
      <v-col cols="12" sm="5"> </v-col>
      <v-col
        cols="12"
        sm="5"
        class="my-auto"
        :align="small_screen ? 'center' : 'left'"
      >
        <h1>Welcome to PeerPrep</h1>
        <span class="text-subtitle-1">
          A peer support system, collaborative whiteboard-style programming to
          practice
          <b class="primary--text">Technical Interviews</b>
        </span>

        <div class="text-subtitle-1 my-4">
          <span class="kinobi-body break-word"> </span>
        </div>

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
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";

export default {
  name: "BaseQuestions",
  mixins: [systemMixins],
};
</script>
