<template>
  <div class="register">
    <img alt="Vue logo" src="../assets/logo.png" />
    <RegisterDiv msg="Register" />
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterDiv from "@/components/RegisterDiv.vue";

export default {
  name: "Register",
  components: {
    RegisterDiv,
  },
};
</script>
