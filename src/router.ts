import Vue from 'vue'
import Router from 'vue-router'
const Home = (r: any) => (require as any).ensure([], () => r(require("@/views/Home"), "Home")); // 新建
const TestCenter = (r: any) => (require as any).ensure([], () => r(require("@/views/testCenter/Index"), "testCenter")); // 新建
const About = (r: any) => (require as any).ensure([], () => r(require("@/views/About"), "About"));
// const Home = () => import('@/views/Home')
// const TestCenter = () => import('@/views/testCenter/Index')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    },
    {
      path: '/testCenter',
      name: 'TestCenter',
      component: TestCenter,
      meta: {
        title: "typescript base项目"
      }
    }
  ]
})
