// pages/productName/productName.js
var request = require("../../utils/request");
var url = request.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:"",
    bollonee: false,
    get_product_detail: wx.getStorageSync("get_product_detail"),
    arr:[
      {
        attribute_value_id:"1001",
        attribute_value_name:"有限公司"
      },
      {
        attribute_value_id: "1002",
        attribute_value_name: "个体户"
      },
      {
        attribute_value_id: "1003",
        attribute_value_name: "合伙公司"
      },
      {
        attribute_value_id: "1004",
        attribute_value_name: "外资公司"
      }
    ],
    arr1: [
      {
        attribute_value_id: "1001",
        attribute_value_name: "福田区"
      },
      {
        attribute_value_id: "1002",
        attribute_value_name: "南山区"
      },
      {
        attribute_value_id: "1003",
        attribute_value_name: "龙华区"
      },
      {
        attribute_value_id: "1004",
        attribute_value_name: "盐田区"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    setInterval(function () {
      that.timeShi()
    }, 1000)
    this.requestProduct(options.id)
    wx.setNavigationBarTitle({ title: '商品详情' })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  requestProduct: function (sku_id){
    var that=this;
     wx.request({
       url: url + "/mini/get_product_detail",
       data: {
         sku_id:sku_id
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       success: function (res) {
         if (res.data.error_no == 0) {
           that.setData({
             get_product_detail: res.data.data.product_info
           })
           wx.setStorageSync("get_product_detail", res.data.data.product_info)
           if (res.data.data.product_info.default_attr[0]){
             that.setData({
               id: res.data.data.product_info.default_attr[0]
             })
           }
           if (res.data.data.product_info.default_attr[1]) {
             that.setData({
               id1: res.data.data.product_info.default_attr[1]
             })
           }
           if (res.data.data.product_info.default_attr[2]) {
             that.setData({
               id2: res.data.data.product_info.default_attr[2]
             })
           }
           if (res.data.data.product_info.default_attr[3]) {
             that.setData({
               id3: res.data.data.product_info.default_attr[3]
             })
           }
           if (res.data.data.product_info.default_attr[4]) {
             that.setData({
               id4: res.data.data.product_info.default_attr[4]
             })
           }
           if (res.data.data.product_info.default_attr[5]) {
             that.setData({
               id5: res.data.data.product_info.default_attr[5]
             })
           }
           if (res.data.data.product_info.default_attr[6]) {
             that.setData({
               id6: res.data.data.product_info.default_attr[6]
             })
           }
           if (res.data.data.product_info.default_attr[7]) {
             that.setData({
               id7: res.data.data.product_info.default_attr[7]
             })
           }
           if (res.data.data.product_info.default_attr[8]) {
             that.setData({
               id8: res.data.data.product_info.default_attr[8]
             })
           }
           if (res.data.data.product_info.default_attr[9]) {
             that.setData({
               id9: res.data.data.product_info.default_attr[9]
             })
           }


         }
       }
     })
   },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },
   requestService:function(){

   },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  timeShi: function () {
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
    var month = "";
    var day = "";
    var year = new Date().getFullYear();

    if (new Date().getMonth() + 1 < 10) {
      month = "0" + (new Date().getMonth() + 1)
    } else {
      month = new Date().getMonth() + 1;
    }
    if (new Date().getDate() < 10) {
      day = "0" + new Date().getDate()
    } else {
      day = new Date().getDate();
    }
    var bollonee = this.judgeNextWeekCanGet(new Date(year + "-" + month + "-" + day), bigWeekDay, tiaoxiu)
    this.setData({
      bollonee: bollonee
    })



    /**  
     *  
     * @param timeStamp  输入一个时间对象， 判断该天是否为工作日  
     * @returns {boolean}  false 休息   true 工作  
     */

  },
  aboutTime: function () {
    wx.navigateTo({
      url: '/pages/timeAbout/timeAbout',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  judgeNextWeekCanGet: function (timeStamp, bigWeekDay, tiaoxiu) {
    if (timeStamp == 'undefine' || timeStamp == '') {
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
    if (new Date().getHours() < 9 || new Date().getHours() >= 19) {
      return false;
    }
    return true;
  },
  typeButton0:function(e){
    this.setData({
      id:e.target.id
    })
    this.requestPrice()

  },
  typeButton1:function(e){
    this.setData({
      id1: e.target.id
    })
    this.requestPrice()
  },
  typeButton2:function(e) {
    this.setData({
      id2: e.target.id
    })
    this.requestPrice()
  },
  typeButton3: function (e) {
    this.setData({
      id3: e.target.id
    })
    this.requestPrice()
  },
  typeButton4: function (e) {
    this.setData({
      id4: e.target.id
    })
    this.requestPrice()
  },
  typeButton5: function (e) {
    this.setData({
      id5: e.target.id
    })
    this.requestPrice()
  },
  typeButton6: function (e) {
    this.setData({
      id6: e.target.id
    })
    this.requestPrice()
  },
  typeButton7: function (e) {
    this.setData({
      id7: e.target.id
    })
    this.requestPrice()
  },
  typeButton8: function (e) {
    this.setData({
      id8: e.target.id
    })
    this.requestPrice()
  },
  typeButton9: function (e) {
    this.setData({
      id9: e.target.id
    })
    this.requestPrice()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  requestPrice:function(){
    var that=this;
    var arr = [this.data.id, this.data.id1, this.data.id2, this.data.id3, this.data.id4, this.data.id5, this.data.id6, this.data.id7, this.data.id8, this.data.id9];
     var arr1=arr.filter(item => item);
     var attr_values = arr1.join("@")+"@";
     wx.request({
       url: url + "/mini/get_price",
       data: {
         attr_values: attr_values,
         area_id: wx.getStorageSync("area_id")
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       success: function (res) {
         if (res.data.error_no==0){
           that.setData({
             get_product_detail: res.data.data.product_info
           })
         }
       }
     })
  },
  imageLoad: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = 750,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 750 / ratio;    //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image= {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  skipOrder:function(e){
    var that=this;
    if (wx.getStorageSync("area_id") && wx.getStorageSync("token") && wx.getStorageSync("user_id")){
      if (that.data.get_product_detail.default_value_title){
        wx.navigateTo({
          url: "/pages/order/order?id=" + e.target.dataset.id + "&price=" + that.data.get_product_detail.sku_price + "&markprice=" + that.data.get_product_detail.market_value + "&name=" + that.data.get_product_detail.name + "&cover_image=" + that.data.get_product_detail.cover_image + "&default_value_title=" + that.data.get_product_detail.default_value_title.join("-")
        })
      }else{
        wx.navigateTo({
          url: "/pages/order/order?id=" + e.target.dataset.id + "&price=" + that.data.get_product_detail.sku_price + "&markprice=" + that.data.get_product_detail.market_value + "&name=" + that.data.get_product_detail.name + "&cover_image=" + that.data.get_product_detail.cover_image 
        })
      }
     
    }else{
      wx.navigateTo({
        url: "/pages/phone/phone"
      })
    }
   
  }
})