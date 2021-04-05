<template>
  <div class="register">
    <h1>{{ msg }}</h1>

    <input type="email" name="email" v-model="email" placeholder="email" />

    <input
      type="password"
      name="password"
      v-model="password"
      placeholder="password"
    />

    <br />
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";
export default {
  name: "RegisterDiv",
  props: {
    msg: String,
  },

  data() {
    return {
      email: "@gmail",
      password: "1234",
    };
  },

  /*   watch: {
    email(value) {
      console.log("email has changed", value);
    },
  }, */

  methods: {
    async register() {
      const response = await AuthService.register({
        email: this.email,
        password: this.password,
      });
      console.log(response.data);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
