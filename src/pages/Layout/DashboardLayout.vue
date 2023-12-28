<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/users" v-if="this.typeUser === 2">
        <md-icon>person</md-icon>
        <p>Usuários</p>
      </sidebar-link>
      <sidebar-link to="/room" v-if="this.typeUser === 2">
        <md-icon>library_books</md-icon>
        <p>Salas</p>
      </sidebar-link>
      <sidebar-link to="/schedule" v-if="this.typeUser === 1">
        <md-icon>schedule</md-icon>
        <p>Agendar com Consultor</p>
      </sidebar-link>
      <sidebar-link to="/schedule-list">
        <md-icon>density_small</md-icon>
        <p>Minha Agenda</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin
        :color.sync="sidebarBackground"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";
import { loginApi } from "@/api/login";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    FixedPlugin,
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
      typeUser: null,
    };
  },
  async mounted() {
    await loginApi.me(this);

    const user = JSON.parse(localStorage.getItem("user"));

    this.typeUser = user.type;
  },
};
</script>
