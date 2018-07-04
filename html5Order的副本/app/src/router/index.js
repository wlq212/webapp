import Vue from 'vue'
import Router from 'vue-router'
const manage = r => require.ensure([], () => r(require('@/components/manage')), 'manage');
const Index = r => require.ensure([], () => r(require('@/components/Index')), 'Index');
const image = r => require.ensure([], () => r(require('@/components/image')), 'image');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/manage',
      name: 'manage',
      component: manage
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
    {
     path:"/image" ,
      name:'image',
      component: image
    },
    {
      path: '/',
      redirect: 'Index'
    }

  ]
})
