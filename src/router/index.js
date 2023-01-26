import { createRouter, createWebHistory } from "vue-router";

import { useTablesActions } from "@/stores/tables";
import { useUserStore } from "@/stores/user";

import DashboardView from "@/views/DashboardView.vue";
import TableView from "@/views/TableView.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
      children: [
        {
          path: "table/:id",
          component: TableView,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

router.beforeEach((to, _, next) => {
  const { isLoggedIn } = useUserStore();

  if (!isLoggedIn.value && to.name !== "login") return next({ name: "login" });
  else if (isLoggedIn.value && to.name === "login")
    return next({ name: "dashboard" });

  const { selectTable } = useTablesActions();
  selectTable(to.params?.id || null);
  next();
});

export default router;
