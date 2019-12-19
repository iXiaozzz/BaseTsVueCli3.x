import Vue from "vue";
import "vant/lib/index.css";
import "swiper/dist/css/swiper.css";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import { Dialog } from "vant";
import Utils from "./utils/index";

Vue.config.productionTip = false;
// 全局注册, 组件使用dialog
Vue.use(Dialog);
Vue.prototype.$utils = Utils;
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
// Todo app 发版本自动修改版本号
Vue.prototype.GLOBAL = {
  appVersion: "1.0.0"
};
// 金额过滤器
Vue.filter("money", function(value: number): string {
  if (typeof value !== "number") return "";
  return parseFloat((value / 100).toLocaleString()).toFixed(2);
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
