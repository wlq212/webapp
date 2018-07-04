// pages/email/email.js
const app = getApp()
var request = require("../../utils/request");
var url = request.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: 'qq修改与绑定' })
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
  getInput: function (e) {
    this.setData({
      qq: e.detail.value
    })
  },
  modelSubmit: function () {
    var that = this;
      that.setData({
        error: ""
      })
      wx.request({
        url: url + '/mini/update_user',
        method: "POST",
        data: {
          user_id: wx.getStorageSync("user_id"),
          wechat_no: wx.getStorageSync("weixin"),
          email: wx.getStorageSync("email"),
          qq:that.data.qq,
          headImg: wx.getStorageSync("userInfo").avatarUrl
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.error_no == 0) {
            wx.setStorageSync("qq",that.data.qq)
            wx.navigateBack({
              delta: 1,
            })
          } else {
            this.setData({
              error: "更改失败"
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

  }
})