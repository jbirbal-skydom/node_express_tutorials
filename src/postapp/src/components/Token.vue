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

    <div id="box">
      <p style="white-space: pre-line">token:</p>
      {{ token }}
    </div>

    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthService from "@/services/WP_Auth";
export default {
  name: "Token",
  props: {
    msg: String,
  },

  data() {
    return {
      email: "skydom",
      password: "toor",
      token: " ",
    };
  },

  /*   watch: {
    email(value) {
      console.log("email has changed", value);
    },
  }, */

  methods: {
    async register() {
      try {
        const response = await AuthService.register({
          username: this.email,
          password: this.password,
        });
        this.token = response.data.token;
        console.log(response.data.token);
      } catch (e) {
        console.log(e);
        console.log(e.response.status);
        console.log(e.response);
        this.token = e.response.data.message;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
