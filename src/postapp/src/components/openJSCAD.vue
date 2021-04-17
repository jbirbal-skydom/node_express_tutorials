<template>
  <div class="JSCAD">
    <h1>{{ msg }}</h1>
    <br />
    <button>Register</button>
    <openJSCADviewer file="solid"> </openJSCADviewer>
  </div>
</template>

<script>
import openJSCADviewer from "@/components/openJSCADviewer";
export default {
  name: "openJSCAD",
  props: {
    msg: String,
  },
  components: {
    openJSCADviewer,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
