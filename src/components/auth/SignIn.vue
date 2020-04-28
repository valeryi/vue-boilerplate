<template>
  <div class="signIn-component">
    <form @submit.prevent="signInUser()">
      <input type="email" placeholder="Enter your email" v-model="formInput.email" />
      <input type="password" placeholder="Enter your password" v-model="formInput.password" />
      <button>Sign In</button>
    </form>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { createNamespacedHelpers } from "vuex";

const { mapActions } = createNamespacedHelpers("auth");

export default {
  data() {
    return {
      formInput: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    ...mapActions(["signIn"]),
    signInUser: function() {
      try {
        this.signIn(this.formInput).then(() => {
          this.$router.push({ name: "Home" }).catch(err => {});
        });
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};
</script>

<style></style>
