import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const consulting = r => require.ensure([], () => r(require('@/page/consulting')), 'consulting');
const consultinged = r => require.ensure([], () => r(require('@/page/consultinged')), 'consultinged');
const application = r => require.ensure([], () => r(require('@/page/application')), 'application');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const serviceRequirements = r => require.ensure([], () => r(require('@/page/serviceRequirements')), 'serviceRequirements');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
            path: '',
            component: consulting,
            meta: [ '咨询列表'],
        },{
            path: '/consultinged',
            component: consultinged,
            meta: [ '咨询已完成列表'],
        },{
			path: '/userList',
			component: userList,
			meta: [ '用户列表'],
		},{
			path: '/consulting',
			component: consulting,
			meta: ['咨询列表'],
		},{
			path: '/application',
			component: application,
			meta: ['提现申请'],
		},{
            path: '/serviceRequirements',
            component: serviceRequirements,
            meta: ['服务需求'],
        },{
			path: '/adminSet',
			component: adminSet,
			meta: ['系统设置', '员工列表'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
