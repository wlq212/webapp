webpackJsonp([0],{215:function(t,e,n){n(243);var r=n(90)(n(231),n(251),null,null);t.exports=r.exports},217:function(t,e,n){"use strict";n.d(e,"r",function(){return a}),n.d(e,"e",function(){return s}),n.d(e,"f",function(){return o}),n.d(e,"d",function(){return i}),n.d(e,"g",function(){return u}),n.d(e,"h",function(){return c}),n.d(e,"l",function(){return l}),n.d(e,"j",function(){return f}),n.d(e,"m",function(){return p}),n.d(e,"k",function(){return d}),n.d(e,"n",function(){return m}),n.d(e,"o",function(){return h}),n.d(e,"i",function(){return v}),n.d(e,"b",function(){return g}),n.d(e,"c",function(){return _});var r=n(218),a=function(t){return r.a.post("/admin/login",t)},s=function(t){return r.a.get("/admin/staffs",t)},o=function(t){return r.a.post("/admin/add_staff",t)},i=function(t){return r.a.post("/admin/update_staff",t)},u=function(t){return r.a.get("/admin/withdraw",t)},c=function(t){return r.a.get("/admin/search_withdraw",t)},l=function(t){return r.a.get("/admin/cycle_new_question",t)},f=function(t){return r.a.get("/admin/cycle_old_question",t)},p=function(t){return r.a.get("/admin/cycle_service_question",t)},d=function(t){return r.a.get("/admin/question/search",t)},m=function(t){return r.a.post("/admin/update_question",t)},h=function(t){return r.a.post("/admin/add_answer",t)},v=function(t){return r.a.post("/admin/withdraw",t)},g=function(t){return r.a.get("/admin/online",t)},_=function(t){return r.a.post("/admin/online",t)}},218:function(t,e,n){"use strict";function r(t){return!t||200!==t.status&&304!==t.status&&400!==t.status?{status:!1,msg:"网络异常"}:t}function a(t){return!1===t.status||(t.data&&0!=t.data.error_no?(4==t.data.error_no&&(t.mark=!0),t.status=!1):(t=t.data,t.status=!0)),t}var s=n(95),o=n.n(s),i=n(96),u=n.n(i),c=n(51),l=n.n(c);l.a.interceptors.request.use(function(t){return t},function(t){return u.a.reject(t)}),l.a.interceptors.response.use(function(t){return t},function(t){return u.a.resolve(t.response)}),e.a={post:function(t,e,n){var s;return s="code"===n?"https://micro.5dcfo.com":"https://center.5dcfo.com",l()({method:"POST",baseURL:s,url:t,data:o()(e),timeout:1e4}).then(function(t){return r(t)}).then(function(t){return a(t)})},get:function(t,e){return l()({method:"get",url:"https://center.5dcfo.com"+t,params:e}).then(function(t){return r(t)}).then(function(t){return a(t)})}}},219:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(92),a=n.n(r),s=n(91),o=n.n(s),i=n(50),u=n.n(i),c=n(217),l=n(94),f=n(93);e.default={data:function(){return{status:0,staffs:""}},created:function(){this.$router.push("/"),JSON.parse(f.a.getStore("adminInfo"))?this.$router.push("/manage"):this.$router.push("/"),this.onlineGetes(),this.adminInfo.id||this.getAdminData().then(function(t){console.log(t)})},computed:u()({},n.i(l.b)(["adminInfo"])),methods:u()({},n.i(l.c)(["getAdminData"]),{handleCommand:function(t){var e=this;return o()(a.a.mark(function r(){var s;return a.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if("home"!=t){r.next=4;break}e.$router.push("/manage"),r.next=9;break;case 4:if("singout"!=t){r.next=9;break}return r.next=7,n.i(c.signout)();case 7:s=r.sent,1==s.status?(e.$message({type:"success",message:"退出成功"}),e.$router.push("/")):e.$message({type:"error",message:s.message});case 9:case"end":return r.stop()}},r,e)}))()},onlineGetes:function(){var t=this;return o()(a.a.mark(function e(){var r;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.i(c.b)({staff_id:JSON.parse(f.a.getStore("adminInfo")).staff_id,token:JSON.parse(f.a.getStore("adminInfo")).token});case 2:r=e.sent,0==r.error_no&&(t.staffs=r.data.staffs);case 4:case"end":return e.stop()}},e,t)}))()},onlinePosts:function(){var t=this;return o()(a.a.mark(function e(){var r;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.i(c.c)({staff_id:JSON.parse(f.a.getStore("adminInfo")).staff_id,token:JSON.parse(f.a.getStore("adminInfo")).token,option:t.status});case 2:r=e.sent,0==r.error_no&&(t.staffs=r.data.staffs),2==t.status&&(f.a.removeStore("adminInfo"),t.$router.push("/"));case 5:case"end":return e.stop()}},e,t)}))()}})}},220:function(t,e,n){e=t.exports=n(206)(!1),e.push([t.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.header_container{background-color:#eff2f7;height:60px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;padding-left:20px}.avator{width:36px;height:36px;border-radius:50%;margin-right:37px}.el-dropdown-menu__item{text-align:center}",""])},221:function(t,e,n){var r=n(220);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(207)("69c62082",r,!0)},222:function(t,e,n){n(221);var r=n(90)(n(219),n(223),null,null);t.exports=r.exports},223:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header_container"},[n("el-breadcrumb",{attrs:{separator:"/"}},[n("el-breadcrumb-item",{attrs:{to:{path:"/manage"}}},[t._v("首页")]),t._v(" "),t._l(t.$route.meta,function(e,r){return n("el-breadcrumb-item",{key:"index"},[t._v(t._s(e))])})],2),t._v(" "),n("span",[t._v("当前在线客服："+t._s(t.staffs)+"人")]),t._v(" "),n("div",[n("span",[t._v("我的状态")]),t._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.status,expression:"status"}],on:{change:[function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.status=e.target.multiple?n:n[0]},function(e){t.onlinePosts()}]}},[n("option",{attrs:{value:"0"}},[t._v("在线")]),t._v(" "),n("option",{attrs:{value:"1"}},[t._v("挂起")]),t._v(" "),n("option",{attrs:{value:"2"}},[t._v("退出")])])])],1)},staticRenderFns:[]}},231:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(92),a=n.n(r),s=n(91),o=n.n(s),i=n(222),u=n.n(i),c=n(217);e.default={data:function(){return{tableData:[{registe_time:"2016-05-02",username:"王小虎",city:"上海市普陀区金沙江路 1518 弄"},{registe_time:"2016-05-04",username:"王小虎",city:"上海市普陀区金沙江路 1517 弄"},{registe_time:"2016-05-01",username:"王小虎",city:"上海市普陀区金沙江路 1519 弄"},{registe_time:"2016-05-03",username:"王小虎",city:"上海市普陀区金沙江路 1516 弄"}],currentRow:null,input23:"",selectModel:"",offset:0,limit:20,count:0,currentPage:1}},components:{headTop:u.a},created:function(){this.initData()},methods:{initData:function(){var t=this;return o()(a.a.mark(function e(){var r;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.i(c.getUserCount)();case 3:if(r=e.sent,1!=r.status){e.next=8;break}t.count=r.count,e.next=9;break;case 8:throw new Error("获取数据失败");case 9:t.getUsers(),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log("获取数据失败",e.t0);case 15:case"end":return e.stop()}},e,t,[[0,12]])}))()},handleSizeChange:function(t){console.log("每页 "+t+" 条")},handleCurrentChange:function(t){this.currentPage=t,this.offset=(t-1)*this.limit,this.getUsers()},getUsers:function(){var t=this;return o()(a.a.mark(function e(){var r;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.i(c.getUserList)({offset:t.offset,limit:t.limit});case 2:r=e.sent,t.tableData=[],r.forEach(function(e){var n={};n.username=e.username,n.registe_time=e.registe_time,n.city=e.city,t.tableData.push(n)});case 5:case"end":return e.stop()}},e,t)}))()}}}},235:function(t,e,n){e=t.exports=n(206)(!1),e.push([t.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.table_container{padding:20px}.formInput{width:30%;margin:20px 0}.optionSelected{width:110px}",""])},243:function(t,e,n){var r=n(235);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(207)("85b4789a",r,!0)},251:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"fillcontain"},[n("head-top"),t._v(" "),n("div",{staticClass:"table_container",staticStyle:{"margin-top":"-20px"}},[n("div",{staticClass:"formInput"},[n("div",{staticStyle:{"margin-top":"15px"}},[n("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容","prefix-icon":"el-icon-search"},model:{value:t.input23,callback:function(e){t.input23=e},expression:"input23"}},[n("el-select",{staticClass:"optionSelected",attrs:{slot:"prepend",placeholder:"请选择"},slot:"prepend",model:{value:t.selectModel,callback:function(e){t.selectModel=e},expression:"selectModel"}},[n("el-option",{attrs:{label:"餐厅名",value:"1"}}),t._v(" "),n("el-option",{attrs:{label:"订单号",value:"2"}}),t._v(" "),n("el-option",{attrs:{label:"用户电话",value:"3"}})],1),t._v(" "),n("el-button",{attrs:{slot:"append",icon:"el-icon-search"},slot:"append"},[t._v("查询")])],1)],1)]),t._v(" "),n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"highlight-current-row":""}},[n("el-table-column",{attrs:{type:"index",width:"100",label:"序号"}}),t._v(" "),n("el-table-column",{attrs:{property:"registe_time",label:"提问用户",width:"220"}}),t._v(" "),n("el-table-column",{attrs:{property:"username",label:"姓名",width:"220"}}),t._v(" "),n("el-table-column",{attrs:{property:"city",label:"历史提问"}}),t._v(" "),n("el-table-column",{attrs:{property:"city",label:"累计赔付金额"}}),t._v(" "),n("el-table-column",{attrs:{property:"city",label:"评价次数"}}),t._v(" "),n("el-table-column",{attrs:{property:"city",label:"账号状态"}}),t._v(" "),n("el-table-column",{attrs:{property:"city",label:"跟进备注"}}),t._v(" "),n("el-table-column",{attrs:{property:"city",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){t.handleEdit(e.$index,e.row)}}},[t._v("取消置顶")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"Success"},on:{click:function(n){t.addFood(e.$index,e.row)}}},[t._v("禁用账号")])]}}])})],1),t._v(" "),n("div",{staticClass:"Pagination",staticStyle:{"text-align":"left","margin-top":"10px"}},[n("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":20,layout:"total, prev, pager, next",total:t.count},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]}}});