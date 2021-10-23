<template>
  <div>
    <BaseProfile v-if="has_user" />
    <BaseLanding v-else class="pt-6" />
  </div>
</template>

<script>
import systemMixin from "@/mixins/system";
import userMixin from "@/mixins/user";

import BaseLanding from "@/components/Index/BaseLanding";
import BaseProfile from "@/components/Profile/BaseProfile";

export default {
  name: "Index",
  components: { BaseLanding, BaseProfile },
  mixins: [systemMixin, userMixin],
};
</script>
