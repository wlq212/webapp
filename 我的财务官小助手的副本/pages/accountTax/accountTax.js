var request = require("../../utils/request");
var url = request.url;
var certificationUrl = request.certificationUrl;
Page({
  data: {
    showModal: false,
    attribute_list:"",
    name: "",
    phone: "",
    code: "",
    timeout:"",
    countdown: 60,
    codeTime: "获取验证码",
    qualification_apply:"",
    ensure_invoice:"",
    id:-1,
    tallImg:"/image/tally/tally_consult_btn@2x.png",
    accounttaxImage:"/image/tally/tally_banner@2x.png",
    idthree:-1,
    itemShow:false,
    idtwo:-1,
    attrprice:"",
    price:0,
    priceTwo:0,
    atrPrice:0,
    brandkey:"",
    brandName:"",
    brandkey1: "",
    brandName1: "",
    brandkey2: "",
    brandName2: "",
    brandkey3: "",
    brandName3: "",
    brandkey4: "",
    brandName4: ""
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: '记账报税' });
    wx.showShareMenu({
      withShareTicket: true
    })

  },
  /**
   * 弹窗
   */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  },
  onShow:function(){
    var that = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.request({
      url: url + "/cwg-wechat-app/account_detail",
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no==0){
          console.log(res.data)
          if (res.data) {
            that.setData({
              attribute_list: res.data.data.attribute_list,
              qualification_apply: res.data.data.qualification_apply,
              ensure_invoice: res.data.data.ensure_invoice
            })
          }
        }
      }
    })
  },
  requestData:function(e){
    var that = this;
    wx.request({
      url: url + "/cwg-wechat-app/account_sku_price",
      data: {
        sku_id: that.data.id + "@" + that.data.idtwo + "@" + that.data.idthree
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.error_no == 0) {
          that.setData({
            atrPrice: res.data.data.price
          })
        }
      }
    })
  },
  tapNameOne:function(e){
    var that = this;
    var id = e.currentTarget.id;
    if (e.currentTarget.dataset.value =="一般纳税人"){
      that.setData({
       
        itemShow:true
      })
    }else{
      that.setData({
        itemShow: false
      }) 
    }
    this.setData({
      brandKey:"选择公司纳税类型",
      brandName:e.currentTarget.dataset.val,
      id: id
    });
    if (that.data.id && that.data.idtwo && that.data.idthree) {
      that.requestData();
    }
  },
  tapNameTwo: function (e) {
    var that = this;
    var idtwo = e.currentTarget.dataset.idtwo;
    this.setData({
      brandKey1: "选择公司所在城市",
      brandName1: e.currentTarget.dataset.val,
      idtwo: idtwo
    });
    if (that.data.id && that.data.idtwo && that.data.idthree) {
      that.requestData();
    }
  },
  tapNameThree: function (e) {
    var that = this;
    var idthree = e.currentTarget.dataset.idthree;
    this.setData({
      brandKey2: "记账周期",
      brandName2: e.currentTarget.dataset.val,
      idthree: idthree
    });
    if (that.data.id && that.data.idtwo && that.data.idthree) {
      that.requestData();
    }
  },
  tapNametwo: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    var price = e.currentTarget.dataset.price;
    this.setData({
      brandKey3: "一般纳税人资质",
      brandName3: e.currentTarget.dataset.val,
      idthree: that.data.idthree,
      idTwo: id,
      priceTwo: price
    });
   
  },
  tapNamethree: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    var price = e.currentTarget.dataset.price;
    this.setData({
      brandKey4: "选择控税发票",
      brandName4: e.currentTarget.dataset.val,
      idThree: id,
      price: price
    });
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
        name: wx.getStorageSync("name"),
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
  certificationButton() {
    this.sendeCode()
  },
  modelSubmit() {
    this.verify_code()
  },
  nameInput(e) {
    wx.setStorageSync("name", e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  phoneInput(e) {
    wx.setStorageSync("phone", e.detail.value)
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
    var item_list=""
    var that = this;
    if(that.data.brandName=="一般纳税人"){
      if (that.data.brandName && that.data.brandName1 && that.data.brandName2 && that.data.brandName3 && that.data.brandName4){
        item_list = that.data.brandkey + "@" + that.data.brandName + "|" + that.data.brandkey1 + "@" + that.data.brandName1 + "|" + that.data.brandkey2 + "@" + that.data.brandName2 + "|" + that.data.brandkey3 + "@" + that.data.brandName3 + "|" + that.data.brandkey4 + "@" + that.data.brandName4
        item_list = that.data.brandkey + "@" + that.data.brandName + "|" + that.data.brandkey1 + "@" + that.data.brandName1 + "|" + that.data.brandkey2 + "@" + that.data.brandName2 + "|" + that.data.brandkey4 + "@" + that.data.brandName4

        wx.request({
          url: url + '/cwg-wechat-app/submit_info',
          method: "POST",
          data: {
            service: "记账报税",
            name: that.data.phone,
            phone: that.data.code,
            item_list: item_list,
            total_price: that.data.priceTwo + that.data.price + that.data.atrPrice
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
    }else{
    if(that.data.brandName && that.data.brandName1 && that.data.brandName2  && that.data.brandName4){
        item_list = that.data.brandkey + "@" + that.data.brandName + "|" + that.data.brandkey1 + "@" + that.data.brandName1 + "|" + that.data.brandkey2 + "@" + that.data.brandName2 + "|" + that.data.brandkey4 + "@" + that.data.brandName4
    
        wx.request({
          url: url + '/cwg-wechat-app/submit_info',
          method: "POST",
          data: {
            service: "记账报税",
            name: that.data.name,
            phone: that.data.phone,
            item_list: item_list,
            total_price: that.data.priceTwo + that.data.price + that.data.atrPrice
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
        console.log(res)
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