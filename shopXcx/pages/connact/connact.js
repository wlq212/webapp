// pages/connact/connact.js
// 引用百度地图微信小程序JSAPI模块 
var QQMapWX = require('../../js/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var wxMarkerData = [];
Page({
  data: {
    markers:"",
    latitude: '',
    longitude: '',
    
    placeData: {}
  },

  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '2ITBZ-ZMPL6-OIKST-E45RJ-VA333-DCBS6'
    });
    wx.setNavigationBarTitle({ title: '联系我们' });
    var that = this;
  
    
  
  },
  onShow: function () {
    var that=this;
    // 调用接口
    wx.getLocation({
      success: function (res) {
        console.log(res)
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: 22.6486500000,
            longitude: 114.0178300000
          },
          get_poi:1,
          success: function (response) {
            that.setData({
              latitude:22.6486500000,
              longitude: 114.0178300000,
              markers:[{
                iconPath: "../../image/marker_red.png",
                id: 0,
                latitude: 22.6486500000,
                longitude: 114.0178300000,
                width: 35,
                height: 45
              }]
            })
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        })
      },
    })
    
  },
  call:function(){
    wx.makePhoneCall({
      phoneNumber: '18189699879', //此号码并非真实电话号码，仅用于测试  
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    }) 
  },
  skipMap:function(){
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      scale: 28
    })
  }
})