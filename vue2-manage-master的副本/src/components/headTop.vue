<template>
    <div class="header_container">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
        <span>当前在线客服：{{staffs}}人</span>
        <div>
            <span>我的状态</span>
            <select v-model="status" @change="onlinePosts()">
                <option value="0">在线</option>
                <option value="1">挂起</option>
                <option value="2">退出</option>
            </select>
        </div>
    </div>
</template>

<script>
	import {signout,onlineGet,onlinePost} from '@/api/getData'
	import {mapActions, mapState} from 'vuex'
    import api from '@/assets/Api'

    export default {
    	data(){
    		return {
                status:0,
                staffs:""
    		}
    	},
    	created(){
            this.$router.push('/');
    	    if(JSON.parse(api.getStore("adminInfo"))){
                this.$router.push('/manage');
            }else{
                this.$router.push('/');
            }
            this.onlineGetes()
    		if (!this.adminInfo.id) {
    		this.getAdminData().then(function (res) {
                console.log(res)
            })
    		}
    	},
    	computed: {
    		...mapState(['adminInfo']),
    	},
		methods: {
			...mapActions(['getAdminData']),
			async handleCommand(command) {
				if (command == 'home') {
					this.$router.push('/manage');
				}else if(command == 'singout'){
					const res = await signout()
					if (res.status == 1) {
						this.$message({
	                        type: 'success',
	                        message: '退出成功'
	                    });
	                    this.$router.push('/');
					}else{
						this.$message({
	                        type: 'error',
	                        message: res.message
	                    });
					}
				}
			},
            async onlineGetes(){
                var res=await onlineGet({staff_id:JSON.parse(api.getStore("adminInfo")).staff_id,token:JSON.parse(api.getStore("adminInfo")).token});
                if(res.error_no==0){
                    this.staffs=res.data.staffs;
                }
            },
            async onlinePosts(){
                var res=await onlinePost({staff_id:JSON.parse(api.getStore("adminInfo")).staff_id,token:JSON.parse(api.getStore("adminInfo")).token, option:this.status});
                if(res.error_no==0){
                    this.staffs=res.data.staffs;
                }
                if(this.status==2){
                    api.removeStore("adminInfo");
                    this.$router.push('/');
                }

            },

		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
