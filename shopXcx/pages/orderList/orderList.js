// pages/orderList/orderList.js
var request = require("../../utils/request");
var url = request.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    page_no:1,
    loadText:'点击加载更多', 
    loadText1:'点击加载更多',
    paypage_no:1,
    showborder:true,
    noPayList: wx.getStorageSync("noPayList"),
    payList: wx.getStorageSync("payList")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.setNavigationBarTitle({ title: '我的订单' })
    this.requestOrderno_payList()
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
  //加载更多 
  setLoading: function (e) {
    var duanziInfoBefore = this.data.noPayList
    var that = this
    wx.showToast({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中” 
      title: '加载中',
      icon: 'loading',
      duration: 200
    })
    var pageno = that.data.page_no+1
    wx.request({
      url: url + "/mini/order_list",
      data: {
        user_id: wx.getStorageSync('user_id'),
        page_no: pageno,
        order_type: "no_pay_order"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no == 0){
          if (res.data.data.order_list.length==0){
            that.setData({
              loadText: "数据请求中",
              loading: false,
              noPayList: duanziInfoBefore.concat(res.data.data.order_list),
              loadText: "已经没有更多数据",
              page_no: pageno,
              loading: false,
            })
            wx.setStorageSync("noPayList", duanziInfoBefore.concat(res.data.data.order_list))
          }else{
            console.log(res.data.data.order_list.length == 0)
            that.setData({
              loadText: "数据请求中",
              loading: true,
              noPayList: duanziInfoBefore.concat(res.data.data.order_list),
              loadText: "点击加载更多数据",
              page_no: pageno,
              loading: false,
            })
            wx.setStorageSync("noPayList", duanziInfoBefore.concat(res.data.data.order_list))
          }
        
        }
      }
    })
  },

  setLoading1: function (e) {
    var duanziInfoBefore = this.data.payList
    var that = this
    wx.showToast({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中” 
      title: '加载中',
      icon: 'loading',
      duration: 200
    })
    var pageno = that.data.paypage_no + 1
    wx.request({
      url: url + "/mini/order_list",
      data: {
        user_id: wx.getStorageSync('user_id'),
        page_no: pageno,
        order_type: "pay_order"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no == 0) {
          if (res.data.data.order_list.length == 0) {
            that.setData({
              loadText1: "数据请求中",
              loading: false,
              payList: duanziInfoBefore.concat(res.data.data.order_list),
              loadText1: "已经没有更多数据",
              page_no: pageno,
              loading: false,
            })
            wx.setStorageSync("payList", duanziInfoBefore.concat(res.data.data.order_list))

          } else {
            
            that.setData({
              loadText: "数据请求中",
              loading: true,
              payList: duanziInfoBefore.concat(res.data.data.order_list),
              loadText: "点击加载更多数据",
              page_no: pageno,
              loading: false,
            })
            wx.setStorageSync("payList", duanziInfoBefore.concat(res.data.data.order_list))
          }

        }
      }
    })
  },
  shutShop:function(e){
    var that=this;
    if (that.data.noPayList[e.currentTarget.dataset.id].product_list[0].product_attr) {
      console.log(that.data.noPayList[e.currentTarget.dataset.id])
      console.log(that.data.noPayList[e.currentTarget.dataset.id].market_value)
      wx.navigateTo({
        url: "/pages/order/order?id=" + that.data.noPayList[e.currentTarget.dataset.id].order_id + "&price=" + that.data.noPayList[e.currentTarget.dataset.id].price + "&markprice=" + that.data.noPayList[e.currentTarget.dataset.id].product_list[0].market_value + "&name=" + that.data.noPayList[e.currentTarget.dataset.id].product_list[0].product_name + "&cover_image=" + that.data.noPayList[e.currentTarget.dataset.id].product_list[0].cover_img + "&default_value_title=" + that.data.noPayList[e.currentTarget.dataset.id].product_list[0].product_attr
      })
    } else {
      wx.navigateTo({
        url: "/pages/order/order?id=" + that.data.noPayList[e.currentTarget.dataset.id].order_id + "&price=" + that.data.noPayList[e.currentTarget.dataset.id].price + "&markprice=" + that.data.noPayList[e.currentTarget.dataset.id].product_list[0].market_value + "&name=" + that.data.noPayList[e.currentTarget.dataset.id].product_list[0].product_name + "&cover_image=" + that.data.noPayList[e.currentTarget.dataset.id].product_list[0].cover_img
      })
    }

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
  requestOrderpayList:function(){
    var that = this;
    wx.request({
      url: url + "/mini/order_list",
      data: {
        user_id: wx.getStorageSync('user_id'),
        page_no: that.data.paypage_no,
        order_type:"pay_order"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no == 0) {
          that.setData({
            payList:res.data.data.order_list
          })
        }
      }
    })
  },
 requestOrderno_payList:function(type){
   var that=this;
   wx.request({
     url: url + "/mini/order_list",
     data: {
       user_id: wx.getStorageSync('user_id'),
       page_no:that.data.page_no,
       order_type:"no_pay_order"
     },
     header: {
       'content-type': 'application/json' // 默认值
     },
     success: function (res) {
       if (res.data.error_no == 0) {
         that.setData({
           noPayList: res.data.data.order_list
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
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {
    if (e.detail.current == 1) {
      this.setData({
        paypage_no: 1
      })
      this.requestOrderpayList()
    }
    if (e.detail.current== 0) {
      this.setData({
        page_no: 1
      })
      this.requestOrderno_payList()
    }
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.detail.current
      })
    }
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    if (e.target.dataset.current==1){
      this.setData({
        paypage_no:1
      })
      this.requestOrderpayList()
    }
    if (e.target.dataset.current == 0) {
      this.setData({
        page_no: 1
      })
      this.requestOrderno_payList()
    }
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
})