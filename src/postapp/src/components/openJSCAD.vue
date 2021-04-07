<template>
  <div class="JSCAD">
    <h1>{{ msg }}</h1>
    <br />
    <button>Register</button>
  </div>
</template>

<script>
export default {
  name: "openJSCAD",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
