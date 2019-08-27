<template>
  <div class="hello">
    <!-- <h3>this is hello world.</h3> -->
    <div>
      <button @click.stop="changeCount(1)">+</button>
      <span class="count">{{ count }}</span>
      <button @click.stop="changeCount(0)">-</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop()
  private msg!: string;
  @Prop()
  private count!: number;
  /**data */
  private subCount: number = this.count;
  @Watch("count")
  private watchCount(newV: number, oldV: number) {
    this.subCount = newV;
  }
  /**methods */
  private changeCount(type: number) {
    type
      ? ++this.subCount
      : --this.subCount < 0
      ? (this.subCount = 0)
      : (this.subCount = this.subCount);
    this.$emit("updateCount", this.subCount);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  .count {
    padding: 0.03rem 0.1rem;
    font-size: 0.34rem;
  }
  button {
    font-size: 0.34rem;
  }
  h1 {
    padding: 0.5rem 0;
  }
}
</style>
