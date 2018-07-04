<template>
 <div>
   <div v-show="productNameShow">
     <el-row :gutter="24">
       <el-col :span="6" :offset="1">
       <el-button type="primary" @click="productClick()">产品列表</el-button>
       <el-button @click="orderClick()">订单列表</el-button>
       </el-col>
       <el-col :span="15" :offset="2">
         <el-input style="width:300px;"
           placeholder="请输入产品名"
           v-model="searchProduct.sku_name">
           <i slot="prefix" class="el-input__icon el-icon-search"></i>
         </el-input>
         <el-select v-model="searchProduct.area_id" placeholder="选择城市">
           <el-option
            label="所有"
            value="">
           </el-option>
           <el-option
             v-for="item in area_list"
             :key="item.area_id"
             :label="item.area_name"
             :value="item.area_id">
           </el-option>
         </el-select>
         <el-select v-model="searchProduct.category_id" placeholder="选择分类">
           <el-option
             label="所有"
             value="">
           </el-option>
           <el-option
             v-for="item in category_list"
             :key="item.category_name"
             :label="item.category_name"
             :value="item.category_id">
           </el-option>
         </el-select>
         <el-button type="primary" @click="searchProductButton()">查询</el-button>
       </el-col>
     </el-row>
     <el-row :gutter="24" style="margin-top:50px;">
       <el-col :span="22" :offset="1" >
         <el-table
           :data="all_product_list"
           border
           style="width: 100%;" max-height="600">
           <el-table-column
             label="序号"
             type="index"
           >
           </el-table-column>
           <el-table-column
             prop="name"
             label="商品名称"
           >
           </el-table-column>
           <el-table-column
             prop="sku_desc"
             label="商品描述"
           >
           </el-table-column>
           <el-table-column
             prop="sku_attr"
             label="商品属性"
           >
           </el-table-column>
           <el-table-column
             prop="service_name"
             label="所属服务"
           >
           </el-table-column>
           <el-table-column
             prop="city"
             label="所属城市"
           >
           </el-table-column>
           <el-table-column
             label="实际价格"
           >
             <template slot-scope="scope">
               {{"¥"+scope.row.sku_price}}
             </template>
           </el-table-column>
           <el-table-column

             label="市场价格"
           >
             <template slot-scope="scope">
               {{"¥"+scope.row.market_value}}
             </template>
           </el-table-column>
           <el-table-column
             fixed="right"
             label="操作">
             <template slot-scope="scope">
               <el-button @click="handleClick(scope.row)" type="text" size="small">下单</el-button>
             </template>
           </el-table-column>
         </el-table>

       </el-col>
     </el-row>
     <el-row :gutter="24" style="margin-top:20px;">
       <el-col :span="6" :offset="1">
         <el-pagination
           background
           page-size="10"
           :current-page="searchProduct.page_no"
           layout="prev, pager, next"
           @current-change="getCurrentPage"
           :total="producttotal">
         </el-pagination>
       </el-col>
     </el-row>
   </div>
   <div v-show="!productNameShow">
     <el-row :gutter="24">
       <el-col :span="6" :offset="1">
         <el-button @click="productClick()">产品列表</el-button>
         <el-button @click="orderClick()" type="primary">订单列表</el-button>
       </el-col>
       <el-col :span="17" :offset="0" style="">
         <el-input style="width:200px;"
                   placeholder="请输入电话号码"
                   v-model="searchOrder.phone">
           <i slot="prefix" class="el-input__icon el-icon-search"></i>
         </el-input>
         <el-input style="width:200px;"
                   placeholder="请输入商品名"
                   v-model="searchOrder.sku_name">
           <i slot="prefix" class="el-input__icon el-icon-search"></i>
         </el-input>
         <el-select v-model="searchOrder.category_id" placeholder="选择分类">
           <el-option
             label="所有"
             value="">
           </el-option>
           <el-option
             v-for="item in category_list"
             :key="item.category_name"
             :label="item.category_name"
             :value="item.category_id">
           </el-option>
         </el-select>
         <el-select v-model="searchOrder.order_type" placeholder="选择支付状态">
           <el-option
             label="所有"
             value="all_type">
           </el-option>
          <el-option label="已支付"
                     value="pay_order">

          </el-option>
           <el-option label="未支付"
                      value="no_pay_order">

           </el-option>
         </el-select>
         <el-button type="primary" @click="searchOrderButton()">查询</el-button>
       </el-col>
     </el-row>
     <el-row :gutter="24" style="margin-top:50px;">
       <el-col :span="22" :offset="1">
         <el-table
           @row-click="rowClick"
           :data="all_order_list"
           max-height="500"
           :row-class-name="tableRowClassName"
           border
           style="width: 100%">
           <el-table-column
             label="序号"
             type="index"
           >
           </el-table-column>
           <el-table-column

             label="客户姓名"
           >
             <template slot-scope="scope">
               {{scope.row.customer_name+" "+scope.row.customer_mobile}}
             </template>
           </el-table-column>
           <el-table-column
             prop="order_code"
             label="订单编号"
           >
           </el-table-column>
           <el-table-column
             label="商品信息"
           >
             <template slot-scope="scope">
               {{scope.row.category_name+","+scope.row.product_name+","+scope.row.product_attr+","+scope.row.city}}
             </template>
           </el-table-column>
           <el-table-column
             label="实际价格"
           >
             <template slot-scope="scope">
               {{"¥"+scope.row.price}}
             </template>
           </el-table-column>
           <el-table-column
             prop="is_pay"
             label="支付状态"
           >
             <template slot-scope="scope">
               {{scope.row.is_pay=="no"?'未支付':"已支付"}}
             </template>
           </el-table-column>
           <el-table-column
             prop="order_time"
             label="下单时间"
           >
           </el-table-column>
           <el-table-column
             fixed="right"
             label="操作">
             <template slot-scope="scope">
               <el-button @click="handleClickOne(scope.row)" type="text" size="small">编辑</el-button>

             </template>
           </el-table-column>
         </el-table>
       </el-col>
     </el-row>
     <el-row :gutter="24" style="margin-top:20px;">
       <el-col :span="6" :offset="1">
         <el-pagination
           background
           layout="prev, pager, next"
           :current-page="searchOrder.page_no"
           @current-change="getCurrentPageOne"
           page-size="10"
           :total="ordertotal">
         </el-pagination>
       </el-col>
     </el-row>
     <el-row>
       <el-col :span="20" :offset="1">
         <el-form ref="form" :model="form" >
           <el-form-item label="支付链接">
             <el-input v-model="link" style="width:500px;"></el-input>
           </el-form-item>
         </el-form>
       </el-col>
     </el-row>
   </div>
   <el-dialog title="订单信息" :visible.sync="dialogFormVisible"  width="60%" center="true">
     <el-dialog
       width="30%"
       center="true"
       title="确认订单"
       :visible.sync="innerVisible"
       append-to-body>
       <el-form :model="productDetail" style="margin-left: -50px;">
         <el-form-item style="width:400px;display: inline-block;" label="姓名" :label-width="formLabelWidth">
           <el-input v-model="productDetail.user_name" auto-complete="off" disabled="disabled"></el-input>
         </el-form-item>
         <el-form-item  style="width:400px;display: inline-block;" label="电话" :label-width="formLabelWidth">
           <el-input v-model="productDetail.user_phone" auto-complete="off" disabled="disabled"></el-input>
         </el-form-item>
         <el-form-item style="width:400px;display: inline-block;" label="价格" :label-width="formLabelWidth">
           <el-input v-model="productDetail.sku_price" auto-complete="off" disabled="disabled"></el-input>
         </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button @click="innerVisible = false">取 消</el-button>
         <el-button type="primary" @click="submitOrder">确认提交</el-button>
       </div>
     </el-dialog>
     <el-form :model="productDetail" >
         <el-form-item style="width:400px;display: inline-block;" label="姓名" :label-width="formLabelWidth">
         <el-input v-model="productDetail.user_name" auto-complete="off"></el-input>
       </el-form-item>
       <el-form-item  style="width:400px;display: inline-block;" label="电话" :label-width="formLabelWidth">
         <el-input v-model="productDetail.user_phone" auto-complete="off"></el-input>
       </el-form-item>
       <el-form-item style="width:400px;display: inline-block;" label="商品名称" :label-width="formLabelWidth">
         <el-input v-model="productDetail.name" auto-complete="off" disabled="disabled"></el-input>
       </el-form-item>
       <el-form-item style="width:400px;display: inline-block;"  label="所属城市" :label-width="formLabelWidth">
         <el-input v-model="productDetail.city" auto-complete="off" disabled="disabled"></el-input>
       </el-form-item>
       <el-form-item style="width:400px;display: inline-block;"   label="商品描述" :label-width="formLabelWidth">
         <el-input v-model="productDetail.sku_desc" auto-complete="off" disabled="disabled"></el-input>
       </el-form-item>
       <el-form-item style="width:400px;display: inline-block;" label="所属服务" :label-width="formLabelWidth">
         <el-input v-model="productDetail.service_name" auto-complete="off" disabled="disabled" ></el-input>
       </el-form-item>
       <el-form-item style="width:400px;display: inline-block;" label="价格" :label-width="formLabelWidth">
         <el-input v-model="productDetail.sku_price" auto-complete="off"></el-input>
       </el-form-item>
       <el-form-item style="width:400px;display: inline-block;" label="市场价" :label-width="formLabelWidth">
         <el-input v-model="productDetail.market_value" auto-complete="off" disabled="disabled"  ></el-input>
       </el-form-item>
     </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisible = false">取 消</el-button>
       <el-button type="primary" @click="innerVisible = true">保存</el-button>
     </div>
   </el-dialog>
   <el-dialog title="更新订单" :visible.sync="dialogFormVisibleOne"  width="60%" center="true">
     <el-dialog
       width="30%"
       center="true"
       title="确认更新订单"
       :visible.sync="innerVisibleOne"
       append-to-body>
       <el-form :model="orderDetail" style="margin-left: -50px;">
         <el-form-item style="width:400px;display: inline-block;" label="姓名" :label-width="formLabelWidth">
           <el-input v-model="orderDetail.customer_name" auto-complete="off" disabled="disabled"></el-input>
         </el-form-item>
         <el-form-item  style="width:400px;display: inline-block;" label="电话" :label-width="formLabelWidth">
           <el-input v-model="orderDetail.customer_mobile" auto-complete="off" disabled="disabled"></el-input>
         </el-form-item>
         <el-form-item style="width:400px;display: inline-block;" label="价格" :label-width="formLabelWidth">
           <el-input v-model="orderDetail.price" auto-complete="off" disabled="disabled"></el-input>
         </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button @click="innerVisibleOne = false">取 消</el-button>
         <el-button type="primary" @click="updateOrder">更新订单</el-button>
       </div>
     </el-dialog>
     <el-form :model="orderDetail" >
       <el-form-item style="width:400px;display: inline-block;" label="姓名" :label-width="formLabelWidth">
         <el-input v-model="orderDetail.customer_name" auto-complete="off" ></el-input>
       </el-form-item>
       <el-form-item  style="width:400px;display: inline-block;" label="电话" :label-width="formLabelWidth">
         <el-input v-model="orderDetail.customer_mobile" auto-complete="off"></el-input>
       </el-form-item>
       <el-form-item style="width:400px;display: inline-block;" label="商品名称" :label-width="formLabelWidth">
         <el-input v-model="orderDetail.product_name" auto-complete="off" disabled="disabled"></el-input>
       </el-form-item>
       <el-form-item style="width:400px;display: inline-block;"  label="所属城市" :label-width="formLabelWidth">
         <el-input v-model="orderDetail.city" auto-complete="off" disabled="disabled"></el-input>
       </el-form-item>
       <el-form-item style="width:400px;display: inline-block;"   label="商品描述" :label-width="formLabelWidth">
         <el-input v-model="orderDetail.sku_desc" auto-complete="off" disabled="disabled"></el-input>
       </el-form-item>
       <el-form-item style="width:400px;display: inline-block;" label="所属服务" :label-width="formLabelWidth">
         <el-input v-model="orderDetail.category_name" auto-complete="off" disabled="disabled" ></el-input>
       </el-form-item>
       <el-form-item style="width:400px;display: inline-block;" label="价格" :label-width="formLabelWidth">
         <el-input v-model="orderDetail.price" auto-complete="off"></el-input>
       </el-form-item>
     </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisibleOne = false">取 消</el-button>
       <el-button type="primary" @click="innerVisibleOne = true">保存</el-button>
     </div>
   </el-dialog>
 </div>
</template>
<script>
  import Api from '../assets/js/Api.js';
  import Http from '../assets/js/Http.js';
  export default {
    data(){
      return {
        link:"",
        productNameShow:true,
        dialogFormVisible: false,
        dialogFormVisibleOne:false,
        productDetail:"",
        area_list:"",
        category_list:"",
        producttotal:0,
        ordertotal:0,
        orderDetail:"",
        innerVisible:false,
        innerVisibleOne:false,
        indexNumber:"",
        form: {
          market_value:"",
          price:"",
          name:"",
          desc:"",
          city:"",
          productname:"",
          phone:"",
          name:""
        },
        formLabelWidth: '120px',
        options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
        searchProduct:{
          sku_name:"",
          page_no:1
        },
        searchOrder:{
          page_no:1,
          order_type:"",
          phone:"",
          sku_name:""
        },
        all_product_list:"",
        all_order_list:""
      }
    },

    created(){
      this.get_all_product()
      this.get_area_list()
    },
    methods:{
      orderClick(){
        this.get_all_order()
        this.productNameShow=false;
      },
      tableRowClassName({row,rowIndex}) {
        var that=this;
        if (rowIndex === that.indexNumber) {
          return 'current-row';
        }
        return '';
      },
      productClick(){
        this.searchProduct={
            area_id:"",
            category_id:"",
            sku_name:"",
            page_no:1
        };
        this.get_all_product();

        this.productNameShow=true;

      },
      async get_all_product(){
        var that=this;
        var result=await  Http.get("pay/get_all_product",{area_id:that.searchProduct.area_id,category_id:that.searchProduct.category_id,sku_name:that.searchProduct.sku_name,page_no:that.searchProduct.page_no});
        this.all_product_list=result.data.all_product_list;
        this.producttotal=result.data.total;
        console.log(result)
      },
      styleSelect(){

      },
      async get_all_order(){
        var that=this;
        var result=await  Http.get("pay/order_list",this.searchOrder);
        this.all_order_list=result.data.order_list;
        this.ordertotal=result.data.total_number;
      },
     async updateOrder(){
       var that=this;
       var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
       console.log(that.orderDetail)
       if(myreg.test(that.orderDetail.customer_mobile)){
         var result = await Http.post("pay/update_order",{
           order_id:that.orderDetail.order_id,
           user_id:that.orderDetail.user_id,
           customer_name:that.orderDetail.customer_name,
           phone:that.orderDetail.customer_mobile,
           price:that.orderDetail.price
           });
         if (result.error_no == 0){
           that.dialogFormVisibleOne=false;
           that.innerVisibleOne=false;
           that.$message({
             message: '更新成功',
             type: 'success'
           });
         }
       }else{
         that.$message({
           showClose: true,
           message: '手机格式不正确',
           type: 'error'
         });
       }

     },
      async get_area_list(){
        var result=await  Http.get("pay/get_area_list",{});
        this.category_list=result.data.category_list;
        this.area_list=result.data.area_list;
      },
      searchOrderButton(){
        this.searchOrder.page_no=1;
        this.get_all_order();
      },
      handleClick(e){
        this.dialogFormVisible=true;
        console.log(this.productDetail)
        this.productDetail=e;
      },
      handleClickOne(e){
        this.dialogFormVisibleOne=true;
        console.log(e)
        this.orderDetail=e;
      },
      rowClick(row,e){
        this.link="http://web.5dcfo.com/html5Order/index.html?order_id="+row.order_id;
        if(e=="jj"){
          this.indexNumber=0;
        }else{
          this.indexNumber="";
        }


      },

      searchProductButton(){
        this.searchProduct.page_no=1;
        this.get_all_product();
      },
      getCurrentPage(e){
        this.searchProduct.page_no=e;
        this.get_all_product();
      },
      getCurrentPageOne(e){
        this.searchOrder.page_no=e;
        this.get_all_order()

      },

      async submitOrder(){
        var that=this;
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        console.log(myreg.test(that.productDetail.user_phone));
        if(myreg.test(that.productDetail.user_phone)&&that.productDetail.user_name){
          var result = await Http.post("pay/add_order",{
            customer_name: that.productDetail.user_name,
            customer_mobile: that.productDetail.user_phone,
            sku_id: that.productDetail.sku_id,
            price: that.productDetail.sku_price,
            area_id: that.productDetail.area_id,
            shop_name: that.productDetail.name,
            sku_attr: that.productDetail.sku_attr
          });
          if (result.error_no == 0){
            that.productNameShow=false;
            that.dialogFormVisible=false;
            that.innerVisible=false;
            that.get_all_order();
            that.indexNumber=0;
            that.rowClick(that.all_order_list[0],"jj");
            that.$message({
              message: '下订单成功',
              type: 'success'
            });
          }
        }else{
          that.$message({
            showClose: true,
            message: '手机格式不正确或者用户名不能为空',
            type: 'error'
          });
        }

      }


    }
  }
</script>
