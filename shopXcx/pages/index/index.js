//index.js
//获取应用实例
const app = getApp()
var request = require("../../utils/request");
var url = request.url;

Page({
  data: {
    openPicker: false,
    needAnimation: false,
    indicatorDots: true,
    autoplay: true,
    animation:"",
    bollonee:false,
    indexHome: true, 
    showpick:false,
    area_name:"深圳",
    oderList:"phone",
    id:"11",
    startShow:false,
    areaId:"",
    pickobj:"",
    pickobjId:"",
    AboutHome:true,
    interval: 3000,
    duration: 1000,
    showModal: false,
    banner_list: wx.getStorageSync("banner_list"),
    article_list: wx.getStorageSync("article_list"),
    phoneText:"未绑定手机",
    commend_list: wx.getStorageSync("commend_list"),
    motto: 'Hello World',
    userInfo: {},
    menuShow:false,
    about:true,
    loginFt:false,
    hasUserInfo: false,
    banners:[{
      businessId:"1001",
      picUrl:"../../image/home_banner1@2x.png"
    }, {
      businessId: "1002",
      picUrl: "../../image/home_banner1@2x.png"
    }],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 跳转小助手
  skipCwgXzs:function(){
    console.log(11)
    wx.navigateToMiniProgram({
      appId: 'wx51098ea10318f340',
      path: 'pages/index/index',

      success() {
        console.log("打开成功");
      },
      fail() {
        console.log("打开失败");
      }
    })
  },
  onGotUserInfo: function (e) {
    var that = this;
    that.setData({
      userInfo: e.detail.userInfo
    })
    wx.setStorageSync("userInfo", e.detail.userInfo)
    that.setData({
      startShow:true
    })
    // 登录

  },

  imageLoad: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = 750,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 750 / ratio;    //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },
  onShow:function(){
    this.setData({
    
      userInfo: wx.getStorageSync("userInfo")
    })
    if (wx.getStorageSync("phone")) {
      this.setData({
        phoneText: wx.getStorageSync("phone")
      })
    }
    if (wx.getStorageSync('user_id')) {
      this.setData({
        oderList: "orderList"
      })
    }
  },
  onLoad: function () {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 可使用窗口宽度、高度
        console.log('height=' + res.windowHeight);
        // 计算主体部分高度,单位为px
        that.setData({
          srollheight: res.windowHeight-50
        })
      }
    })
    wx.showShareMenu({
      withShareTicket: true
    })
    setInterval(function(){
      that.timeShi()
    },1000)
    
    if (wx.getStorageSync("userInfo")){
      this.setData({
        startShow:true
      })
    }
    if(wx.getStorageSync('user_id')){
      this.setData({
        oderList:"orderList"
      })
    }
    if(wx.getStorageSync("phone")){
      this.setData({
        phoneText: wx.getStorageSync("phone")
      })
    }

    var that=this;
    wx.setNavigationBarTitle({ title: '我的财务官' })
    this.getAreaList()
    
  },
  Index:function(e){
    wx.setNavigationBarTitle({ title: '我的财务官' })
    this.setData({
      menuShow: false,
      indexHome:true,
      AboutHome:true
    })
  },
  getAreaList:function(){
    var that=this;
   var obj=[];
   var obj1=[];

    wx.request({
      url: url + "/mini/get_area_list",
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no==0) {
          for (var a = 0; a < res.data.data.area_list.length;a++){
            obj.push(res.data.data.area_list[a].area_name)
            obj1.push(res.data.data.area_list[a].area_id)
          }
          that.setData({
            area_list:res.data.data.area_list,
            pickobj:obj,
            pickobjId:obj1
          })
         that.setData({
           areaId: obj1[0]
         })
         that.IndexRequest()
        }
      }
    })
    
  },
  IndexRequest:function(){
    var that=this;
    wx.setStorageSync("area_id", that.data.areaId)
    wx.request({
      url: url + "/mini/home_page",
      data: {
        area_id: that.data.areaId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no==0) {
          that.setData({
        banner_list: res.data.data.banner_list,
        article_list: res.data.data.article_list,
        commend_list: res.data.data.commend_list
          })
          wx.setStorageSync("banner_list",res.data.data.banner_list)
          wx.setStorageSync("article_list",res.data.data.article_list)
          wx.setStorageSync("commend_list",res.data.data.commend_list)
        }
      }
    })
  },
  About:function(e){
    wx.setNavigationBarTitle({ title: '个人中心' })
    this.setData({
      menuShow:true,
      AboutHome:false,
      indexHome:false
    })
  }, 
  moreService:function(e){
    wx.navigateTo({
      url: '/pages/moreService/moreService',
      success: function () {

      },
      fail: function () {

      },
      completefu: function () {

      }
    })
  },
  skipmoreService:function(e){
    wx.navigateTo({
      url: "/pages/productName/productName?id=" + e.currentTarget.dataset.id
    })
  },
  skipArticleDetail:function(e){
    wx.navigateTo({
      url: "/pages/article/article?id=" + e.currentTarget.dataset.id
    })
  },
  //事件处理函数
  swiperchange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  moreArticle:function(e){
    wx.navigateTo({
      url: '/pages/moreArticle/moreArticle',
      success: function () {
    
      },
      fail: function () {

      },
      completefu: function () {

      }
    })
  },
  moreAbout:function(e){
     wx.navigateTo({
       url:'/pages/moreAbout/moreAbout', 
       success:function() { 

       },       
       fail:function(){ 

       },         
      completefu:function(){ 
     
      }
     })
  },
  preventTouchMove: function () {
   
  },
  percenter:function(){
    wx.navigateTo({
      url: "/pages/center/center"
    })
  },
  bindPickerChange:function(e){
    if (!this.data.needAnimation){
      this.setData({
        needAnimation: true
      })
      var that = this;
      that.setData({
        showpick: true
      })
    }else{
      var that = this;
      this.setData({
        needAnimation: false
      })

      
    }
    
   
    
    
  },
  timeShi:function(){
    /**  
     * 周六周天 自己计算  
     * 大放假或者调休  
     * 2月4日至10  
     * 4月5日至7 4月29日至5月1日  
     * @type {Array}  
     *  
     * 主要是调休不好弄， 不确定调休的时间  
     */
    var bigWeekDay = ['20180101', '20180215', '20180216', '20180217', '20180218', '20180219', '20180220', '20180221',
      '20180405', '20180406', '20180407', '20180429', '20180430', '20180501', '20180618', '20180924',
      '20181001', '20181002', '20181003', '20181004', '20181005', '20181006', '20181007', '20181231',

      '20190101', '20190204', '20190205', '20190206', '20190207', '20190208', '20190209', '20190210',
      '20190405', '20190406', '20190407', '20190429', '20190430', '20190501', '20190617', '20190913',
      '20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007',
    ];

    /**  
     * 2月11日(星期日)、2月24  4月8日(星期日)上班 4月28日(星期六)上  9月29日(星期六)、9月30  
     * @type {[string]}  
     */
    var tiaoxiu = ['20180211', '20180224', '20180408', '20180428', '20180929', '20180930', '20181229',

      '20190202', '20190203', '20190427', '20190428',

    ];
    var month="";
    var day="";
    var year=new Date().getFullYear();

    if(new Date().getMonth()+1<10){
      month = "0" + (new Date().getMonth() + 1)
    }else{
      month = new Date().getMonth() + 1;
    }
    if (new Date().getDate()<10){
      day = "0" +new Date().getDate()
    }else{
      day = new Date().getDate();
    }
   var bollonee=this.judgeNextWeekCanGet(new Date(year+"-"+month+"-"+day), bigWeekDay, tiaoxiu)
   this.setData({
     bollonee: bollonee
   })
   


    /**  
     *  
     * @param timeStamp  输入一个时间对象， 判断该天是否为工作日  
     * @returns {boolean}  false 休息   true 工作  
     */
    
  },
  aboutTime:function(){
   wx.navigateTo({
     url: '/pages/timeAbout/timeAbout',
     success: function(res) {},
     fail: function(res) {},
     complete: function(res) {},
   })
  },
  judgeNextWeekCanGet: function (timeStamp,bigWeekDay, tiaoxiu) {
    if(timeStamp == 'undefine' || timeStamp == '') {
      timeStamp = new Date();
    }

      var isWeek = timeStamp.getDay(); //0 周日  6周六  

    var y = timeStamp.getFullYear();
    var m = timeStamp.getMonth() + 1;
    m = m < 10 ? '0' + m : '' + m;
    var d = timeStamp.getDate() < 10 ? '0' + timeStamp.getDate() : '' + timeStamp.getDate();
    

    var ymd = y + m + d;

      //判断是否为调休日 必定是工作日  
      if (tiaoxiu.indexOf(ymd) > -1) {
      return true;
    }
      //判断是否为假期 必定休息  
      if (bigWeekDay.indexOf(ymd) > -1) {
      return false;
    }
      //判断是否为周六周天  
      if (isWeek == 0 || isWeek == 6) {
      return false
    }
    if (new Date().getHours() < 9 || new Date().getHours() >= 19){
        return false;
    }
      return true;
  },
  aboutme:function(){
    this.setData({
      consulte:true
    })
    this.setData({
      consulte:false
    })
  },
  slelctCityle:function(e){
    var that=this;
    this.setData({
      showpick: false,
      area_name: e.target.dataset.cityname,
      areaId: e.target.dataset.cityid
    })
    that.IndexRequest()
  },
  pickShowHidden:function(){
    this.setData({
      showpick: false
    })
  },
  tapBanner:function(e){
    if (e.currentTarget.dataset.id){
      wx.navigateTo({
        url: "/pages/productName/productName?id=" + e.currentTarget.dataset.id
      })
    }else{
      wx.navigateTo({
        url: "/pages/moreAbout/moreAbout"
      })
    }
   
  }
})
