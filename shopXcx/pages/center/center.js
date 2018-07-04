// pages/center/center.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonetext:"未绑定",
    phonerouter:"phone",
    userInfo:"",
    phone:"",
    qq:" ",
    qqText:"未绑定",
    qqrouter:"qq",
    email:" ",
    emailText:"未绑定",
    emailrouter: "email",
    weixin:" ",
    weixinText:"未绑定",
    weixinrouter: "weixin",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    this.setData({
      userInfo:wx.getStorageSync("userInfo")
    })
    wx.setNavigationBarTitle({ title: '个人资料' })
    if (wx.getStorageSync("email")){
      this.setData({
        emailText: "更改邮箱",
        emailrouter: "email",
        email:wx.getStorageSync("email")
      })
    }
    if (wx.getStorageSync("weixin")) {
      this.setData({
        weixinText: "更改微信号",
        weixinrouter: "weixin",
        weixin: wx.getStorageSync("weixin")
      })
    }
    if (wx.getStorageSync("qq")) {
      this.setData({
        qqText: "更改qq号",
        qqrouter: "qq",
        qq:wx.getStorageSync("qq")
      })
    }
    if (wx.getStorageSync("token") && wx.getStorageSync("user_id")&& wx.getStorageSync("phone")){
      this.setData({
        phonetext:"更改手机号",
        phonerouter:"change_phone",
        phone: wx.getStorageSync("phone")
      })
    }else{
      this.setData({
        phonetext: "绑定手机号",
        phonerouter: "phone"
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  onShow: function () {
    this.setData({
      phone: wx.getStorageSync("phone"),
      qq: wx.getStorageSync("qq"),
      weixin: wx.getStorageSync("weixin"),
      email: wx.getStorageSync("email")
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
  
  }
})