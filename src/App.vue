<template>
  <div id="app">
    <ProgressBarComponent />
    <Toolbar />

    <router-view />
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar.vue";

export default {
  name: "App",
  components: {
    Toolbar,
  },
};
</script>

<style lang="scss">
@import "@/style/root.scss";
</style>
