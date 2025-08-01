import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/home/HomePage.vue";
import SignUp from "@/components/sign-up/Sign-up.vue";
import LogIn from "@/components/log-in/Log-in.vue";
import MainMenu from "@/components/main-menu/Main-Menu.vue";
import AddCrop from "@/components/manage-crops/AddCrop.vue";
import ViewCrop from "@/components/manage-crops/ViewCrop.vue";
import AddTask from "@/components/manage-tasks/AddTask.vue";
import ViewTask from "@/components/manage-tasks/ViewTask.vue";
import InfoUser from "@/components/info-user/InfoUser.vue";
import RegisteredPlants from "@/components/registered-plants/RegisteredPlants.vue";
import Guias from "@/components/Guias/Guias.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/log-in",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/main-menu",
    name: "MainMenu",
    component: MainMenu,
  },
  {
    path: "/add-crop",
    name: "AddCrop",
    component: AddCrop,
  },
  {
    path : "/view-crop",
    name: "ViewCrop",
    component: ViewCrop,
  },
  {
    path: "/add-task",
    name: "AddTask",
    component: AddTask,
  },
  {
    path : "/view-task",
    name: "ViewTask",
    component: ViewTask,
  },
  {
    path : "/info-user",
    name: "InfoUser",
    component: InfoUser,
  },
  {
    path: "/Registered-Plants",
    name: "RegisteredPlants",
    component: RegisteredPlants,
  },
  {
    path: "/guias",
    name: "Guias",
    component: Guias,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
