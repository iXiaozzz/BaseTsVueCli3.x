<template>
  <div>
    {{ level }}
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {}
})
export default class componentName extends Vue {
  @Prop({ required: true })
  private level!: number;
  // 需要安装 vue-tsx-supportl
  // public render(createElement) {
  //   console.log(222);
  //   return createElement("h" + this.level, this.$slots.default);
  // }
  private created() {
    console.log("this is created.");
  }
}
</script>
<style lang="less" scoped></style>
