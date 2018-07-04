import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/assets/Api'

Vue.use(Vuex)

const state = {
	adminInfo: {
		avatar: 'default.jpg'
	},
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	}
}

const actions = {
	async getAdminData({commit}){
		try{
		    var adminInfo=api.getStore("adminInfo");
			if (JSON.parse(adminInfo).staff_id) {
				commit('saveAdminInfo', JSON.parse(adminInfo));
			}else{
				throw new Error(res)
			}
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})
