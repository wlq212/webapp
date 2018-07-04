<template>
    <div class="fillcontain">
        <head-top>

        </head-top>
        <div class="table_container" style="margin-top: -20px;">
            <div class="formInput" style="width:800px">
                <div style="margin-top: 15px;display: inline-block">
                    <el-input placeholder="手机号或者名字" v-model="serachTjInput" class="input-with-select" prefix-icon="el-icon-search">
                        <el-button slot="append" icon="el-icon-search" @click="searchTjOne()">查询</el-button>
                    </el-input>
                </div>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%;"
                @row-click="modelDetial">
                <el-table-column
                    label="提问时间"
                >
                    <template scope="scope">
                        {{scope.row.question_time}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="询问用户"
                    prop="phone" >
                </el-table-column>
                <el-table-column
                    label="姓名"
                    prop="name" >
                </el-table-column>
                <el-table-column
                    label="历史提问"
                    prop="history_questions">
                </el-table-column>
                <el-table-column
                    label="提问内容"
                    prop="title" >
                </el-table-column>
                <el-table-column
                    label="赔付状态"
                >
                    <template scope="scope">
                        {{scope.row.damage_status==0?"未赔付":"已赔付"}}
                    </template>
                </el-table-column>
                <el-table-column label="服务状态">
                    <template scope="scope">
                        {{"已经完成"}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="服务评价"
                    prop="comment" >
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
            <el-dialog title="问题详情" v-model="dialogFormDetial">
                <el-form>
                    <el-form-item label="问题Id" label-width="100px">
                        <el-input v-model="detail.id" ></el-input>
                    </el-form-item>
                    <el-form-item label="提问时间" label-width="100px">
                        <el-input v-model="detail.question_time" ></el-input>
                    </el-form-item>
                    <el-form-item label="询问用户" label-width="100px">
                        <el-input v-model="detail.phone" ></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" label-width="100px">
                        <el-input v-model="detail.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="历史提问" label-width="100px">
                        <el-input v-model="detail.history_questions" ></el-input>
                    </el-form-item>
                    <el-form-item label="提问内容标题" label-width="100px">
                        <el-input v-model="detail.title" ></el-input>
                    </el-form-item>
                    <el-form-item label="提问内容" label-width="100px">
                        <el-input v-model="detail.content" ></el-input>
                    </el-form-item>
                    <el-form-item label="赔付状态" label-width="100px">
                        <el-input v-model="detail.damage_status==0?'未赔付':'已赔付'" ></el-input>
                    </el-form-item>
                    <el-form-item label="服务状态" label-width="100px">
                        <el-input v-model="detail.status==0?'未开始':detail.status==1?'服务中':'已经完成'" ></el-input>
                    </el-form-item>
                    <el-form-item label="服务评价" label-width="100px">
                        <el-input v-model="detail.comment" ></el-input>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import api from '@/assets/Api'
    import {serachquestion,serachOldQuition,searchTj,update_question,add_answer} from '@/api/getData'
    export default {
        data(){
            return {
                input23:"",
                selectModel:"",
                city: {},
                offset: 1,
                limit: 20,
                count: 0,
                counts:0,
                countTj:0,
                countsTj:0,
                tableData: [],
                file:" ",
                activeOne:1,
                questions_id:"",
                tableTwo:false,
                tableOne:true,
                tableOneTj:false,
                tableTwoTj:false,
                currentPage: 1,
                currentPageTj:1,
                currentPages:1,
                currentPagesTj:1,
                selectTable: {avatar:""},
                dialogFormVisible: false,
                tableDatas:[],
                dialogFormVisibleadd:false,
                categoryOptions: [],
                selectedCategory: [],
                address: {},
                serachTjInput:"",
                question_type:"1",
                intervals:"",
                detail:"",
                dialogFormDetial:false
            }
        },
        created(){
            this.initData();
        },
        components: {
            headTop,
        },
        methods: {
            async initData(){
                var that=this;
                that.getOldResturants();
            },
            add0(m){return m<10?'0'+m:m },
            //时间戳转化成时间格式
            timeFormat(timestamp){
                //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
                return new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                if(this.serachTjInput){
                    this.currentPageTj = val;
                    this.searchTjOne();
                }else{
                    this.currentPage = val;
                    this.getOldResturants();
                }

            },
            modelDetial(data){
                event.cancelBubble = true;
                this.dialogFormDetial=true;
                this.detail=data;
                this.detail.timesc=this.timeDefference(data.start_time,data.end_time)
            },
            async getOldResturants(){
                var that=this;
                const restaurants = await serachOldQuition({staff_id:JSON.parse(api.getStore("adminInfo")).staff_id,token:JSON.parse(api.getStore("adminInfo")).token,page:this.currentPage,page_range:this.limit});
                console.log(restaurants)
                this.tableData = [];
                if(restaurants.error_no==0) {
                    that.count = restaurants.data.total;
                    restaurants.data.questions.forEach(item => {
                        const tableData = {};
                        tableData.name = item.name;
                        tableData.id = item.question_id;
                        tableData.start_time = item.start_time;
                        tableData.end_time = item.end_time;
                        tableData.timestamp = item.timestamp;
                        tableData.question_time=item.question_time;
                        tableData.history_questions=item.history_questions;
                        tableData.phone = item.phone;
                        tableData.title = item.title;
                        tableData.content = item.content;
                        tableData.comment = item.comment;
                        tableData.answer_id = item.answer_id;
                        tableData.answer = item.answer;
                        tableData.damage_status = item.damage_status;
                        tableData.status = item.status;
                        this.tableData.push(tableData);
                    })
                }else{
                    that.count = 0;
                    if(restaurants.data.error_no==4){
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
            timeDefference(startTime, endTime) {
                var t2 = new Date(startTime*1000);
                var t1 = new Date(endTime*1000);
                var result1,result2,result3,result4,result5,result6;
                if (t1.getFullYear() - t2.getFullYear() > 0) {
                    result1= (t1.getFullYear() - t2.getFullYear())+"年";
                }else {
                    result1="0年";
                }
                if (t1.getMonth() - t2.getMonth() > 0) {
                    result2 = (t1.getMonth() - t2.getMonth())+"月";
                }else{
                    result2="0月";
                }
                if (t1.getDate() - t2.getDate() > 0) {
                    result3 =(t1.getDate() - t2.getDate())+"日";

                }else{
                    result3="0日";
                }
                if (t1.getHours() - t2.getHours() > 0) {
                    result4 =(t1.getHours() - t2.getHours())+"小时";

                }else{
                    result4="0时";
                }
                if (t1.getMinutes() - t2.getMinutes() > 0) {
                    result5 =(t1.getMinutes() - t2.getMinutes())+"分钟";
                }else{
                    result5="0分";
                }
                if (t1.getSeconds() - t2.getSeconds() > 0) {
                    result6 =(t1.getSeconds() - t2.getSeconds())+"秒";
                }else{
                    result6="0秒";
                }
                return  result4+":"+result5+":"+result6;

            },
            async searchTjOne(){
                var that=this;
                    const restaurants = await searchTj({staff_id:JSON.parse(api.getStore("adminInfo")).staff_id,token:JSON.parse(api.getStore("adminInfo")).token,condition:this.serachTjInput,question_type:0,page:this.currentPageTj,page_range:this.limit});
                    this.tableData = [];
                    if(restaurants.error_no==0){
                        that.count = restaurants.data.total;;
                        restaurants.data.questions.forEach(item => {
                            const tableData = {};
                            tableData.name = item.name;
                            tableData.id = item.question_id;
                            tableData.start_time=item.start_time;
                            tableData.end_time=item.end_time;
                            tableData. timestamp=item. timestamp;
                            tableData.phone=item.phone;
                            tableData.title=item.title;
                            tableData.question_time=item.question_time;
                            tableData.history_questions=item.history_questions;
                            tableData.content=item.content;
                            tableData.comment=item.comment;
                            tableData.answer_id=item.answer_id;
                            tableData.answer=item.answer;
                            tableData.damage_status=item.damage_status;
                            tableData.status=item.status;
                            that.tableData.push(tableData);
                        })

                    }else{
                        that.count = 0;
                        if(restaurants.error_no==4){
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


        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .active{
        border: 1px solid #54BDF9;
        color: #54BDF9;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .el-table .warning-row {
        background: oldlace;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
    .formInput{
        width:30%;
        margin: 20px 0;
    }
    .optionSelected{
        width:110px;
    }
</style>
