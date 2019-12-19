<template>
  <div class="learn-container">
    <div class="nav">
      <router-link to="/learn/vueEmit">vue的父子组件的传值问题</router-link>
      <router-link to="/learn/Vuex">Vuex的例子</router-link>
      <router-link to="/learn/vueApi">vue的api</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
// import  from '@/components/ .vue'
@Component({
  components: {}
})
export default class Learn extends Vue {
  // @Prop(type)private propName = propValue;
  // private variableName: typeName = variableValue;
  // public methodName() {
  // }
}
</script>
<style lang="less" scoped>
@import "../../style/index";
.learn-container {
  height: 100vh;
  .flex(flex-start, start);
  .nav {
    .flex-num(1);
    min-width: 280px;
    height: 100%;
    overflow-y: scroll;
    padding: 1rem 0.4rem 0;
    text-align: left;
    a {
      display: block;
      height: 0.6rem;
      line-height: 0.6rem;
      color: #666;
      .text-ellipsis;
    }
  }
  .content {
    .flex-num(6);
    height: 100%;
    padding: 0.6rem 0.3rem 0;
    text-align: left;
  }
}
</style>
