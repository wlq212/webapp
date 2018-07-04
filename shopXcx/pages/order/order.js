// pages/order/order.js
var request = require("../../utils/request");
var url = request.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectcheckbox:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    this.setData({
      orderInfo:options
    })
    wx.setNavigationBarTitle({ title: '确认订单' })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  shutShop: function () {
    var that=this;
    if (that.data.selectcheckbox){
      wx.request({
        url: url + "/mini/add_order",
        data: {
          user_id: wx.getStorageSync('user_id'),
          price: that.data.orderInfo.price,
          sku_id: that.data.orderInfo.id,
          area_id: wx.getStorageSync("area_id"),
          product_attr: that.data.orderInfo.default_value_title,
          shop_name: that.data.orderInfo.name
        },
        method:"POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.error_no == 0) {
            wx.login({
              success:function(response){
                that.loginCode(response.code,res.data.data.sku_desc, res.data.data.order_code)
              }
            }) 
          }
        }
      })
    }
    
  },
  loginCode: function (code,sku_desc,order_code) {
    var that=this;
    wx.request({
      url: url + "/mini/wxlogin",
      method: "POST",
      data: {
        user_id:wx.getStorageSync('user_id'),
        code: code
      },
      success: function (res) {
        if (res.data.error_no == 0) {
          that.payWeixin(res.data.data.openid,sku_desc,order_code)
        }
      }
    })
  },
  payWeixin: function (openid,sku_desc,order_code){

    var that=this;
    wx.request({
      url: url + "/mini/unifiedorder",
      data: {
        pay_type: "weixin",
        body: sku_desc,
        total_fee:that.data.orderInfo.price,
        order_code:order_code,
        is_test:"no",
        openid: openid
      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no == 0) {
          wx.requestPayment({
            nonceStr:res.data.data.nonceStr,
            package:res.data.data.package,
            paySign:res.data.data.paySign,
            signType:res.data.data.signType,
            timeStamp:res.data.data.timeStamp,
            success:function(res){
              wx.navigateBack({
                delta: 1,
              })
            }
          })
        }
      }
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  checkbox:function(){
    var that=this;
    if (!this.data.selectcheckbox){
      that.setData({
        selectcheckbox:true
      })
    }else{
      that.setData({
        selectcheckbox:false
      })
    }
  }

})