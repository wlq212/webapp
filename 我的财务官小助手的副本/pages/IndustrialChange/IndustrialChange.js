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
    arrOneTitle:"",
    error:"",
    arrOne:[

    ],
    arrTwoTitle:"",
    arrTwo:[

    ],
    selectCheckbox:[],
    showItemTwo:false,
    showItemOne:false,
    name: "",
    phone: "",
    code: "",
    countdown: 60,
    codeTime: "获取验证码",
    showItemTwoInner:false,
    showItemTwoTwo:false,
    showItemTwoHH: false,
    atrPrice:0,
    priceOne: 0,
    price: 0,
    priceTwo:0,
    sku_id_list:[],
    priceThree: 0,
    priceFour: 0,
    priceFive: 0,
    checked:[],
    timeout: "",
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
    brandName5: "",
    registrationFiveShow:false,
    attribute_value_list:[
      {
        attribute_value_price:100,
        attribute_value_name:"公章"
      }, {
        attribute_value_price: 200,
        attribute_value_name: "财务章"
      },
      {
        attribute_value_price: 200,
        attribute_value_name: "法人私章"
      },
      {
        attribute_value_price: 200,
        attribute_value_name: "我自己刻章"
      }
    ],
    attribute_value_listOne:[
      {
        attribute_value_price: 200,
        attribute_value_name: "为我变更银行开户"
      },
      {
        attribute_value_price: 200,
        attribute_value_name: "我自己变更"
      }
    ],
    attribute_value_listTwo:[
      {
        attribute_value_price: 200,
        attribute_value_name: "为我变更商标"
      },
      {
        attribute_value_price: 200,
        attribute_value_name: "我自己变更"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '公司变更' })
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
    var that = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.request({
      url: url + "/cwg-wechat-app/change_detail",
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_no == 0) {
           that.setData({
             arrOneTitle: res.data.data.attribute_list[0].attribute_name,
             arrOne: res.data.data.attribute_list[0].attribute_value_list,
             arrTwo: res.data.data.attribute_list[1].attribute_value_list,
             arrTwoTitle: res.data.data.attribute_list[1].attribute_name,
             attribute_value_list: res.data.data.prints_apply,
             attribute_value_listOne: res.data.data.bank_account,
             attribute_value_listTwo: res.data.data.brand_info
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
  requestData:function(e){
    var that = this;
    wx.request({
      url: url + "/cwg-wechat-app/change_sku_price",
      method:"POST",
      data: {
        sku_id_list:that.data.selectCheckbox
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
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
    var price = e.currentTarget.dataset.price;
    this.setData({
      brandkey2:"选择需要重刻的印章",
      brandName2: e.currentTarget.dataset.val,
      idOne: id,
      priceFour: price
    });
  },
  tapNameTwo:function(e){
    var that = this;
    var id = e.currentTarget.id;
    var price = e.currentTarget.dataset.price;
    this.setData({
      brandkey3: "选择变更银行开户",
      brandName3: e.currentTarget.dataset.val,
      idTwo: id,
      priceThree: price
    });
  },
  tapNameThree:function(e){
    var that = this;
    var id = e.currentTarget.id;
    var price = e.currentTarget.dataset.price;
    this.setData({
      brandkey4: "选择变更商标信息",
      brandName4: e.currentTarget.dataset.val,
      idThree: id,
      priceTwo: price
    });
  },
  tapNameAttr:function(e){
    var that=this;
    var id = e.currentTarget.id;

    this.setData({
      brandkey:"选择所在城市",
      brandName: e.currentTarget.dataset.val,
      id: id
    });
    var arr=[];
    for (var i = 0; i < that.data.checked.length; i++) {
      arr.push(that.data.id + "@" + that.data.checked[i])
    }
    if (that.data.idone) {
      arr.push(that.data.id + "@" + that.data.idone)
    }
    that.setData({
      selectCheckbox: arr
    })

    that.setData({
      selectCheckbox: arr
    })
    that.requestData()
  },
  tapNameAttrOne:function(e){
    var that=this;
    var idone = e.currentTarget.dataset.idone;
    this.setData({
      brandName1: e.currentTarget.dataset.val,
      brandkey1:"选择变更项目",
      idone: idone
    });

    var arr=[];
    for (var i = 0; i < that.data.checked.length; i++) {
      arr.push(that.data.id + "@" + that.data.checked[i])
    }
    if (that.data.idone) {
      arr.push(that.data.id + "@" + that.data.idone)
    }
    that.setData({
      selectCheckbox: arr
    })
    that.requestData()
  },
  radioChange:function(e){
    var that = this;
    var arres=[];
    var checked = e.detail.value;

    for(var i=0;i<checked.length;i++){
      for (var a = 0; a < that.data.arrTwo.length; a++) {
        if (checked[i] == that.data.arrTwo[a].attribute_value_id){
          arres.push(that.data.arrTwo[a].attribute_value_name)
        }
      }
    }
    var changed = {};
    var arr = [];
    var arrTwo=[];
    that.setData({
      brandName5: arres
    })
    for (var i = 0; i < this.data.arrTwo.length; i++) {
        if (checked.indexOf(String(that.data.arrTwo[i].attribute_value_id)) !== -1) {
        changed['arrTwo[' + i + '].checked'] = true
      } else {
          that.setData({
            showItemTwoHH: false,
            showItemOne: false,
            showItemTwoTwo:false,
            registrationFiveShow: false
          })
        changed['arrTwo[' + i + '].checked'] = false
      }
    }
    var arres=[];
    for(var a=0;a<checked.length;a++){

      switch (checked[a]){
        case "12":
          arres.push("12")
          arrTwo.push("12")
          that.setData({
          showItemTwoHH:true,
          showItemOne:true,
          registrationFiveShow:true
        })
        break;
        case "13":
          arres.push("13")
          that.setData({
            showItemTwoTwo:true,
            showItemOne:true
          })
          break;
        case "15":
          arrTwo.push("15")
          that.setData({
            registrationFiveShow:true,
            showItemOne:true
          })
          break;
      }
    }
    if ((arrTwo[0] == "12" && arrTwo[1] == "15") || (arrTwo[0] == "15" && arrTwo[1] == "12")){
      that.setData({
        registrationFiveShow: true
      })
    }else{
      if (arrTwo[0] == "12" || arrTwo[0] == "15"){
        that.setData({
          registrationFiveShow: true
        })
      }else{
        that.setData({
          registrationFiveShow: false
        })
      }
    }
    if ((arres[0] == "12" && arres[1] == "13") || (arres[0] == "13" && arres[1] == "12")){
      that.setData({
        showItemTwoHH: false,
        showItemTwoTwo: false,
        showItemTwoHHOne:true,
        showItemOne:true
      })
    }else{
      that.setData({
        showItemTwoHHOne:false
      })
    }
    for (var i = 0; i < checked.length;i++){
      arr.push(that.data.id + "@" + checked[i])
    }
    if (checked.length==0){
      that.setData({
        showItemTwoHH:false,
        showItemOne: false,
        showItemTwoTwo:false
      })
    }
    if (that.data.idone){
      arr.push(that.data.id + "@" + that.data.idone)
    }

    that.setData({
      checked:checked,
      selectCheckbox:arr
    })
    if (checked.length!=0){
      that.requestData()
    }else{
      that.setData({
        atrPrice: 0
      })
    }
  },
  getFaceTag: function (message) {
    let re = /\[([\u4e00-\u9fa5\w]+)\]/g;
    let r = { fulltag: [], tags: [] };
    let m;
    while (m = re.exec(message)) {
      r.fulltag.push(m[0]);
      r.tags.push(m[1]);
    }
    return r;
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
    wx.setStorageSync("name",e.detail.value)
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
    var timeout=setTimeout(function () {
      that.settime();
    }, 1000)
    that.setData({
      timeout: timeout
    })
  },

  verify_code() {
    var that = this;
    if ((/^1[34578]\d{9}$/.test(that.data.phone))){
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
    }

  },
  submitRequest() {
    if (that.data.brandName&&that.data.brandName1&&that.data.brandName2&& that.data.brandName3 &&that.data.brandName4&&that.data.brandName5){
      var that = this;
      wx.request({
        url: url + '/cwg-wechat-app/submit_info',
        method: "POST",
        data: {
          service: "公司内资变更",
          name: that.data.name,
          phone: that.data.phone,
          item_list: that.data.brandkey + "@" + that.data.brandName + "|" + that.data.brandkey1 + "@" + that.data.brandName1 + ";" + that.data.brandName5.join(";") + "|" + that.data.brandkey2 + "@" + that.data.brandName2 + "|" + that.data.brandkey3 + "@" + that.data.brandName3 + "|" + that.data.brandkey4 + "@" + that.data.brandName4,
          total_price: that.data.priceTwo + that.data.price + that.data.atrPrice + that.data.priceFour + that.data.priceFive + that.data.priceThree + that.data.priceOne
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
        error:"您还有未选择项目"
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
    } else {
      that.setData({
        error: "手机号码格式不正确"
      })
    }
  }
})
