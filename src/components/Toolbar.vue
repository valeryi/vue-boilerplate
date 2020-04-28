<template>
  <div class="toolbar-component">
    <div class="logo">
      <h3>Logo</h3>
    </div>
    <ul class="top-nav">
      <li v-for="(route, index) in routes" :key="index">
        <router-link :to="route.path">{{ route.name }}</router-link>
      </li>
    </ul>

    <div class="spacer"></div>

    <ul class="user-nav">
      <li>
        <router-link v-if="!isAuthenticated" :to="'/sign-in'">Sign In</router-link>
      </li>
      <li>
        <router-link v-if="!isAuthenticated" :to="'/sign-up'">Sign Up</router-link>
      </li>
      <div v-if="isAuthenticated">
        <div class="user">
          <span class="picture"></span>
          <span class="w-message">
            Hello,
            <span class="user-name">{{userInfo.firstName}}</span>
          </span>
        </div>
      </div>
      <li>
        <!-- TODO: Update DOM => User Menu after F5 refresh and SignOut -->
        <a v-if="isAuthenticated" href="#" @click.prevent="signOut">Sign Out</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        { path: "/", name: "Home" },
        { path: "/users", name: "Users" }
      ]
    };
  },
  methods: {
    signOut: function() {
      this.$store.commit("auth/signOutUser");
      this.$router.push("/sign-in");
    }
  },
  computed: {
    isAuthenticated: function() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    userInfo: function() {
      return {
        ...this.$store.getters["users/getAuthUser"]
      };
    }
  }
};
</script>

<style lang="scss">
@import "@/style/components/toolbar.scss";
</style>
