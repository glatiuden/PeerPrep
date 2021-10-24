<template>
  <v-skeleton-loader
    v-if="loading"
    type="table-heading, table-tbody, table-tfoot"
  >
  </v-skeleton-loader>
  <div v-else>Thank you</div>
</template>
<script>
export default {};
</script>
