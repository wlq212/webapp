import Vue from 'vue'
import Router from 'vue-router'
const manage = r => require.ensure([], () => r(require('@/components/manage')), 'manage');
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/manage',
      name: 'manage',
      component: manage
    },
    {
      path: '/',
      redirect: 'manage'
    }

  ]
})
