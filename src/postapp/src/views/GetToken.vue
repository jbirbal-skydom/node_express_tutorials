<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Token msg="Get Token" />
  </div>
</template>

<script>
// @ is an alias to /src
import Token from "@/components/Token.vue";

export default {
  name: "GetToken",
  components: {
    Token,
  },
};
</script>
