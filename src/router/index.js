import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";
// 引入路由
// import Login from "../views/Login/Login.vue";

const routes = [
  {
    // 根目录
    path: "/",
    //重新定向
    redirect:"index"
  },
  {
    path: "/index",
    name: "Index",
    component: () =>import("../views/Login/index.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
