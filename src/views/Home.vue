<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>父组件与子组件传值问题：</h1>
    <h2>父组件如下：</h2>
    <div>
      <button @click.stop="changeCount(1)">+</button>
      <span class="count">{{ count }}</span>
      <button @click.stop="changeCount(0)">-</button>
    </div>
    <h2>子组件：</h2>
    <HelloWorld
      msg="Welcome to Your Vue.js + TypeScript App"
      :count="count"
      @updateCount="updateCount"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
enum Err {
  undefined = -1,
  null = 0,
  success = 1
}
@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  /**data */
  private count: number = 0;
  // @Getter("message") message: string;
  @Getter("username") getterUsername;
  @Action("updateUserName") actionUpdateUsername;
  private created() {
    this.actionUpdateUsername("hello");
    console.log(this.getterUsername);
  }
  /**methods */
  private updateCount(count: number) {
    this.count = count;
  }
  private changeCount(type: number) {
    type
      ? ++this.count
      : --this.count < 0
      ? (this.count = 0)
      : (this.count = this.count);
  }
}
</script>
<style lang="less" scoped>
.home {
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
}
</style>
