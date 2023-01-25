import { createRouter, createWebHistory } from "vue-router";

import { useTablesActions } from "@/stores/tables";

import DashboardView from "@/views/DashboardView.vue";
import TableView from "@/views/TableView.vue";

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
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

router.beforeEach((to) => {
  const { selectTable } = useTablesActions();
  selectTable(to.params?.id || null);
});

export default router;
