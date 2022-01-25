import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/characters",
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("./components/NotFound.vue"),
  },
  // {
  //   path: "/characters",
  //   redirect: "/ramapi/characters",
  // },
  {
    path: "/characters",
    name: "characters",
    component: () => import("./components/characters/Characters.vue"),
  },
  {
    path: "/characters/:id",
    name: "character",
    component: () => import("./components/character/Character.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
