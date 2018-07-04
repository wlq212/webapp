<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container" style="margin-top: -20px;">
            <div class="formInput">
                <div style="margin-top: 15px;">
                    <el-input placeholder="请输入手机号或者姓名" v-model="condition" class="input-with-select" prefix-icon="el-icon-search">
                        <el-button slot="append" icon="el-icon-search" @click="serach()">查询</el-button>
                    </el-input>
                </div>
            </div>
            <el-table
			    :data="tableData"
			    @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
			    style="width: 100%">
			    <el-table-column type="expand">
			      <template scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
			          <el-form-item label="申请时间" >
			            <span>{{ props.row.time }}</span>
			          </el-form-item>
			          <el-form-item label="提问用户">
			            <span>{{ props.row.phone }}</span>
			          </el-form-item>
			          <el-form-item label="姓名">
			            <span>{{ props.row.name }}</span>
			          </el-form-item>
			          <el-form-item label="提现银行">
			            <span>{{ props.row. bank_name }}</span>
			          </el-form-item>
			          <el-form-item label="提现账号">
			            <span>{{ props.row.card_no }}</span>
			          </el-form-item>
                        <el-form-item label="提现金额">
                            <span>{{ props.row.money*100 }}</span>
                        </el-form-item>
                        <el-form-item label="状态">
                            <span>{{ props.row.status }}</span>
                        </el-form-item>
			        </el-form>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="申请时间"
			      prop="time">
			    </el-table-column>
			    <el-table-column
			      label="提问用户"
			      prop="phone">
			    </el-table-column>
			    <el-table-column
			      label="姓名"
			      prop="name">
			    </el-table-column>
                <el-table-column
                    label="提现银行"
                    prop="bank_name">
                </el-table-column>
                <el-table-column
                    label="提现账号"
                    prop="card_no">
                </el-table-column>
                <el-table-column
                    label="提现金额"
                    prop="money">
                </el-table-column>
                <el-table-column
                    label="状态"
                   >
                    <template scope="scope">
                        {{scope.row.status==0?"待审核":scope.row.status==1?"支付完成":"支付失败"}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    prop="status">
                    <template scope="scope">
                        <el-button
                            size="mini" v-if=""
                            @click="withdrawOne(scope.row,1)" v-if="scope.row.status==0">支付完成</el-button>
                        <el-button
                            size="mini"
                            type="Success"
                            @click="withdrawOne(scope.row,2)" v-if="scope.row.status==0">拒绝</el-button>
                    </template>
                </el-table-column>
			</el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {withdraw,serach,withdrawPost} from '@/api/getData'
    import api from '@/assets/Api'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 1,
                limit: 20,
                count: 0,
                condition:"",
                selectModel:"",
                input23:"",
                currentPage: 1,
                restaurant_id: null,
                expendRow: [],
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        mounted(){

        },
        methods: {
            async initData(){
                try{
                    this.getOrders();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.offset = val;
                this.getOrders()
            },
            async getOrders(){
                var _this=this;
                const Orders = await withdraw({staff_id:JSON.parse(api.getStore("adminInfo")).staff_id,token:JSON.parse(api.getStore("adminInfo")).token,page:this.offset,page_range:this.limit});
                this.tableData = [];
                if(Orders.error_no==0) {
                    this.count = Orders.data.total;
                    Orders.data.records.forEach((item, index) => {
                        const tableData = {};
                        tableData.withdraw_id = item.withdraw_id;
                        tableData.time = item.time;
                        tableData.phone = item.phone;
                        tableData.name = item.name;
                        tableData.bank_name = item.bank_name;
                        tableData.card_no = item.card_no;
                        tableData.money = item.money;
                        tableData.status = item.status;
                        this.tableData.push(tableData);
                    })
                }else{
                    if(Orders.error_no==9){
                        api.removeStore("adminInfo");
                        _this.$router.push('/');
                    }
                    if(Orders.data.error_no==4){
                        this.$message({
                            type: 'error',
                            message: '数据不存在'
                        })
                    }else{
                        this.$message({
                            type: 'error',
                            message: '查询失败'
                        })
                    }

                }
            },
            async serach(){
                var _this=this;
                this.count=0;
                const Orders = await serach({staff_id:JSON.parse(api.getStore("adminInfo")).staff_id,token:JSON.parse(api.getStore("adminInfo")).token,condition:this.condition,page:this.offset,page_range:this.limit});
                this.tableData = [];
                if(Orders.error_no==0){
                    this.count= Orders.data.total;
                    Orders.data.records.forEach((item, index) => {
                        const tableData = {};
                        tableData.withdraw_id = item.withdraw_id;
                        tableData.time = item.time;
                        tableData.phone = item.phone;
                        tableData.name = item.name;
                        tableData.bank_name = item.bank_name;
                        tableData.card_no = item.card_no;
                        tableData.money = item.money;
                        tableData.status =item.status;
                        this.tableData.push(tableData);
                    })
                }else{
                    if(Orders.error_no==9){
                        api.removeStore("adminInfo");
                        that.$message({
                            type: 'error',
                            message: 'toke过期'
                        })
                        _this.$router.push('/');
                    }
                    this.$message({
                        type: 'error',
                        message: '查询失败'
                    })
                }

            },
            async expand(row, status){
            	if (status) {
            		const restaurant = await getResturantDetail(row.restaurant_id);
	            	const userInfo = await getUserInfo(row.user_id);
	            	const addressInfo = await getAddressById(row.address_id);
	                this.tableData.splice(row.index, 1, {...row, ...{restaurant_name: restaurant.name, restaurant_address: restaurant.address, address: addressInfo.address, user_name: userInfo.username}});
                    this.$nextTick(() => {
                        this.expendRow.push(row.index);
                    })
	            }else{
                    const index = this.expendRow.indexOf(row.index);
                    this.expendRow.splice(index, 1)
                }
            },
            async withdrawOne(row, status){
                const withdraw_id=row.withdraw_id;
                const res = await withdrawPost({staff_id:JSON.parse(api.getStore("adminInfo")).staff_id,token:JSON.parse(api.getStore("adminInfo")).token,withdraw_id:withdraw_id,status:status})
                if(res.error_no==0){
                    this.$message({
                        type: 'success',
                        message: '审核成功'
                    })
                    this.getOrders();
                }else{
                    this.$message({
                        type: 'error',
                        message: '审核失败'
                    })
                }
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
    .demo-table-expand {
	    font-size: 0;
	}
	.demo-table-expand label {
	    width: 90px;
	    color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
	    margin-right: 0;
	    margin-bottom: 0;
	    width: 50%;
	}
    .formInput{
        width:30%;
        margin: 20px 0;
    }
    .optionSelected{
        width:110px;
    }
</style>
