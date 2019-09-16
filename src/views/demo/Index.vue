<template>
  <div>hello ts.</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
// import  from '@/components/ .vue'
@Component({
  components: {}
})
export default class componentName extends Vue {
  // @Prop(type)private propName = propValue;
  // private variableName: typeName = variableValue;
  // public methodName() {
  // }
}
</script>
<style lang="less" scoped></style>