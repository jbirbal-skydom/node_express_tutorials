<template>
  <div class="home">
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
