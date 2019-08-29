<template>
  <div>
    <hello-render :level="level">23324</hello-render>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HelloRender from "@/components/HelloRender.vue";
@Component({
  components: { HelloRender }
})
export default class componentName extends Vue {
  /**data */
  private level = 1;
  private render(createElement) {
    return createElement("h" + this.level, this.$slots.default);
  }
}
</script>
<style lang="less" scoped></style>
