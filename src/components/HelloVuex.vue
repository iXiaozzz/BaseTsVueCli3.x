<template>
  <div class="hello-vuex">
    <h1></h1>
    <h2>子组件如下：</h2>
    <div>
      <button @click.stop="changeCount(1)">+</button>
      <span class="count">{{ getterCount }}</span>
      <button @click.stop="changeCount(0)">-</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
@Component({
  components: {}
})
export default class componentName extends Vue {
  // @Prop(type)private propName = propValue;
  // private variableName: typeName = variableValue;
  @Getter("count") getterCount;
  @Action("updateCount") actionUpdateCount;

  public changeCount(type: number) {
    let getterCount: number = this.getterCount;
    getterCount = type ? ++getterCount : --getterCount < 0 ? 0 : getterCount;
    this.actionUpdateCount(getterCount);
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
