webpackJsonp([5],{208:function(t,e,a){a(245);var n=a(90)(a(224),a(253),null,null);t.exports=n.exports},217:function(t,e,a){"use strict";a.d(e,"r",function(){return r}),a.d(e,"e",function(){return s}),a.d(e,"f",function(){return o}),a.d(e,"d",function(){return l}),a.d(e,"g",function(){return i}),a.d(e,"h",function(){return c}),a.d(e,"l",function(){return u}),a.d(e,"j",function(){return d}),a.d(e,"m",function(){return p}),a.d(e,"k",function(){return f}),a.d(e,"n",function(){return m}),a.d(e,"o",function(){return b}),a.d(e,"i",function(){return v}),a.d(e,"b",function(){return h}),a.d(e,"c",function(){return g});var n=a(218),r=function(t){return n.a.post("/admin/login",t)},s=function(t){return n.a.get("/admin/staffs",t)},o=function(t){return n.a.post("/admin/add_staff",t)},l=function(t){return n.a.post("/admin/update_staff",t)},i=function(t){return n.a.get("/admin/withdraw",t)},c=function(t){return n.a.get("/admin/search_withdraw",t)},u=function(t){return n.a.get("/admin/cycle_new_question",t)},d=function(t){return n.a.get("/admin/cycle_old_question",t)},p=function(t){return n.a.get("/admin/cycle_service_question",t)},f=function(t){return n.a.get("/admin/question/search",t)},m=function(t){return n.a.post("/admin/update_question",t)},b=function(t){return n.a.post("/admin/add_answer",t)},v=function(t){return n.a.post("/admin/withdraw",t)},h=function(t){return n.a.get("/admin/online",t)},g=function(t){return n.a.post("/admin/online",t)}},218:function(t,e,a){"use strict";function n(t){return!t||200!==t.status&&304!==t.status&&400!==t.status?{status:!1,msg:"网络异常"}:t}function r(t){return!1===t.status||(t.data&&0!=t.data.error_no?(4==t.data.error_no&&(t.mark=!0),t.status=!1):(t=t.data,t.status=!0)),t}var s=a(95),o=a.n(s),l=a(96),i=a.n(l),c=a(51),u=a.n(c);u.a.interceptors.request.use(function(t){return t},function(t){return i.a.reject(t)}),u.a.interceptors.response.use(function(t){return t},function(t){return i.a.resolve(t.response)}),e.a={post:function(t,e,a){var s;return s="code"===a?"https://micro.5dcfo.com":"https://center.5dcfo.com",u()({method:"POST",baseURL:s,url:t,data:o()(e),timeout:1e4}).then(function(t){return n(t)}).then(function(t){return r(t)})},get:function(t,e){return u()({method:"get",url:"https://center.5dcfo.com"+t,params:e}).then(function(t){return n(t)}).then(function(t){return r(t)})}}},219:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(92),r=a.n(n),s=a(91),o=a.n(s),l=a(50),i=a.n(l),c=a(217),u=a(94),d=a(93);e.default={data:function(){return{status:0,staffs:""}},created:function(){this.$router.push("/"),JSON.parse(d.a.getStore("adminInfo"))?this.$router.push("/manage"):this.$router.push("/"),this.onlineGetes(),this.adminInfo.id||this.getAdminData().then(function(t){console.log(t)})},computed:i()({},a.i(u.b)(["adminInfo"])),methods:i()({},a.i(u.c)(["getAdminData"]),{handleCommand:function(t){var e=this;return o()(r.a.mark(function n(){var s;return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if("home"!=t){n.next=4;break}e.$router.push("/manage"),n.next=9;break;case 4:if("singout"!=t){n.next=9;break}return n.next=7,a.i(c.signout)();case 7:s=n.sent,1==s.status?(e.$message({type:"success",message:"退出成功"}),e.$router.push("/")):e.$message({type:"error",message:s.message});case 9:case"end":return n.stop()}},n,e)}))()},onlineGetes:function(){var t=this;return o()(r.a.mark(function e(){var n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.i(c.b)({staff_id:JSON.parse(d.a.getStore("adminInfo")).staff_id,token:JSON.parse(d.a.getStore("adminInfo")).token});case 2:n=e.sent,0==n.error_no&&(t.staffs=n.data.staffs);case 4:case"end":return e.stop()}},e,t)}))()},onlinePosts:function(){var t=this;return o()(r.a.mark(function e(){var n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.i(c.c)({staff_id:JSON.parse(d.a.getStore("adminInfo")).staff_id,token:JSON.parse(d.a.getStore("adminInfo")).token,option:t.status});case 2:n=e.sent,0==n.error_no&&(t.staffs=n.data.staffs),2==t.status&&(d.a.removeStore("adminInfo"),t.$router.push("/"));case 5:case"end":return e.stop()}},e,t)}))()}})}},220:function(t,e,a){e=t.exports=a(206)(!1),e.push([t.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.header_container{background-color:#eff2f7;height:60px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;padding-left:20px}.avator{width:36px;height:36px;border-radius:50%;margin-right:37px}.el-dropdown-menu__item{text-align:center}",""])},221:function(t,e,a){var n=a(220);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(207)("69c62082",n,!0)},222:function(t,e,a){a(221);var n=a(90)(a(219),a(223),null,null);t.exports=n.exports},223:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"header_container"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/manage"}}},[t._v("首页")]),t._v(" "),t._l(t.$route.meta,function(e,n){return a("el-breadcrumb-item",{key:"index"},[t._v(t._s(e))])})],2),t._v(" "),a("span",[t._v("当前在线客服："+t._s(t.staffs)+"人")]),t._v(" "),a("div",[a("span",[t._v("我的状态")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.status,expression:"status"}],on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.status=e.target.multiple?a:a[0]},function(e){t.onlinePosts()}]}},[a("option",{attrs:{value:"0"}},[t._v("在线")]),t._v(" "),a("option",{attrs:{value:"1"}},[t._v("挂起")]),t._v(" "),a("option",{attrs:{value:"2"}},[t._v("退出")])])])],1)},staticRenderFns:[]}},224:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(92),r=a.n(n),s=a(91),o=a.n(s),l=a(50),i=a.n(l),c=a(222),u=a.n(c),d=a(93),p=a(94),f=a(217);e.default={data:function(){return{input23:"",selectModel:"",city:{},offset:1,limit:20,count:0,tableData:[],file:" ",currentPage:1,selectTable:{avatar:""},dialogFormVisible:!1,dialogFormVisibleadd:!1,categoryOptions:[],selectedCategory:[],address:{}}},created:function(){this.initData()},components:{headTop:u.a},computed:i()({},a.i(p.b)(["adminInfo"])),methods:{initData:function(){var t=this;return o()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:try{t.getResturants()}catch(t){console.log("获取数据失败",t)}case 1:case"end":return e.stop()}},e,t)}))()},uploadOverrun:function(){this.$message({type:"error",message:"上传文件个数超出限制!最多上传5张图片!"})},changeUpload:function(t,e){this.fileList=e,this.$nextTick(function(){for(var t=document.getElementsByClassName("el-upload-list")[0].children,a=0;a<t.length;a++){var n=t[a].children[0],r=document.createElement("img");r.setAttribute("src",e[a].url),r.setAttribute("style","max-width:50%;padding-left:25%"),"IMG"!==n.lastElementChild.nodeName&&n.appendChild(r)}})},submitUpload:function(t){var e=this,a=new FormData;a.append("fileUpload",t.file);var n={"Content-Type":"multipart/form-data"},r=this;this.$http.post("https://micro.5dcfo.com/image_server/upload",a,n).then(function(t){console.log(t),e.selectTable.avatar=t.data.data.image_url,0!=t.data.error_no?r.$message({message:"上传失败",type:"error"}):r.$message({message:"上传成功",type:"success"})}).catch(function(t){console.log(t)})},handleStop:function(t,e){var n=this;return o()(r.a.mark(function t(){var s,o,l,i;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s=n,o=0,o=e.status?0:1,l={token:JSON.parse(d.a.getStore("adminInfo")).token,staff_id:JSON.parse(d.a.getStore("adminInfo")).staff_id,disable_id:e.id,status:o},t.next=6,a.i(f.d)(l);case 6:i=t.sent,0==i.error_no?(s.initData(),s.$message({message:"成功",type:"success"})):s.$message({message:"失败",type:"error"});case 8:case"end":return t.stop()}},t,n)}))()},getResturants:function(){var t=this;return o()(r.a.mark(function e(){var n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.i(f.e)({staff_id:JSON.parse(d.a.getStore("adminInfo")).staff_id,token:JSON.parse(d.a.getStore("adminInfo")).token,page:t.offset,page_range:t.limit});case 2:n=e.sent,t.tableData=[],t.count=n.data.staffs.length,n.data.staffs.forEach(function(e){var a={};a.name=e.name,a.id=e.staff_id,a.account=e.account,a.avatar=e.avatar,a.status=e.status,a.role=e.role,a.signature=e.signature,t.tableData.push(a)});case 6:case"end":return e.stop()}},e,t)}))()},handleSizeChange:function(t){console.log("每页 "+t+" 条")},handleCurrentChange:function(t){this.currentPage=t,this.offset=(t-1)*this.limit,this.getResturants()},handleAdd:function(){this.selectTable={},this.dialogFormVisibleadd=!0,this.selectTable.avatar=!0},handleEdit:function(t,e){this.selectTable=e,this.address.address=e.address,this.dialogFormVisible=!0,this.selectedCategory=e.category.split("/"),this.categoryOptions.length||this.getCategory()},addFood:function(t,e){this.$router.push({path:"addGoods",query:{restaurant_id:e.id}})},handleDelete:function(t,e){var a=this;return o()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},t,a)}))()},querySearchAsync:function(t,e){var a=this;return o()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},t,a)}))()},beforeAvatarUpload:function(t){var e=this,a="image/jpeg"===t.type||"image/png"===t.type,n=t.size/1024/1024<2,r=new FormData;console.log(t),r.append("file",t,t.name);var s={headers:{"Content-Type":"multipart/form-data"}};a||this.$message.error("上传头像图片只能是 JPG 格式!"),n||this.$message.error("上传头像图片大小不能超过 2MB!"),a&&n&&(console.log(r.getAll("file")),this.$http.post("https://micro.5dcfo.com/image_server/upload",{fileUpload:r},s).then(function(t){200===t.status?(console.log(t),e.selectTable.avatar=t.image_path):this.$message.error("上传图片失败！")}))},updateShop:function(){var t=this;return o()(r.a.mark(function e(){var n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.dialogFormVisible=!1,e.prev=1,t.selectTable.staff_id=JSON.parse(d.a.getStore("adminInfo")).staff_id,t.selectTable.token=JSON.parse(d.a.getStore("adminInfo")).token,e.t0=t.selectTable.role,e.next="超级管理员"===e.t0?7:"财务"===e.t0?9:"普通员工"===e.t0?11:13;break;case 7:return t.selectTable.role=0,e.abrupt("break",13);case 9:return t.selectTable.role=1,e.abrupt("break",13);case 11:return t.selectTable.role=2,e.abrupt("break",13);case 13:e.t1=t.selectTable.sex,e.next="男"===e.t1?16:"女"===e.t1?18:20;break;case 16:return t.selectTable.sex=0,e.abrupt("break",20);case 18:return t.selectTable.sex=1,e.abrupt("break",20);case 20:return e.next=22,a.i(f.f)(t.selectTable);case 22:n=e.sent,1==n.status?(t.dialogFormVisibleadd=!1,t.$message({type:"success",message:"添加成功"}),t.getResturants()):t.$message({type:"error",message:n.message}),e.next=29;break;case 26:e.prev=26,e.t2=e.catch(1),console.log("添加失败",e.t2);case 29:case"end":return e.stop()}},e,t,[[1,26]])}))()}}}},237:function(t,e,a){e=t.exports=a(206)(!1),e.push([t.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.demo-table-expand{font-size:0}.demo-table-expand label{width:90px;color:#99a9bf}.demo-table-expand .el-form-item{margin-right:0;margin-bottom:0;width:50%}.table_container{padding:20px}.Pagination{display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;margin-top:8px}.formInput{width:30%;margin:20px 0}.optionSelected{width:110px}.explain_text{margin-top:20px;text-align:center;font-size:20px;color:#333}.admin_set{width:60%;background-color:#f9fafc;min-height:400px;margin:20px auto 0;border-radius:10px}.admin_set ul>li{padding:20px}.admin_set ul>li span{color:#666}.admin_title{margin-top:20px;font-size:24px;color:#666;text-align:center}.avatar-uploader .el-upload{border:1px dashed #d9d9d9;margin-top:10px;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader .el-upload:hover{border-color:#20a0ff}.avatar-uploader-icon{font-size:28px;color:#8c939d;width:120px;height:120px;line-height:120px;text-align:center}.avatar{width:120px;height:120px;display:block}",""])},245:function(t,e,a){var n=a(237);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(207)("0253a0d0",n,!0)},253:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"fillcontain"},[a("head-top"),t._v(" "),a("div",{staticClass:"table_container",staticStyle:{"margin-top":"-20px"}},[a("div",{staticClass:"formInput",staticStyle:{float:"left"}},[a("div",{staticStyle:{"margin-top":"15px"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容","prefix-icon":"el-icon-search"},model:{value:t.input23,callback:function(e){t.input23=e},expression:"input23"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(e){t.handleEdit(t.scope.$index,t.scope.row)}},slot:"append"},[t._v("查询")])],1)],1)]),t._v(" "),a("div",{staticStyle:{float:"right","margin-top":"35px"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.handleAdd()}}},[t._v("添加")])],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"登录账号"}},[a("span",[t._v(t._s(e.row.account))])]),t._v(" "),a("el-form-item",{attrs:{label:"头像"}},[a("img",{staticStyle:{width:"50px",height:"50px"},attrs:{src:e.row.avatar}})]),t._v(" "),a("el-form-item",{attrs:{label:"姓名"}},[a("span",[t._v(t._s(e.row.name))])]),t._v(" "),a("el-form-item",{attrs:{label:"角色"}},[a("span",[t._v(t._s(e.row.role))])]),t._v(" "),a("el-form-item",{attrs:{label:"简介"}},[a("span",[t._v(t._s(e.row.signature))])]),t._v(" "),a("el-form-item",{attrs:{label:"账号状态"}},[a("span",[t._v(t._s(e.row.status))])])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"登录账号",prop:"account"}}),t._v(" "),a("el-table-column",{attrs:{label:"头像"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{width:"50px",height:"50px"},attrs:{src:t.row.avatar}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"姓名",prop:"name"}}),t._v(" "),a("el-table-column",{attrs:{label:"角色"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                    "+t._s(0==e.row.role?"超级管理员":1==e.row.role?"财务":"普通员工"))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"简介",prop:"signature"}}),t._v(" "),a("el-table-column",{attrs:{label:"账号状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                    "+t._s(1==e.row.status?"启用":"禁用")+"\n                ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status&&0!=e.row.role?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.handleStop(e.$index,e.row)}}},[t._v("停用")]):t._e(),t._v(" "),0==e.row.status&&0!=e.row.role?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.handleStop(e.$index,e.row)}}},[t._v("启用")]):t._e(),t._v(" "),0!=e.row.role?a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.handleEdit(e.$index,e.row)}}},[t._v("更新")]):t._e()]}}])})],1),t._v(" "),a("div",{staticClass:"Pagination"},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":20,layout:"total, prev, pager, next",total:t.count},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:"更新员工"},model:{value:t.dialogFormVisible,callback:function(e){t.dialogFormVisible=e},expression:"dialogFormVisible"}},[a("el-form",{attrs:{model:t.selectTable}},[a("el-form-item",{attrs:{label:"登录账号","label-width":"100px"}},[a("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入手机号"},model:{value:t.selectTable.account,callback:function(e){t.$set(t.selectTable,"account",e)},expression:"selectTable.account"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"姓名","label-width":"100px"}},[a("el-input",{model:{value:t.selectTable.name,callback:function(e){t.$set(t.selectTable,"name",e)},expression:"selectTable.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"角色","label-width":"100px"}},[a("el-radio-group",{model:{value:0==t.selectTable.role?"超级管理员":1==t.selectTable.role?"财务":"普通员工",callback:function(e){t.$set(0==t.selectTable.role?"超级管理员":t.selectTable,"role==1?'财务':'普通员工'",e)},expression:"selectTable.role==0?'超级管理员':selectTable.role==1?'财务':'普通员工'"}},[a("el-radio",{attrs:{label:"超级管理员"}}),t._v(" "),a("el-radio",{attrs:{label:"财务"}}),t._v(" "),a("el-radio",{attrs:{label:"普通员工"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"性别","label-width":"100px"}},[a("el-radio-group",{model:{value:0==t.selectTable.sex?"男":"女",callback:function(e){t.$set(t.selectTable,"sex==0?'男':'女'",e)},expression:"selectTable.sex==0?'男':'女'"}},[a("el-radio",{attrs:{label:"男"}}),t._v(" "),a("el-radio",{attrs:{label:"女"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"简介","label-width":"100px"}},[a("el-input",{model:{value:t.selectTable.signature,callback:function(e){t.$set(t.selectTable,"signature",e)},expression:"selectTable.signature"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"头像","label-width":"100px"}},[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"http://localhost:80",limit:5,"auto-upload":!0,"on-exceed":t.uploadOverrun,"http-request":t.submitUpload}},[t.selectTable.avatar?a("img",{staticClass:"avatar",attrs:{src:t.selectTable.avatar}}):t._e(),t._v(" "),t.selectTable.avatar?t._e():a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过500kb")])],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.updateShop}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"新增员工"},model:{value:t.dialogFormVisibleadd,callback:function(e){t.dialogFormVisibleadd=e},expression:"dialogFormVisibleadd"}},[a("el-form",{attrs:{model:t.selectTable}},[a("el-form-item",{attrs:{label:"登录账号","label-width":"100px"}},[a("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入手机号"},model:{value:t.selectTable.account,callback:function(e){t.$set(t.selectTable,"account",e)},expression:"selectTable.account"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"姓名","label-width":"100px"}},[a("el-input",{model:{value:t.selectTable.name,callback:function(e){t.$set(t.selectTable,"name",e)},expression:"selectTable.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"角色","label-width":"100px"}},[a("el-radio-group",{model:{value:t.selectTable.role,callback:function(e){t.$set(t.selectTable,"role",e)},expression:"selectTable.role"}},[a("el-radio",{attrs:{label:"超级管理员"}}),t._v(" "),a("el-radio",{attrs:{label:"财务"}}),t._v(" "),a("el-radio",{attrs:{label:"普通员工"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"性别","label-width":"100px"}},[a("el-radio-group",{model:{value:t.selectTable.sex,callback:function(e){t.$set(t.selectTable,"sex",e)},expression:"selectTable.sex"}},[a("el-radio",{attrs:{label:"男"}}),t._v(" "),a("el-radio",{attrs:{label:"女"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"简介","label-width":"100px"}},[a("el-input",{model:{value:t.selectTable.signature,callback:function(e){t.$set(t.selectTable,"signature",e)},expression:"selectTable.signature"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"头像","label-width":"100px"}},[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"http://localhost:80",limit:5,"auto-upload":!0,"on-exceed":t.uploadOverrun,"http-request":t.submitUpload}},[t.selectTable.avatar?a("img",{staticClass:"avatar",attrs:{src:t.selectTable.avatar}}):t._e(),t._v(" "),t.selectTable.avatar?t._e():a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过500kb")])],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisibleadd=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.updateShop}},[t._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]}}});