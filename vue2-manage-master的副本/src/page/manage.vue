<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="consulting" v-if="role==2||role==0"><i class="el-icon-menu"></i>咨询列表</el-menu-item>
                    <el-menu-item index="consultinged" v-if="role==2||role==0"><i class="el-icon-menu"></i>咨询已完成列表</el-menu-item>
                   <!-- <el-menu-item index="userList"><i class="el-icon-menu"></i>用户列表</el-menu-item>-->
                    <el-menu-item index="application" v-if="role==1||role==0"><i class="el-icon-menu"></i>提现申请</el-menu-item>
                   <!-- <el-menu-item index="serviceRequirements"><i class="el-icon-menu"></i>服务需求</el-menu-item>-->
                    <el-submenu index="6" v-if="role==0">
                        <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
                        <el-menu-item index="adminSet">员工列表</el-menu-item>
                    </el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    import api from '@/assets/Api'
    export default {
        data() {
            return {
                role:""
            }
        },
        created(){
            this.initData();
        },
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
        methods: {
            initData(){
                console.log(api.getStore("adminInfo"))
                this.role=JSON.parse(api.getStore("adminInfo")).role;
            }
        }
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
