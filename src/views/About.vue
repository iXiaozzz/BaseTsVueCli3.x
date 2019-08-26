<template>
  <div class="about">
    <div>this is about pages.</div>
    <div>{{ msg }}</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Api from "@/api/index";
// import  from '@/components/ .vue'
@Component({
  components: {}
})
export default class componentName extends Vue {
  /** props */

  // @Prop({ required: true }) isShow!: boolean;
  // @Prop(type) private propName = propValue;
  // private variableName: typeName = variableValue;

  /** data*/
  msg: string = "hello world";
  /** methods*/
  public created() {
    this.test();
    Api.requestTestList({ customerId: 20340 }).then(res => {});
  }
  public test() {
    let a: number = 1;
    let b: number = a / 100;
    console.log(`this is test`);
  }
}
</script>
