//index.js  
//获取应用实例  
var app = getApp()
var request = require("../../utils/request");
var url = request.url;
Page({
  data: {
    /** 
        * 页面配置 
        */
   
    // tab切换  
    loadText: '点击加载更多', 
    currentTab: 0,
    page_no:1,
    service_id: 0,
    type_list:"",
    article_list: wx.getStorageSync("article_list"),
    service_detailArr: [],
  },
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({ title: '所有文章' })
    this.requestArticleType();
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
  requestArticleType:function(){
    var that=this;
    wx.request({
      url: url + "/mini/article_type_list",
      data: {
        area_id: wx.getStorageSync("area_id")
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no==0) {
          that.setData({
            type_list: res.data.data.type_list
          })
          that.requestMoreArticle(0, that.data.type_list[0].type_code)
        }
      }
    })
  },
  //加载更多 
  setLoading: function (e) {
    var duanziInfoBefore = this.data.article_list
    var that = this
    wx.showToast({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中” 
      title: '加载中',
      icon: 'loading',
      duration: 200
    })
    var pageno = that.data.page_no + 1
    var that = this;
    wx.request({
      url: url + "/mini/get_article_list",
      data: {
        area_id: wx.getStorageSync("area_id"),
        get_type: "type_code",
        get_value: that.data.get_value,
        page_no: pageno
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no == 0) {
          if (res.data.data.article_list.length==0){
            that.setData({
              page_no: pageno,
              loadText: "数据请求中",
              loading: false,
              article_list: duanziInfoBefore.concat(res.data.data.article_list),
              loadText: "没有更多数据加载",
              loading: false,
            })
          }else{
            that.setData({
              page_no: pageno,
              loadText: "数据请求中",
              loading: true,
              article_list: duanziInfoBefore.concat(res.data.data.article_list),
              loadText: "点击加载更多数据",
              loading: false,
            })
          }
          
        }
      }
    })
  },
  requestMoreArticle: function(index,get_value) {
    this.setData({
      get_value: get_value
    })
    this.setData({
      page_no:1,
      loadText: '点击加载更多'

    })
    var that=this;
    wx.request({
      url: url + "/mini/get_article_list",
      data: {
        area_id: wx.getStorageSync("area_id"),
        get_type: "type_code",
        get_value: get_value,
        page_no:1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no==0) {
            that.setData({
              article_list:res.data.data.article_list
            })
            wx.setStorageSync("article_list", res.data.data.article_list)
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
    this.requestMoreArticle(e.detail.current, that.data.type_list[+e.detail.current].type_code)
  },
  /** 
   * 点击tab切换 
   */
  skipArticleDetail: function (e) {
    wx.navigateTo({
      url: "/pages/article/article?id=" + e.currentTarget.dataset.id
    })
  },
  swichNav: function (e) {
    this.requestMoreArticle(e.currentTarget.dataset.current,e.currentTarget.dataset.typecode)
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onShow: function () {
    var that = this;
  
  },
 
})  