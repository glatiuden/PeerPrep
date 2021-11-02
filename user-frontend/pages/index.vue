<template>
  <div>
    <BaseDashboard v-if="has_user" />
    <BaseLanding v-else class="pt-6" />
  </div>
</template>

<script>
import systemMixin from "@/mixins/system";
import userMixin from "@/mixins/user";

import BaseLanding from "@/components/Index/BaseLanding";
import BaseDashboard from "@/components/Index/BaseDashboard";

export default {
  name: "Index",
  components: { BaseLanding, BaseDashboard },
  mixins: [systemMixin, userMixin],
};
</script>
