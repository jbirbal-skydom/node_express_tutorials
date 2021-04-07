/* eslint-disable */
// vue can not create file frontend framwork only => I'll try WP REST CRUD API
import wordpressAPI from "@/services/wordpressAPI";
export default {
  newFile(info) {
    console.log(info);
    // var data = JSON.stringify(info);

    wordpressAPI()
      .get("wp/v2/posts/1")
      .then(
        (response) => {
          this.info = response;
          this.name = response.data.slug;
          console.log(this.name);
        },
        (error) => {
          alert(error);
        }
      );

    return this.name;
  },
};
