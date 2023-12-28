<template>
  <div
    class="md-display-1"
    style="display: flex; justify-content: center; align-content: center"
  >
    <div class="md-alignment-center-center" style="width: 50%">
      <notifications></notifications>
      <content-login> </content-login>
    </div>
  </div>
</template>

<script>
import ContentFooter from "./ContentFooter.vue";
import ContentLogin from "./ContentLogin.vue";

export default {
  components: {
    ContentLogin,
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
    };
  },
};
</script>
