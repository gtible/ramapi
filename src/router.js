import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/ramapi/",
    redirect: '/ramapi/characters',
  },
  {
    path: "/characters",
    redirect: '/ramapi/characters',
  },
  {
    path: "/ramapi/characters",
    name: "characters",
    component: () => import("./components/characters/Characters")
  },
  {
    path: "/ramapi/characters/:id",
    name: "character",
    component: () => import("./components/character/Character"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;