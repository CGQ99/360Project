import Vue from "vue";
import VueRouter from "vue-router";
import { getCookie } from "../plugins/cookie.js";
const Search = () => import("../views/search/search.vue");

const Home = () => import("../views/Home/index.vue");

const Shop = () => import("../views/shop/index.vue");

const MyIfo = () => import("../views/myInfo/MyIfo.vue");

const Order = () => import("../views/order/index.vue");

const UserInfo = () =>
  import("../views/myInfo/components/userInfo/UserInfo.vue");

const Address = () => import("../views/myInfo/components/Address/index.vue");

const ShopCart = () => import("../views/shopping/index.vue");

import store from "../store/index";

import { Message } from "element-ui";

Vue.use(VueRouter);
const origanPush = VueRouter.prototype.push;
const origanReplace = VueRouter.prototype.replace;
// 重写编程式路由push
VueRouter.prototype.push = function(location, onComplete = () => {}, onAbort) {
  return origanPush.call(this, location, onComplete, onAbort);
};
// 重写编程式路由replace
VueRouter.prototype.replace = function(
  location,
  onComplete = () => {},
  onAbort
) {
  return origanReplace.call(this, location, onComplete, onAbort);
};
const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/search/:key_word?",
    name: "search",
    component: Search
  },
  {
    path: "/shop",
    name: "shop",
    component: Shop
  },
  {
    path: "/myIfo",
    name: "myIfo",
    component: MyIfo,
    children: [
      {
        path: "/myIfo/userinfo",
        name: "userinfo",
        component: UserInfo
      },
      {
        path: "/myIfo/address",
        name: "Address",
        component: Address
      },
      {
        path: "/myIfo",
        redirect: "/myIfo/userinfo"
      }
    ]
  },
  {
    path: "/order",
    name: "Order",
    component: Order
  },
  {
    path: "/shopCart",
    name: "shopCart",
    component: ShopCart
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
// 定义一个需要登录才能跳转的的路劲的集合
const checkPaths = ["/myIfo", "/order", "/shopCart"];
router.beforeEach(async (to, from, next) => {
  const { username } = store.state.userInfo;
  const cookie1 = getCookie("Q");
  const cookie2 = getCookie("T");
  // 获取即将要进入的路径
  const toPath = to.path;
  // 获取需要检测的地址
  const needPaths = checkPaths.some(path => toPath.startsWith(path));

  // 判断有没有cookie
  if (cookie1 && cookie2) {
    try {
      await store.dispatch("getUserInfo");
      next();
      return;
    } catch (error) {
      Message.error("请重新登录");
      next("/");
      return;
    }
  }
  // 如果是登录状态随便跳转(判断是否有username)
  if (username) {
    next();
    return;
  }
  // 判断这个跳转的路径是否是需要登录才能跳转的路径
  if (!needPaths) {
    next();
    return;
  }
  next("/");

  /* if (userInfo.username) {
    next();
    return;
  }
  if (getCookie("Q") && getCookie("T")) {
    try {
      await store.dispatch("getUserInfo");
      next();
      return;
    } catch (error) {
      Message.error("请重新登录");
      next("/");
      return;
    }
  } else {
    next();
    return;
  } */
});
export default router;
