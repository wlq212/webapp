<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container" style="margin-top: -20px;">
            <div class="formInput">
                <div style="margin-top: 15px;">
                    <el-input placeholder="请输入内容" v-model="input23" class="input-with-select" prefix-icon="el-icon-search">
                        <el-select v-model="selectModel" class="optionSelected" slot="prepend"  placeholder="请选择">
                            <el-option label="餐厅名" value="1"></el-option>
                            <el-option label="订单号" value="2"></el-option>
                            <el-option label="用户电话" value="3"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" >查询</el-button>
                    </el-input>
                </div>
            </div>
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="100" label="序号">
                </el-table-column>
                <el-table-column
                  property="registe_time"
                  label="提问用户"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="username"
                  label="姓名"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="city"
                  label="历史提问">
                </el-table-column>
                <el-table-column
                    property="city"
                    label="累计赔付金额">
                </el-table-column>
                <el-table-column
                    property="city"
                    label="评价次数">
                </el-table-column>
                <el-table-column
                    property="city"
                    label="账号状态">
                </el-table-column>
                <el-table-column
                    property="city"
                    label="跟进备注">
                </el-table-column>
                <el-table-column
                    property="city"
                    label="操作">
                    <template scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">取消置顶</el-button>
                        <el-button
                            size="mini"
                            type="Success"
                            @click="addFood(scope.$index, scope.row)">禁用账号</el-button>
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
    import {getUserList, getUserCount} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [{
                  registe_time: '2016-05-02',
                  username: '王小虎',
                  city: '上海市普陀区金沙江路 1518 弄'
                }, {
                  registe_time: '2016-05-04',
                  username: '王小虎',
                  city: '上海市普陀区金沙江路 1517 弄'
                }, {
                  registe_time: '2016-05-01',
                  username: '王小虎',
                  city: '上海市普陀区金沙江路 1519 弄'
                }, {
                  registe_time: '2016-05-03',
                  username: '王小虎',
                  city: '上海市普陀区金沙江路 1516 弄'
                }],
                currentRow: null,
                input23:"",
                selectModel:"",
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const countData = await getUserCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getUsers();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers()
            },
            async getUsers(){
                const Users = await getUserList({offset: this.offset, limit: this.limit});
                this.tableData = [];
                Users.forEach(item => {
                    const tableData = {};
                    tableData.username = item.username;
                    tableData.registe_time = item.registe_time;
                    tableData.city = item.city;
                    this.tableData.push(tableData);
                })
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
    .formInput{
        width:30%;
        margin: 20px 0;
    }
    .optionSelected{
        width:110px;
    }
</style>
