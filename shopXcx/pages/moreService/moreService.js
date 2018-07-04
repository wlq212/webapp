// pages/moreService/moreService.js
var request = require("../../utils/request");
var url = request.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    page_no: 1,
    all_product_list:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({ title: '所有服务' })
    this.requestMoreService();
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 可使用窗口宽度、高度
        console.log('height=' + res.windowHeight);
        // 计算主体部分高度,单位为px
        that.setData({
          srollheight: res.windowHeight - 50
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  skipmoreService: function (e) {
    wx.navigateTo({
      url: "/pages/productName/productName?id=" + e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  swichNav: function (e) {
    this.requestMoreArticle(e.currentTarget.dataset.current, e.currentTarget.dataset.typecode)
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  requestMoreArticle: function (index, get_value) {
    this.setData({
      get_value: get_value
    })
    this.setData({
      page_no: 1,
      loadText: '点击加载更多'

    })
    var that = this;
    wx.request({
      url: url + "/mini/get_service_skus",
      data: {
        area_id: wx.getStorageSync("area_id"),
        category_id: get_value,
        page_no: 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no == 0) {
          that.setData({
            product_list: res.data.data.product_list
          })
          wx.setStorageSync("product_list",res.data.data.product_list)
        }
      }
    })
  },
  //加载更多 
  setLoading: function (e) {
    var duanziInfoBefore = this.data.product_list
    var that = this
    wx.showToast({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中” 
      title: '加载中',
      icon: 'loading',
      duration: 200
    })
    var pageno = that.data.page_no + 1
    var that = this;
    wx.request({
      url: url + "/mini/get_service_skus",
      data: {
        area_id: wx.getStorageSync("area_id"),
        category_id: that.data.get_value,
        page_no: pageno
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no == 0) {
          if (res.data.data.product_list.length == 0) {
            that.setData({
              page_no: pageno,
              loadText: "数据请求中",
              loading: false,
              product_list: duanziInfoBefore.concat(res.data.data.product_list),
              loadText: "没有更多数据加载",
              loading: false,
            })
          } else {
            that.setData({
              page_no: pageno,
              loadText: "数据请求中",
              loading: true,
              product_list: duanziInfoBefore.concat(res.data.data.product_list),
              loadText: "点击加载更多数据",
              loading: false,
            })
          }

        }
      }
    })
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    this.requestMoreArticle(e.detail.current, that.data.all_product_list[+e.detail.current].category_id)
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
  requestMoreService:function(){
    var that=this;
    wx.request({
      url: url + "/mini/get_all_product",
      data: {
        area_id: wx.getStorageSync("area_id"),
        app_type:"mycfo"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.error_no==0) {
          that.setData({
            all_product_list: res.data.data.category_data
          })
          that.requestMoreArticle(0, that.data.all_product_list[0].category_id)
          wx.setStorageSync("all_product_list", res.data.data.all_product_list )
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