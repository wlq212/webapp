// pages/companyRegister/companyRegister.js
var request = require("../../utils/request");
var url = request.url;
var certificationUrl = request.certificationUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tallImg: "/image/tally/tally_consult_btn@2x.png",
    attribute_list:"",
    name: "",
    timeout:"",
    phone: "",
    code: "",
    error:"",
    countdown: 60,
    codeTime: "获取验证码",
    price:0,
    priceOne:0,
    id:"",
    idtwo:"",
    idthree:"",
    brandkey:"",
    brandName:"",
    brandkey1: "",
    brandName1: "",
    brandkey2: "",
    brandName2: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '外资公司注册' });
    wx.showShareMenu({
      withShareTicket: true
    })
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
    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this;
    wx.request({
      url: url + "/cwg-wechat-app/foreign_company",
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no == 0) {
          if (res.data) {
            that.setData({
             attribute_list: res.data.data.attribute_list,
            })
          }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  requestData: function (e) {
    var that = this;
    wx.request({
      url: url + "/cwg-wechat-app/account_sku_price",
      data: {
        sku_id: that.data.id + "@" + that.data.idtwo
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no == 0) {
          that.setData({
            price: res.data.data.price
          })
        }
      }
    })
  },
  requestDataOne: function (e) {
    var that = this;
    wx.request({
      url: url + "/cwg-wechat-app/account_sku_price",
      data: {
        sku_id: that.data.idtwo + "@" + that.data.idthree
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no == 0) {
          that.setData({
            priceOne: res.data.data.price
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  hideModalOne: function () {
    this.setData({
      showModalTwo: false
    });

  },
  submitOne: function (e) {
    var that=this;
    var string = "";
    this.setData({
      showModalTwo: true
    })
    if (wx.getStorageSync("phone") || wx.getStorageSync("name")) {
      that.setData({
        phone: wx.getStorageSync("phone"),
        name: wx.getStorageSync("name")
      })
    }
    if (that.data.timeout) {
      clearTimeout(that.data.timeout)
      that.setData({
        codeTime: "获取验证码",
        countdown: 0,
        disabled: false

      })
    }
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
  tapName:function(e){
    var id = e.currentTarget.id;
    this.setData({
      brandkey:"资本类型",
      brandName: e.currentTarget.dataset.val,
      id: id
    })
    this.requestData()
  },
  tapNameTwo:function(e){
    var idtwo = e.currentTarget.id;
    this.setData({
      brandkey1: "选择注册城市",
      brandName1: e.currentTarget.dataset.val,
      idtwo: idtwo
    })
    this.requestData()
  },
  tapNameThree:function(e){
    var idthree = e.currentTarget.id;
    this.setData({
      brandkey2: "选择会计服务",
      brandName2: e.currentTarget.dataset.val,
      idthree: idthree
    })
    this.requestDataOne()
  },
  certificationButton() {
    this.sendeCode()
  },
  modelSubmit() {
    this.verify_code()
  },
  nameInput(e) {
    wx.setStorageSync("name",e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  phoneInput(e) {
    wx.setStorageSync("phone",e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  codeInput(e) {
    this.setData({
      code: e.detail.value
    })
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
        if (res.data.error_no==0) {
          that.setData({
            error: ""
          })
          that.submitRequest()
         
        }else{
          that.setData({
            error: "验证码错误"
          })
        }
      }
    })
  },
  submitRequest() {

    var that = this;
    if (that.data.brandName && that.data.brandName1 && that.data.brandName2 ) {
      that.setData({
        error: ""
      })
    wx.request({
      url: url + '/cwg-wechat-app/submit_info',
      method: "POST",
      data: {
        service:"外资公司注册",        
        name: that.data.name,
        phone: that.data.phone,
        item_list: that.data.brandkey + "@" + that.data.brandName + "|" + that.data.brandkey1 + "@" + that.data.brandName1 + "|" + that.data.brandkey2 + "@" + that.data.brandName2,
        total_price: that.data.price + that.data.priceOne
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no == 0) {
          that.hideModalOne();
          that.setData({
            name: "",
            phone: "",
            code: ""
          })
        }
      }
    })
    }else{
      that.setData({
        error: "您还有未选择项目"
      })
    }
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
        if (res.data.error_no == 0) {
          that.settime()

        }
      }
    })
  }else{
    that.setData({
      error:"手机号码格式不正确"
    })
  }
  }
})