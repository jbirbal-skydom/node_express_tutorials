<template>
  <div class="pull_Create">
    <h1>{{ msg }}</h1>

    <input type="email" name="email" v-model="email" placeholder="email" />

    <input
      type="password"
      name="password"
      v-model="password"
      placeholder="password"
    />

    <br />
    <button @click="get">Register</button>
  </div>
</template>

<script>
import getReq from "@/services/getReq";
export default {
  name: "Pull_Req",
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
    async get() {
      const response = await getReq.reqSend({
        email: this.email,
        password: this.password,
      });
      console.log(response);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
