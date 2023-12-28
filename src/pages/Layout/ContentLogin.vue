<template>
  <transition name="fade" mode="out-in">
    <Login/>
  </transition>
</template>
<script>
import Login from "@/pages/Login/Login.vue";
export default {
  components: {
    Login,
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
