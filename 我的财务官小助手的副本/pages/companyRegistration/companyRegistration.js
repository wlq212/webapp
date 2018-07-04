// pages/IndustrialChange/IndustrialChange.js
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
    phone: "",
    timeout:"",
    code: "",
    countdown: 60,
    codeTime: "获取验证码",
    left_attribute_list:"",
    showItem:false,
    showItemIndex:false,
    showItemIndexIneer:false,
    pickobj:{
      values:[],
      keys:[]
    },
    price:0,
    priceOne:0,
    priceTwo:0,
    priceThree:0,
    id:"",
    idFive:"",
    idOne: "",
    idTwo: "",
    idThree: "",
    selectObj:{
      name:"请选择注册类型",
      key:""
    },
    brandkey:"",
    brandName:"",
    brandkey1: "",
    brandName1: "",
    brandkey2: "",
    brandName2: "",
    brandkey3: "",
    brandName3: "",
    brandkey4: "",
    brandName4: "",
    brandkey5: "",
    brandName5: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '内资公司注册' })
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
  requestDataId_Idthree: function (e) {
    var that = this;
    wx.request({
      url: url + "/cwg-wechat-app/account_sku_price",
      data: {
        sku_id: that.data.selectObj.key + "@" + that.data.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.error_no == 0) {
          that.setData({
            price: res.data.data.price
          })
        }
      }
    })
  },
  requestDataId_Idtwo: function (e) {
    var that = this;
    wx.request({
      url: url + "/cwg-wechat-app/account_sku_price",
      data: {
        sku_id: that.data.selectObj.key + "@" + that.data.id + "@" + that.data.idFive
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.error_no == 0) {
          that.setData({
            price: res.data.data.price
          })
        }
      }
    })
  },
  requestDataId_IdOne: function (e) {
    var that = this;
    wx.request({
      url: url + "/cwg-wechat-app/account_sku_price",
      data: {
        sku_id: that.data.id + "@" + that.data.idOne
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
  requestDataId_IdOneSz: function (id,pricehhh) {
    var that = this;
    wx.request({
      url: url + "/cwg-wechat-app/account_sku_price",
      data: {
        sku_id: that.data.id + "@"+ id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no == 0) {
          switch (pricehhh){
            case "price":
            that.setData({
              price: res.data.data.price
              })
              break;
            case "priceOne":
              that.setData({
                priceOne: res.data.data.price
              })
              break;
            case "priceTwo":
              that.setData({
                priceTwo: res.data.data.price
              })
              break;
            case "priceThree":
              that.setData({
                priceThree: res.data.data.price
              })
              break;
          }
          
        }
      }
    })
  },
  onShow: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this;
    wx.request({
      url: url + "/cwg-wechat-app/domestic_company",
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        var pickobj={
          keys:[],
          values:[]
        }
        if (res.data.error_no == 0) {
          if (res.data) {
            for (var a = 0; a < res.data.data.attribute_list[0].attribute_value_list.length;a++){
             pickobj.keys.push(res.data.data.attribute_list[0].attribute_value_list[a].attribute_value_id)
              pickobj.values.push(res.data.data.attribute_list[0].attribute_value_list[a].attribute_value_name)
            }
         that.setData({
              attribute_list: res.data.data.attribute_list,
              left_attribute_list: res.data.data.left_attribute_list,
              pickobj: pickobj
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
  bindPickerChange:function(e){
    var that=this;
    var obj={
      brandkey: "注册类型",
      brandName: that.data.pickobj.values[+e.detail.value],
      name: that.data.pickobj.values[+e.detail.value],
      key: that.data.pickobj.keys[+e.detail.value]
    }
    that.setData({
      selectObj: obj
    })
    if (that.data.showItem==true){
      that.requestDataId_Idtwo()
      
    }else{
      that.requestDataId_Idthree()
    }
    
    
  },
  tapName: function (e) {
    this.setData({
      price: 0,
      priceOne: 0,
      priceTwo: 0,
      priceThree: 0,
      id:-1,
      idOne:-1,
      idTwo:-1,
      idThree:-1,
      idFive:-1
    })
    var that=this;
    this.setData({
      brandkey1: "注册城市",
      brandName1: e.currentTarget.dataset.val,
      showItemIndexIneer: false,
      showItemIndexIneerTwo:false,
      showItem: false,
      showItemIndex: false
    })
   
    var id = e.currentTarget.id;
    this.setData({
      id: id
    })
    switch (e.currentTarget.dataset.value) {
      case "深圳":
        this.setData({
          showItemIndexIneer: true,
          showItem: true,
          showItemIndex: true
        })
        that.requestDataId_Idtwo()
        break;
      case "广州":
        this.setData({
          showItemIndexIneerTwo: true,
          showItemIndex: false
        })
        that.requestDataId_Idthree()
        break;
      case "东莞":
        this.setData({
          showItemIndexIneerTwo: true,
          showItemIndex: false
        })
        that.requestDataId_Idthree()
        break;
    }
  },
  tapNameOne: function (e) {
    var that = this;
    var idOne = e.currentTarget.id;
    this.setData({
      brandkey3: "选择您需要的刻章",
      brandName3: e.currentTarget.dataset.val,
      idOne: idOne
    })
    that.requestDataId_IdOneSz(idOne, "priceOne")
  },
  tapNameTwo: function (e) {
    var that = this;
    var idTwo = e.currentTarget.id;
    this.setData({
      brandkey4: "选择办理银行开户",
      brandName4: e.currentTarget.dataset.val,
      idTwo: idTwo
    })
      that.requestDataId_IdOneSz(idTwo,"priceTwo")

  }, 
tapNameThree:function(e){
  var that = this;
  var idthree = e.currentTarget.id;
  this.setData({
    brandkey5: "选择会计服务",
    brandName5: e.currentTarget.dataset.val,
    idThree: idthree
  })
    that.requestDataId_IdOneSz(idthree,"priceThree")
 
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
  if ( wx.getStorageSync("phone") || wx.getStorageSync("name")){
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
  tapNameFive: function (e) {
  
    var that = this;
    var idFive = e.currentTarget.id;
    this.setData({
      brandkey2: "注册区域",
      brandName2: e.currentTarget.dataset.val,
      idFive: idFive
    })
    that.requestDataId_Idtwo()
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
    console.log(e)
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
        console.log(res)
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
    var list="";
    switch(that.data.brandName1){
      case "深圳":
        list = that.data.selectObj.brandkey+"@"+that.data.selectObj.brandName+"|"+ that.data.brandkey1+"@"+that.data.brandName1+"|"+that.data.brandkey2+"@"+that.data.brandName2+"|" + that.data.brandkey3 + "@" + that.data.brandName3 + "|" + that.data.brandkey4 + "@" + that.data.brandName4 + "|" + that.data.brandkey5 + "@" + that.data.brandName5 ;
        if (that.data.selectObj.brandName && that.data.brandName1 &&that.data.brandName2 && that.data.brandName3 && that.data.brandName4 && that.data.brandName5){
          wx.request({
            url: url + '/cwg-wechat-app/submit_info',
            method: "POST",
            data: {
              service: "内资公司注册",
              name: that.data.name,
              phone: that.data.phone,
              item_list: list,
              total_price: that.data.price + that.data.priceOne + that.data.priceTwo + that.data.priceThree
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
      break;
      case "广州":
        list = that.data.selectObj.brandkey + "@" + that.data.selectObj.brandName + "|" + that.data.brandkey1 + "@" + that.data.brandName1 + "|"  + that.data.brandkey3 + "@" + that.data.brandName3 +  "|" + that.data.brandkey5 + "@" + that.data.brandName5;
        if (that.data.selectObj.brandName && that.data.brandName1 &&that.data.brandName3&& that.data.brandName5) {
          wx.request({
            url: url + '/cwg-wechat-app/submit_info',
            method: "POST",
            data: {
              service:"内资公司注册",
              name: that.data.name,
              phone: that.data.phone,
              item_list: list,
              total_price: that.data.price + that.data.priceOne + that.data.priceTwo + that.data.priceThree
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              if (res.data.error_no==0) {
                that.hideModalOne();
                that.setData({
                  name: "",
                  phone: "",
                  code: ""
                })
              }
            }
          })
        } else {
          that.setData({
            error: "您还有未选择项目"
          })
        }
      break;
      case "东莞":
        list = that.data.selectObj.brandkey + "@" + that.data.selectObj.brandName + "|" + that.data.brandkey1 + "@" + that.data.brandName1 + "|" + that.data.brandkey3 + "@" + that.data.brandName3 + "|" + that.data.brandkey5 + "@" + that.data.brandName5;
        if (that.data.selectObj.brandName && that.data.brandName1 && that.data.brandName3 && that.data.brandName5) {
          wx.request({
            url: url + '/cwg-wechat-app/submit_info',
            method: "POST",
            data: {
              service:"内资公司注册",
              name: that.data.name,
              phone: that.data.phone,
              item_list: list,
              total_price: that.data.price + that.data.priceOne + that.data.priceTwo + that.data.priceThree
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res)
              if (res.data.error_no==0) {
                that.hideModalOne();
                that.setData({
                  name: "",
                  phone: "",
                  code: ""
                })
              }
            }
          })
        } else {
          that.setData({
            error: "您还有未选择项目"
          })
        }
      break;
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
        error: "手机号码格式不正确"
      })
    }
  }
})