<template>
  <div class="File_Create">
    <img alt="Vue logo" src="../assets/logo.png" />
    <File_Create msg="Save" />
  </div>
</template>

<script>
// @ is an alias to /src
import File_Create from "@/components/File_Create.vue";

export default {
  name: "Save",
  components: {
    File_Create,
  },
};
</script>
