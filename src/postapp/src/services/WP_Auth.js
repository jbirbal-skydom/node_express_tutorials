/* eslint-disable */
// vue can not create file frontend framwork only => I'll try WP REST CRUD API
import wordpressAPI from "@/services/wordpressAPI";
export default {
  register(credentials) {
    return wordpressAPI().post("jwt-auth/v1/token", credentials);
  },
};
