webpackJsonp([2],{211:function(t,e,n){n(241);var a=n(90)(n(227),n(249),null,null);t.exports=a.exports},217:function(t,e,n){"use strict";n.d(e,"r",function(){return r}),n.d(e,"e",function(){return o}),n.d(e,"f",function(){return i}),n.d(e,"d",function(){return s}),n.d(e,"g",function(){return l}),n.d(e,"h",function(){return u}),n.d(e,"l",function(){return c}),n.d(e,"j",function(){return d}),n.d(e,"m",function(){return p}),n.d(e,"k",function(){return f}),n.d(e,"n",function(){return m}),n.d(e,"o",function(){return g}),n.d(e,"i",function(){return h}),n.d(e,"b",function(){return _}),n.d(e,"c",function(){return v});var a=n(218),r=function(t){return a.a.post("/admin/login",t)},o=function(t){return a.a.get("/admin/staffs",t)},i=function(t){return a.a.post("/admin/add_staff",t)},s=function(t){return a.a.post("/admin/update_staff",t)},l=function(t){return a.a.get("/admin/withdraw",t)},u=function(t){return a.a.get("/admin/search_withdraw",t)},c=function(t){return a.a.get("/admin/cycle_new_question",t)},d=function(t){return a.a.get("/admin/cycle_old_question",t)},p=function(t){return a.a.get("/admin/cycle_service_question",t)},f=function(t){return a.a.get("/admin/question/search",t)},m=function(t){return a.a.post("/admin/update_question",t)},g=function(t){return a.a.post("/admin/add_answer",t)},h=function(t){return a.a.post("/admin/withdraw",t)},_=function(t){return a.a.get("/admin/online",t)},v=function(t){return a.a.post("/admin/online",t)}},218:function(t,e,n){"use strict";function a(t){return!t||200!==t.status&&304!==t.status&&400!==t.status?{status:!1,msg:"网络异常"}:t}function r(t){return!1===t.status||(t.data&&0!=t.data.error_no?(4==t.data.error_no&&(t.mark=!0),t.status=!1):(t=t.data,t.status=!0)),t}var o=n(95),i=n.n(o),s=n(96),l=n.n(s),u=n(51),c=n.n(u);c.a.interceptors.request.use(function(t){return t},function(t){return l.a.reject(t)}),c.a.interceptors.response.use(function(t){return t},function(t){return l.a.resolve(t.response)}),e.a={post:function(t,e,n){var o;return o="code"===n?"https://micro.5dcfo.com":"https://center.5dcfo.com",c()({method:"POST",baseURL:o,url:t,data:i()(e),timeout:1e4}).then(function(t){return a(t)}).then(function(t){return r(t)})},get:function(t,e){return c()({method:"get",url:"https://center.5dcfo.com"+t,params:e}).then(function(t){return a(t)}).then(function(t){return r(t)})}}},219:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(92),r=n.n(a),o=n(91),i=n.n(o),s=n(50),l=n.n(s),u=n(217),c=n(94),d=n(93);e.default={data:function(){return{status:0,staffs:""}},created:function(){this.$router.push("/"),JSON.parse(d.a.getStore("adminInfo"))?this.$router.push("/manage"):this.$router.push("/"),this.onlineGetes(),this.adminInfo.id||this.getAdminData().then(function(t){console.log(t)})},computed:l()({},n.i(c.b)(["adminInfo"])),methods:l()({},n.i(c.c)(["getAdminData"]),{handleCommand:function(t){var e=this;return i()(r.a.mark(function a(){var o;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if("home"!=t){a.next=4;break}e.$router.push("/manage"),a.next=9;break;case 4:if("singout"!=t){a.next=9;break}return a.next=7,n.i(u.signout)();case 7:o=a.sent,1==o.status?(e.$message({type:"success",message:"退出成功"}),e.$router.push("/")):e.$message({type:"error",message:o.message});case 9:case"end":return a.stop()}},a,e)}))()},onlineGetes:function(){var t=this;return i()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.i(u.b)({staff_id:JSON.parse(d.a.getStore("adminInfo")).staff_id,token:JSON.parse(d.a.getStore("adminInfo")).token});case 2:a=e.sent,0==a.error_no&&(t.staffs=a.data.staffs);case 4:case"end":return e.stop()}},e,t)}))()},onlinePosts:function(){var t=this;return i()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.i(u.c)({staff_id:JSON.parse(d.a.getStore("adminInfo")).staff_id,token:JSON.parse(d.a.getStore("adminInfo")).token,option:t.status});case 2:a=e.sent,0==a.error_no&&(t.staffs=a.data.staffs),2==t.status&&(d.a.removeStore("adminInfo"),t.$router.push("/"));case 5:case"end":return e.stop()}},e,t)}))()}})}},220:function(t,e,n){e=t.exports=n(206)(!1),e.push([t.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.header_container{background-color:#eff2f7;height:60px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;padding-left:20px}.avator{width:36px;height:36px;border-radius:50%;margin-right:37px}.el-dropdown-menu__item{text-align:center}",""])},221:function(t,e,n){var a=n(220);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(207)("69c62082",a,!0)},222:function(t,e,n){n(221);var a=n(90)(n(219),n(223),null,null);t.exports=a.exports},223:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header_container"},[n("el-breadcrumb",{attrs:{separator:"/"}},[n("el-breadcrumb-item",{attrs:{to:{path:"/manage"}}},[t._v("首页")]),t._v(" "),t._l(t.$route.meta,function(e,a){return n("el-breadcrumb-item",{key:"index"},[t._v(t._s(e))])})],2),t._v(" "),n("span",[t._v("当前在线客服："+t._s(t.staffs)+"人")]),t._v(" "),n("div",[n("span",[t._v("我的状态")]),t._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.status,expression:"status"}],on:{change:[function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.status=e.target.multiple?n:n[0]},function(e){t.onlinePosts()}]}},[n("option",{attrs:{value:"0"}},[t._v("在线")]),t._v(" "),n("option",{attrs:{value:"1"}},[t._v("挂起")]),t._v(" "),n("option",{attrs:{value:"2"}},[t._v("退出")])])])],1)},staticRenderFns:[]}},227:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(92),r=n.n(a),o=n(91),i=n.n(o),s=n(222),l=n.n(s),u=n(93),c=n(217);e.default={data:function(){return{input23:"",selectModel:"",city:{},offset:1,limit:20,count:0,counts:0,countTj:0,countsTj:0,tableData:[],file:" ",activeOne:1,questions_id:"",tableTwo:!1,tableOne:!0,tableOneTj:!1,tableTwoTj:!1,currentPage:1,currentPageTj:1,currentPages:1,currentPagesTj:1,selectTable:{avatar:""},dialogFormVisible:!1,tableDatas:[],dialogFormVisibleadd:!1,categoryOptions:[],selectedCategory:[],address:{},serachTjInput:"",question_type:"1",intervals:"",detail:"",dialogFormDetial:!1}},created:function(){this.initData()},components:{headTop:l.a},methods:{initData:function(){var t=this;return i()(r.a.mark(function e(){var n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=t,n.getOldResturants();case 2:case"end":return e.stop()}},e,t)}))()},add0:function(t){return t<10?"0"+t:t},timeFormat:function(t){return new Date(1e3*parseInt(t)).toLocaleString().replace(/:\d{1,2}$/," ")},handleSizeChange:function(t){console.log("每页 "+t+" 条")},handleCurrentChange:function(t){this.serachTjInput?(this.currentPageTj=t,this.searchTjOne()):(this.currentPage=t,this.getOldResturants())},modelDetial:function(t){event.cancelBubble=!0,this.dialogFormDetial=!0,this.detail=t,this.detail.timesc=this.timeDefference(t.start_time,t.end_time)},getOldResturants:function(){var t=this;return i()(r.a.mark(function e(){var a,o;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t,e.next=3,n.i(c.j)({staff_id:JSON.parse(u.a.getStore("adminInfo")).staff_id,token:JSON.parse(u.a.getStore("adminInfo")).token,page:t.currentPage,page_range:t.limit});case 3:o=e.sent,console.log(o),t.tableData=[],0==o.error_no?(a.count=o.data.total,o.data.questions.forEach(function(e){var n={};n.name=e.name,n.id=e.question_id,n.start_time=e.start_time,n.end_time=e.end_time,n.timestamp=e.timestamp,n.question_time=e.question_time,n.history_questions=e.history_questions,n.phone=e.phone,n.title=e.title,n.content=e.content,n.comment=e.comment,n.answer_id=e.answer_id,n.answer=e.answer,n.damage_status=e.damage_status,n.status=e.status,t.tableData.push(n)})):(a.count=0,4==o.data.error_no?t.$message({type:"error",message:"数据不存在"}):t.$message({type:"error",message:"查询失败"}));case 7:case"end":return e.stop()}},e,t)}))()},timeDefference:function(t,e){var n,a,r,o=new Date(1e3*t),i=new Date(1e3*e);return i.getFullYear()-o.getFullYear()>0?i.getFullYear()-o.getFullYear()+"年":"0年",i.getMonth()-o.getMonth()>0?i.getMonth()-o.getMonth()+"月":"0月",i.getDate()-o.getDate()>0?i.getDate()-o.getDate()+"日":"0日",n=i.getHours()-o.getHours()>0?i.getHours()-o.getHours()+"小时":"0时",a=i.getMinutes()-o.getMinutes()>0?i.getMinutes()-o.getMinutes()+"分钟":"0分",r=i.getSeconds()-o.getSeconds()>0?i.getSeconds()-o.getSeconds()+"秒":"0秒",n+":"+a+":"+r},searchTjOne:function(){var t=this;return i()(r.a.mark(function e(){var a,o;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t,e.next=3,n.i(c.k)({staff_id:JSON.parse(u.a.getStore("adminInfo")).staff_id,token:JSON.parse(u.a.getStore("adminInfo")).token,condition:t.serachTjInput,question_type:0,page:t.currentPageTj,page_range:t.limit});case 3:o=e.sent,t.tableData=[],0==o.error_no?(a.count=o.data.total,o.data.questions.forEach(function(t){var e={};e.name=t.name,e.id=t.question_id,e.start_time=t.start_time,e.end_time=t.end_time,e.timestamp=t.timestamp,e.phone=t.phone,e.title=t.title,e.question_time=t.question_time,e.history_questions=t.history_questions,e.content=t.content,e.comment=t.comment,e.answer_id=t.answer_id,e.answer=t.answer,e.damage_status=t.damage_status,e.status=t.status,a.tableData.push(e)})):(a.count=0,4==o.error_no?t.$message({type:"error",message:"数据不存在"}):t.$message({type:"error",message:"查询失败"}));case 6:case"end":return e.stop()}},e,t)}))()}}}},233:function(t,e,n){e=t.exports=n(206)(!1),e.push([t.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.demo-table-expand{font-size:0}.demo-table-expand label{width:90px;color:#99a9bf}.active{border:1px solid #54bdf9;color:#54bdf9}.demo-table-expand .el-form-item{margin-right:0;margin-bottom:0;width:50%}.table_container{padding:20px}.Pagination{display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;margin-top:8px}.el-table .warning-row{background:oldlace}.avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader .el-upload:hover{border-color:#20a0ff}.avatar-uploader-icon{font-size:28px;color:#8c939d;width:120px;height:120px;line-height:120px;text-align:center}.avatar{width:120px;height:120px;display:block}.formInput{width:30%;margin:20px 0}.optionSelected{width:110px}",""])},241:function(t,e,n){var a=n(233);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(207)("1b2a2610",a,!0)},249:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"fillcontain"},[n("head-top"),t._v(" "),n("div",{staticClass:"table_container",staticStyle:{"margin-top":"-20px"}},[n("div",{staticClass:"formInput",staticStyle:{width:"800px"}},[n("div",{staticStyle:{"margin-top":"15px",display:"inline-block"}},[n("el-input",{staticClass:"input-with-select",attrs:{placeholder:"手机号或者名字","prefix-icon":"el-icon-search"},model:{value:t.serachTjInput,callback:function(e){t.serachTjInput=e},expression:"serachTjInput"}},[n("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(e){t.searchTjOne()}},slot:"append"},[t._v("查询")])],1)],1)]),t._v(" "),n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData},on:{"row-click":t.modelDetial}},[n("el-table-column",{attrs:{label:"提问时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                    "+t._s(e.row.question_time)+"\n                ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"询问用户",prop:"phone"}}),t._v(" "),n("el-table-column",{attrs:{label:"姓名",prop:"name"}}),t._v(" "),n("el-table-column",{attrs:{label:"历史提问",prop:"history_questions"}}),t._v(" "),n("el-table-column",{attrs:{label:"提问内容",prop:"title"}}),t._v(" "),n("el-table-column",{attrs:{label:"赔付状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                    "+t._s(0==e.row.damage_status?"未赔付":"已赔付")+"\n                ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"服务状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                    "+t._s("已经完成")+"\n                ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"服务评价",prop:"comment"}})],1),t._v(" "),n("div",{staticClass:"Pagination"},[n("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":20,layout:"total, prev, pager, next",total:t.count},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),n("el-dialog",{attrs:{title:"问题详情"},model:{value:t.dialogFormDetial,callback:function(e){t.dialogFormDetial=e},expression:"dialogFormDetial"}},[n("el-form",[n("el-form-item",{attrs:{label:"问题Id","label-width":"100px"}},[n("el-input",{model:{value:t.detail.id,callback:function(e){t.$set(t.detail,"id",e)},expression:"detail.id"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"提问时间","label-width":"100px"}},[n("el-input",{model:{value:t.detail.question_time,callback:function(e){t.$set(t.detail,"question_time",e)},expression:"detail.question_time"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"询问用户","label-width":"100px"}},[n("el-input",{model:{value:t.detail.phone,callback:function(e){t.$set(t.detail,"phone",e)},expression:"detail.phone"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"姓名","label-width":"100px"}},[n("el-input",{model:{value:t.detail.name,callback:function(e){t.$set(t.detail,"name",e)},expression:"detail.name"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"历史提问","label-width":"100px"}},[n("el-input",{model:{value:t.detail.history_questions,callback:function(e){t.$set(t.detail,"history_questions",e)},expression:"detail.history_questions"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"提问内容标题","label-width":"100px"}},[n("el-input",{model:{value:t.detail.title,callback:function(e){t.$set(t.detail,"title",e)},expression:"detail.title"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"提问内容","label-width":"100px"}},[n("el-input",{model:{value:t.detail.content,callback:function(e){t.$set(t.detail,"content",e)},expression:"detail.content"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"赔付状态","label-width":"100px"}},[n("el-input",{model:{value:0==t.detail.damage_status?"未赔付":"已赔付",callback:function(e){t.$set(t.detail,"damage_status==0?'未赔付':'已赔付'",e)},expression:"detail.damage_status==0?'未赔付':'已赔付'"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"服务状态","label-width":"100px"}},[n("el-input",{model:{value:0==t.detail.status?"未开始":1==t.detail.status?"服务中":"已经完成",callback:function(e){t.$set(0==t.detail.status?"未开始":t.detail,"status==1?'服务中':'已经完成'",e)},expression:"detail.status==0?'未开始':detail.status==1?'服务中':'已经完成'"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"服务评价","label-width":"100px"}},[n("el-input",{model:{value:t.detail.comment,callback:function(e){t.$set(t.detail,"comment",e)},expression:"detail.comment"}})],1)],1)],1)],1)],1)},staticRenderFns:[]}}});