<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <openJSCAD msg="JScad" />
  </div>
</template>

<script>
// @ is an alias to /src
import openJSCAD from "@/components/openJSCAD.vue";

export default {
  name: "JScad",
  components: {
    openJSCAD,
  },
};
</script>
