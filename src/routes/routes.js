import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import LoginLayout from "@/pages/Layout/LoginLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Users from "@/pages/Users.vue";
import EditUser from "@/pages/EditUser.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import Rooms from "@/pages/Rooms.vue";
import EditRoom from "@/pages/EditRoom.vue";
import Schedule from "@/pages/Schedule.vue";
import ScheduleList from "@/pages/ScheduleList.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/login",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
      },
      {
        path: "user/:id",
        name: "Editar Usuário",
        component: EditUser,
      },
      {
        path: "users",
        name: "Users",
        component: Users,
      },
      {
        path: "room",
        name: "Salas",
        component: Rooms,
      },
      {
        path: "room/:id",
        name: "Editar Sala",
        component: EditRoom,
      },
      {
        path: "schedule",
        name: "Agendamento",
        component: Schedule,
      },
      {
        path: "schedule-list",
        name: "Meus Agendamentos",
        component: ScheduleList,
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography,
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons,
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true,
        },
        component: Maps,
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications,
      },
      {
        path: "upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO,
      },
    ],
  },
  {
    path: "/login",
    component: LoginLayout,
  },
];

export default routes;
