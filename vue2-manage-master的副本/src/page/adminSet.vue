<template>
    <div class="fillcontain">
        <head-top>

        </head-top>

        <div class="table_container" style="margin-top: -20px;">
            <div class="formInput" style="float:left;">
                <div style="margin-top: 15px;">
                    <el-input placeholder="请输入内容" v-model="input23" class="input-with-select" prefix-icon="el-icon-search">
                        <el-button slot="append" icon="el-icon-search" @click="handleEdit(scope.$index, scope.row)" >查询</el-button>
                    </el-input>
                </div>
            </div>
            <div style="float:right;margin-top: 35px;">
                <el-button type="primary" @click="handleAdd()" >添加</el-button>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                    <template scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="登录账号">
                                <span>{{ props.row.account }}</span>
                            </el-form-item>
                            <el-form-item label="头像">
                                <img :src="props.row.avatar" style="width: 50px;height: 50px;"/>
                            </el-form-item>
                            <el-form-item label="姓名">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="角色">
                                <span>{{ props.row.role }}</span>
                            </el-form-item>
                            <el-form-item label="简介">
                                <span>{{ props.row.signature }}</span>
                            </el-form-item>
                            <el-form-item label="账号状态">
                                <span>{{ props.row.status }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="登录账号"
                    prop="account" >
                </el-table-column>
                <el-table-column
                    label="头像"
                   >
                    <template scope="scope">
                        <img :src="scope.row.avatar"  style="width: 50px;height: 50px;"/>
                    </template>
                </el-table-column>
                <el-table-column
                    label="姓名"
                    prop="name" >
                </el-table-column>
                <el-table-column
                    label="角色"
                   >
                    <template scope="scope">
                        {{scope.row.role==0?'超级管理员':scope.row.role==1?'财务':'普通员工'}}</template>
                </el-table-column>
                <el-table-column
                    label="简介"
                    prop="signature">
                </el-table-column>
                <el-table-column
                    label="账号状态"
                  >
                    <template scope="scope">
                        {{scope.row.status==1?'启用':'禁用'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="primary" v-if="scope.row.status==1&&scope.row.role!=0"
                            size="mini"
                            @click="handleStop(scope.$index, scope.row)">停用</el-button>
                         <el-button type="primary" v-if="scope.row.status==0&&scope.row.role!=0"
                            size="mini"
                            @click="handleStop(scope.$index, scope.row)">启用</el-button>
                         <el-button
                                   size="mini"
                                   @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.role!=0">更新</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
            <el-dialog title="更新员工" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="登录账号" label-width="100px">
                        <el-input v-model="selectTable.account" auto-complete="off" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" label-width="100px">
                        <el-input v-model="selectTable.name"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" label-width="100px">
                        <el-radio-group v-model="selectTable.role==0?'超级管理员':selectTable.role==1?'财务':'普通员工'">
                            <el-radio label="超级管理员" ></el-radio>
                            <el-radio label="财务" ></el-radio>
                            <el-radio label="普通员工" ></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="性别" label-width="100px">
                        <el-radio-group v-model="selectTable.sex==0?'男':'女'">
                            <el-radio label="男" ></el-radio>
                            <el-radio label="女" ></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="简介" label-width="100px">
                        <el-input v-model="selectTable.signature"></el-input>
                    </el-form-item>
                    <el-form-item label="头像" label-width="100px">
                        <el-upload class="upload-demo" action="http://localhost:80" :limit='5' :auto-upload="true" :on-exceed='uploadOverrun' ref="upload" :http-request='submitUpload' >
                            <img v-if="selectTable.avatar" :src="selectTable.avatar" class="avatar">
                            <el-button size="small"  v-if="!selectTable.avatar"  type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateShop">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="新增员工" v-model="dialogFormVisibleadd">
                <el-form :model="selectTable">
                    <el-form-item label="登录账号" label-width="100px">
                        <el-input v-model="selectTable.account" auto-complete="off" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" label-width="100px">
                        <el-input v-model="selectTable.name"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" label-width="100px">
                        <el-radio-group v-model="selectTable.role">
                            <el-radio label="超级管理员" ></el-radio>
                            <el-radio label="财务" ></el-radio>
                            <el-radio label="普通员工" ></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="性别"  label-width="100px">
                        <el-radio-group v-model="selectTable.sex">
                            <el-radio label="男" ></el-radio>
                            <el-radio label="女" ></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="简介" label-width="100px">
                        <el-input v-model="selectTable.signature"></el-input>
                    </el-form-item>
                    <el-form-item label="头像" label-width="100px">
                        <el-upload class="upload-demo" action="http://localhost:80" :limit='5' :auto-upload="true" :on-exceed='uploadOverrun' ref="upload" :http-request='submitUpload' >
                            <img v-if="selectTable.avatar" :src="selectTable.avatar" class="avatar">
                            <el-button size="small"  v-if="!selectTable.avatar"  type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibleadd = false">取 消</el-button>
                    <el-button type="primary" @click="updateShop">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import api from '@/assets/Api'
    import {mapState} from 'vuex'
    import {getadminSetList,add_staff,upload,update_staff} from '@/api/getData'
    export default {
        data(){
            return {
                input23:"",
                selectModel:"",
                city: {},
                offset: 1,
                limit: 20,
                count: 0,
                tableData: [],
                file:" ",
                currentPage: 1,
                selectTable: {avatar:""},
                dialogFormVisible: false,
                dialogFormVisibleadd:false,
                categoryOptions: [],
                selectedCategory: [],
                address: {}
            }
        },
        created(){
            this.initData();
        },
        components: {
            headTop,
        },
        computed: {
            ...mapState(['adminInfo']),
        },
        methods: {
            async initData(){
                try{
                  this.getResturants();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
             uploadOverrun() {
                this.$message({
                    type: 'error',
                    message: '上传文件个数超出限制!最多上传5张图片!'
                });
            },
            changeUpload(file, fileList) {//预览图片
                this.fileList = fileList;
                this.$nextTick(
                    () => {
                        let upload_list_li = document.getElementsByClassName('el-upload-list')[0].children;
                        for (let i = 0; i < upload_list_li.length; i++) {
                            let li_a = upload_list_li[i].children[0];
                            let imgElement = document.createElement("img");
                            imgElement.setAttribute('src', fileList[i].url);
                            imgElement.setAttribute('style', "max-width:50%;padding-left:25%");
                            if (li_a.lastElementChild.nodeName !== 'IMG') {
                                li_a.appendChild(imgElement);
                            }
                        }
                    })
            },
            submitUpload(content) {
                //自定义的上传图片的方法
                //1. 创建formData 利用AXIOS传递
               var that=this;
                let formData = new FormData;
                formData.append('fileUpload', content.file);
                let config = {
                    'Content-Type': 'multipart/form-data'
                }
                let var_this = this;
                this.$http.post('https://micro.5dcfo.com/image_server/upload',formData, config)
                    .then(function(response) {
                        console.log(response)
                        that.selectTable.avatar=response.data.data.image_url;
                        if (response.data.error_no!=0) {
                            var_this.$message({
                                message: "上传失败",
                                type: 'error'
                            });
                        }else{
                            var_this.$message({
                                message: "上传成功",
                                type: 'success'
                            });
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
            },
            async handleStop(one,two){
                var that=this;
                var a=0;
                if(two.status){
                    a=0;
                }else{
                    a=1;
                }
                var obj={
                    token:JSON.parse(api.getStore("adminInfo")).token,
                    staff_id:JSON.parse(api.getStore("adminInfo")). staff_id,
                    disable_id:two.id,
                    status:a
                }
                const res = await update_staff(obj);
               if(res.error_no==0){
                   that.initData();
                   that.$message({
                       message: "成功",
                       type: 'success'
                   });
               }else{
                   that.$message({
                       message: "失败",
                       type: 'error'
                   });
               }
            },
            async getResturants(){
                const restaurants = await getadminSetList({staff_id:JSON.parse(api.getStore("adminInfo")).staff_id,token:JSON.parse(api.getStore("adminInfo")).token,page:this.offset,page_range:this.limit});
                this.tableData = [];
                this.count= restaurants.data.staffs.length;
                restaurants.data.staffs.forEach(item => {
                    const tableData = {};
                    tableData.name = item.name;
                    tableData.id = item.staff_id;
                    tableData.account = item.account;
                    tableData.avatar=item.avatar;
                    tableData.status=item.status;
                    tableData.role=item.role;
                    tableData.signature=item.signature;
                    this.tableData.push(tableData);
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getResturants()
            },
            handleAdd(){
                this.selectTable={};
                this.dialogFormVisibleadd = true;
                this.selectTable.avatar=true;
            },
            handleEdit(index, row) {
                this.selectTable = row;
                this.address.address = row.address;
                this.dialogFormVisible = true;
                this.selectedCategory = row.category.split('/');
                if (!this.categoryOptions.length) {
                    this.getCategory();
                }
            },
            addFood(index, row){
                this.$router.push({ path: 'addGoods', query: { restaurant_id: row.id }})
            },
            async handleDelete(index, row) {

            },
            async querySearchAsync(queryString, cb) {

            },
            beforeAvatarUpload(file) {
                var that=this;
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;
                var formData = new FormData();
                console.log(file)
                formData.append('file',file,file.name);
                let config = {
                    headers: {
                        'Content-Type':'multipart/form-data'
                    }
                }
                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                if(isRightType && isLt2M){
                    console.log(formData.getAll('file'))
                    this.$http.post('https://micro.5dcfo.com/image_server/upload',{fileUpload:formData},config).then(function (res) {
                        if (res.status === 200) {
                            console.log(res)
                            that.selectTable.avatar = res.image_path;
                        }else {
                            this.$message.error('上传图片失败！');
                        }
                    })
                }
            },
            async updateShop(){
                this.dialogFormVisible = false;
                try{
                    this.selectTable.staff_id=JSON.parse(api.getStore("adminInfo")).staff_id;
                    this.selectTable.token=JSON.parse(api.getStore("adminInfo")).token;
                    switch(this.selectTable.role){
                        case  "超级管理员":
                            this.selectTable.role=0;
                            break;
                        case  "财务":
                            this.selectTable.role=1;
                            break;
                        case  "普通员工":
                            this.selectTable.role=2;
                            break;
                    }
                    switch(this.selectTable.sex){
                        case  "男":
                            this.selectTable.sex=0 ;
                            break;
                        case  "女":
                            this.selectTable.sex=1 ;
                            break;
                    }
                    const res = await add_staff(this.selectTable);
                    if (res.status == 1) {
                        this.dialogFormVisibleadd=false;
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.getResturants();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }catch(err){
                    console.log('添加失败', err);
                }
            },
        },
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

    @import '../style/mixin';
    .explain_text{
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
        color: #333;
    }
    .admin_set{
        width: 60%;
        background-color: #F9FAFC;
        min-height: 400px;
        margin: 20px auto 0;
        border-radius: 10px;
        ul > li{
            padding: 20px;
            span{
                color: #666;
            }
        }
    }
    .admin_title{
        margin-top: 20px;
        .sc(24px, #666);
        text-align: center;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        margin-top: 10px;
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
</style>
