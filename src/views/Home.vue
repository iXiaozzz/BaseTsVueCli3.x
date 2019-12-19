<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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
  private created() {
    console.log(Err.undefined);
    console.log(`hello world.`)
  }
}
</script>
