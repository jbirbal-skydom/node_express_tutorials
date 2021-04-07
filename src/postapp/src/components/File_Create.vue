<template>
  <div class="pull_Create">
    <div id="vue-app">
      <form>
        <p style="white-space: pre-line">name: {{ name }}</p>
        <input type="text" v-model="name" /><br />
        <p style="white-space: pre-line">last: {{ last }}</p>
        <input type="text" v-model="last" /><br />
        <p style="white-space: pre-line">Index: {{ index }}</p>
        <input type="text" v-model="index" /><br />
        <select v-model="grade">
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>

        <span> grade: {{ grade }} </span>

        <br />
        <button type="button" v-on:click="add()">Add To Table</button>
        <button type="button" v-on:click="saveFile()">saveFile</button>
      </form>
      <table border="5">
        <thead>
          <td>Name</td>
          <td>Last Name</td>
          <td>Index</td>
          <td>Grade</td>
        </thead>
        <tbody>
          <tr v-for="x in arr" :key="x">
            <td>{{ x.first }}</td>
            <td>{{ x.lastn }}</td>
            <td>{{ x.index }}</td>
            <td>{{ x.grade }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
      name: "",
      last: "",
      index: 0,
      grade: 0,
      arr: [],
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

    add: function () {
      this.arr.push({
        first: this.name,
        lastn: this.last,
        index: this.index,
        grade: this.grade,
      });
      console.log(1);
    },

    saveFile: function () {
      const data = JSON.stringify(this.arr);
      window.localStorage.setItem("arr", data);
      console.log(JSON.parse(window.localStorage.getItem("arr")));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
