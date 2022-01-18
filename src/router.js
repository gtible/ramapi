import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/characters",
    name: "characters",
    component: () => import("./components/characters/Characters")
  },
  {
    path: "/characters/:id",
    name: "character",
    component: () => import("./components/character/Character"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;