// pages/phone/phone.js
const app = getApp()
var request = require("../../utils/request");
var url = request.url;
var certificationUrl = request.certificationUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countdown: 60,
    code: "",
    phone: "",
    codeTime: "获取验证码",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '更改手机' })
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
  settime() {
    var that = this;
    if (that.data.countdown == 0) {
      that.setData({
        disabled: false,
        codeTime: "获取验证码"
      })
      that.setData({
        countdown: 60
      })
      return;
    } else {
      that.setData({
        disabled: true,
        countdown: that.data.countdown,
        codeTime: "倒计时" + that.data.countdown + "s"
      })
      that.data.countdown--;
    }
    var timeout = setTimeout(function () {
      that.settime();
    }, 1000)
    that.setData({
      timeout: timeout
    })
  },
  certificationButton() {
    this.sendeCode()
  },
  sendeCode() {
    var that = this;
    if ((/^1[34578]\d{9}$/.test(that.data.phone))) {
      that.setData({
        error: "",
        disabled: true,
      })
      wx.request({
        url: certificationUrl + 'sendmsg_server/send_code',
        method: "POST",
        data: {
          phone: that.data.phone,
          send_type: 'website_register'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res)
          if (res.data.error_no == 0) {
            that.settime()

          }
        }
      })
    } else {
      that.setData({
        error: "手机号码格式不正确"
      })
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  updatePhone: function () {
    var that = this;
    wx.request({
      url: url + "/mini/update_phone",
      data: {
        user_id: wx.getStorageSync("user_id"),
        phone: that.data.phone
      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        
        if (res.data.error_no == 0) {
          wx.setStorageSync("phone",that.data.phone)
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })
  },
  getInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getCode: function (e) {
    this.setData({
      code: e.detail.value
    })
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
  modelSubmit() {
    this.verify_code()
  },
  verify_code() {
    var that = this;
    wx.request({
      url: certificationUrl + 'sendmsg_server/verify_code',
      method: "POST",
      data: {
        phone: that.data.phone,
        code: that.data.code,
        send_type: 'website_register'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no == 0) {
          that.setData({
            error: ""
          })
          that.updatePhone()

        } else {
          that.setData({
            error: "验证码错误"
          })
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})