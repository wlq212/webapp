<template>
    <div class="fillcontain">
        <head-top>

        </head-top>
        <div class="table_container" style="margin-top: -20px;">
            <div style="margin-bottom: 50px;">
            <div style="margin-bottom: 10px;">服务中</div>
            <el-table
                    :data="tableDatas"
                    style="width: 100%;height:150px;overflow: auto;"
                    @row-click="modelDetial">
                    <el-table-column
                        label="提问时间"
                        width="180">
                        <template scope="scope">
                            {{scope.row.question_time}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="询问用户"
                        prop="phone"  width="150" >
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
                            {{scope.row.status==0?"未开始":scope.row.status==1?"服务中":"已经完成"}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"   width="180">
                        <template scope="scope">
                            <el-button
                                size="mini"
                                @click="update_questiones(scope.row,1)" v-if="scope.row.status==0">开始服务</el-button>
                            <el-button
                                size="mini"
                                type="Success"
                                @click="update_questiones(scope.row,2)" v-if="scope.row.status==1">结束服务</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="add_answeresModel(scope.row)"  v-if="scope.row.status==1">记录答案</el-button>
                        </template>
                    </el-table-column>
                </el-table>
        </div>

            <div style="margin-bottom: 50px;margin-top: -30px;">
                <div style="margin-bottom: 10px;">未完成</div>
                <el-table
                    :data="tableData"
                    style="width: 100%;height:410px;overflow: auto;"
                    @row-click="modelDetial">
                    <el-table-column
                        label="提问时间"
                        width="180">
                        <template scope="scope">
                            {{scope.row.question_time}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="询问用户"
                        prop="phone" width="150"  >
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
                        label="剩余解答时间"
                        width="180">
                        <template scope="scope">
                            {{timeDefference(scope.row.timestamp,scope.row.end_time)}}
                        </template>
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
                            {{scope.row.status==0?"未开始":scope.row.status==1?"服务中":"已经完成"}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"    width="180">
                        <template scope="scope">
                            <el-button
                                size="mini"
                                @click="update_questionesNum(scope.row,1)" v-if="scope.row.status==0">开始服务</el-button>
                            <el-button
                                size="mini"
                                type="Success"
                                @click="update_questiones(scope.row,0)" v-if="scope.row.status==1">结束服务</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="add_answeresModel(scope.row)"  v-if="scope.row.status==1">记录答案</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <el-dialog title="问题回复" v-model="dialogFormVisibleadd">
                <el-form>
                    <el-form-item label="提问内容" label-width="100px">
                        <el-input v-model="title" type="textarea" rows="3" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="内容" label-width="100px">
                        <el-input v-model="content" type="textarea" rows="10"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibleadd = false">取 消</el-button>
                    <el-button type="primary" @click="add_answeres()">确 定</el-button>
                </div>
            </el-dialog>
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
                    <el-form-item label="答案" label-width="100px">
                        <el-input v-model="detail.answer" ></el-input>
                    </el-form-item>
                    <el-form-item label="提问内容" label-width="100px">
                        <el-input v-model="detail.content" ></el-input>
                    </el-form-item>
                    <el-form-item label="剩余解答时间" label-width="100px">
                        <el-input v-model="detail.timesc" ></el-input>
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
    import {serachquestion,serachOldQuition,searchTj,update_question,add_answer,serachOldQuitiones} from '@/api/getData'
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
                that.getResturants();
                that.getOldResturants();
                try{
                   that.intervals=setInterval(function () {
                        that.getResturants();
                       that.getOldResturants();
                    },1000)
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
             add0(m){return m<10?'0'+m:m },
            //时间戳转化成时间格式
           timeFormat(timestamp){
                //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
               return new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
            },


            modelDetial(data){
                event.cancelBubble = true;
                this.dialogFormDetial=true;
                this.detail=data;
                this.detail.timesc=this.timeDefference(data.start_time,data.end_time)
            },
            async getResturants(){
                var that=this;
                const restaurants = await serachquestion({staff_id:JSON.parse(api.getStore("adminInfo")).staff_id,token:JSON.parse(api.getStore("adminInfo")).token});
                this.tableData = [];
                if(restaurants.error_no==0) {
                    this.count = restaurants.data.total;
                    restaurants.data.questions.forEach(item => {
                        const tableData = {};
                        tableData.name = item.name;
                        tableData.id = item.question_id;
                        tableData.start_time = item.start_time;
                        tableData.question_time=item.question_time;
                        tableData.end_time = item.end_time;
                        tableData.timestamp = item.timestamp;
                        tableData.phone = item.phone;
                        tableData.history_questions=item.history_questions;
                        tableData.title = item.title;
                        tableData.content = item.content;
                        tableData.comment = item.comment;
                        tableData.answer_id = item.answer_id;
                        tableData.answer = item.answer;
                        tableData.damage_status = item.damage_status;
                        tableData.status = item.status;
                       if(tableData.status==1){
                           this.tableData.unshift(tableData)
                        }else{
                           this.tableData.push(tableData);
                        }
                    })
                }else{
                    if(restaurants.error_no==9){
                        api.removeStore("adminInfo");
                        that.$message({
                            type: 'error',
                            message: 'toke过期'
                        })
                        that.$router.push('/');
                    }
                }
            },
            async getOldResturants(){
                var that=this;
                const restaurants = await serachOldQuitiones({staff_id:JSON.parse(api.getStore("adminInfo")).staff_id,token:JSON.parse(api.getStore("adminInfo")).token});
                this.tableDatas = [];
              if(restaurants.error_no==0) {
                  that.counts = restaurants.data.total;
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
                      this.tableDatas.push(tableData);
                  })
              }else{
                  if(restaurants.error_no==9){
                      api.removeStore("adminInfo");
                      that.$message({
                          type: 'error',
                          message: 'toke过期'
                      })
                      that.$router.push('/');

                  }
              }
            },
     timeDefference(startTime, endTime) {
                var that=this;
        var t2 = new Date(that.timestampToTime(startTime));
        var t1 = new Date(that.timestampToTime(endTime));
        var date3 = t1.getTime() - t2.getTime();
         //计算出相差天数
         var days=Math.floor(date3/(24*3600*1000))
         //计算出小时数
         var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
         var hours=Math.floor(leave1/(3600*1000))
         //计算相差分钟数
         var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
         var minutes=Math.floor(leave2/(60*1000))
         //计算相差秒数
         var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
         var seconds=Math.round(leave3/1000)
         return  hours+"小时"+minutes+" 分钟"+seconds+" 秒"
    },
  timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '/';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
    },
    async update_questiones(data,number){
        event.cancelBubble = true;
        this.dialogFormDetial=false;
                if(data.answer&&number==2){
                    this.getOldResturants();
                    var res=await  update_question({staff_id:JSON.parse(api.getStore("adminInfo")).staff_id,token:JSON.parse(api.getStore("adminInfo")).token,question_id:data.id,status:number});
                    if(res.error_no==0){
                        this.getResturants();
                        this.$message({
                            type: 'success',
                            message: '开启成功'
                        })
                    }else{
                        this.$message({
                            type: 'error',
                            message: '开启失败'
                        })
                    }
                    this.dialogFormDetial=false;
                }else{
                    this.$message({
                        type: 'error',
                        message: '答案不能为空'
                    })
                }
            },
            async update_questionesNum(data,number){
                event.cancelBubble = true;
                this.dialogFormDetial=false;
                    this.getOldResturants();
                    var res=await  update_question({staff_id:JSON.parse(api.getStore("adminInfo")).staff_id,token:JSON.parse(api.getStore("adminInfo")).token,question_id:data.id,status:number});
                    if(res.error_no==0){
                        this.getResturants();
                        this.$message({
                            type: 'success',
                            message: '开启成功'
                        })
                    }else{
                        this.$message({
                            type: 'error',
                            message: '开启失败'
                        })
                    }
                    this.dialogFormDetial=false;

            },
            async add_answeres(){

                var res=await add_answer({staff_id:JSON.parse(api.getStore("adminInfo")).staff_id,token:JSON.parse(api.getStore("adminInfo")).token, question_id:this.questions_id,content:this.content});
                if(res.error_no==0){

                    this.content="";
                    this.$message({
                        type: 'success',
                        message: '回复成功'
                    })
                    this.dialogFormVisibleadd=false;
                }else{
                    this.$message({
                        type: 'success',
                        message: '回复失败'
                    })
                }
            },
            add_answeresModel(data){
                event.cancelBubble = true;
                this.title=data.title;
                this.dialogFormVisibleadd=true;
                this.questions_id=data.id;
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
