//index.js
//获取应用实例
const app = getApp()
var request = require("../../utils/request");
var url = request.url;
var certificationUrl = request.certificationUrl;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    indexImageL:"/image/home/Slicing/home_banner@2x.png",
    buttonContact:"/image/home/Slicing/home_consult_btn@2x.png",
    bannerImageList:[
      { url: "/pages/companyRegistration/companyRegistration", name: "内资公司注册", imageUrl:"/image/home/Slicing/home_domesticcompany_btn@2x.png"},
      { url: "/pages/companyRegister/companyRegister", name: " 外资公司注册", imageUrl: "/image/home/Slicing/home_foreigncompany_btn@2x.png" },
      { url: "/pages/IndustrialChange/IndustrialChange", name: "公司内资变更", imageUrl: "/image/home/Slicing/home_btn@2x.png"},
      { url: "/pages/accountTax/accountTax", name: "记账报税", imageUrl: "/image/home/Slicing/home_tallybtn@2x.png"},
      { url: "/pages/registration/registration", name: "商标注册", imageUrl: "/image/home/Slicing/home_brand_btn@2x.png"},
      { url: "/pages/xgregister/xgregister", name: "香港公司", imageUrl: "/image/home/Slicing/home_Hongkong_btn@2x.png" }
    ],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: '我的财务官小助手' })
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.clearStorageSync();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function (e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
