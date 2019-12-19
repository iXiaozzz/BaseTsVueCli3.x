<template>
  <div class="about">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <h1>vuex的使用如下：</h1>
    <h2>父组件：</h2>
    <div>
      <button @click.stop="changeCount(1)">+</button>
      <span class="count">{{ getterCount }}</span>
      <button @click.stop="changeCount(0)">-</button>
    </div>
    <hello-vuex></hello-vuex>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import HelloVuex from "@/components/HelloVuex.vue";
import Api from "@/api/index";

@Component({
  components: { HelloVuex }
})
export default class About extends Vue {
  /** props */

  // @Prop({ required: true }) isShow!: boolean;
  // @Prop(type) private propName = propValue;
  // private variableName: typeName = variableValue;

  /** data*/
  private msg: string = "hello world";
  @Getter("count") getterCount;
  @Action("updateCount") actionUpdateCount;

  private created() {
    this.test();
  }
  /** methods*/
  private changeCount(type: number) {
    let getterCount: number = this.getterCount;
    getterCount = type ? ++getterCount : --getterCount < 0 ? 0 : getterCount;
    this.actionUpdateCount(getterCount);
  }
  private test() {
    let a: number = 1;
    let b: number = a / 100;
    console.log(`this is test`);
  }
}
</script>
<style lang="less" scoped>
.count {
  padding: 0.03rem 0.1rem;
  font-size: 0.34rem;
}
button {
  font-size: 0.34rem;
}
h1 {
  color: #4cb4e7;
  padding: 0.2rem 0;
}
h2 {
  padding: 0.5rem 0;
}
</style>
