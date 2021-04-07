<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Pull_Req msg="get" />
  </div>
</template>

<script>
// @ is an alias to /src
import Pull_Req from "@/components/Pull_Req.vue";

export default {
  name: "Pull",
  components: {
    Pull_Req,
  },
};
</script>
