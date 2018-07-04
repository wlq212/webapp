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
    industry_list:[],
    timeout:"",
    industry_listes:[],
    design_list:[],
    brandkeys:"",
    brandName:"",
    name:"",
    phone:"",
    code:"",
    countdown:60,
    codeTime: "获取验证码",
    industray_name:"请选择行业",
    core_type_list:"",
    other_type_list:"",
    type_price:0,
    showModalTwo:false,
    relate_type_list:"",
    
    slectcore_type_list:[],
    slectrelate_type_list:[],
    slectother_type_list:[],
    core_type_listchecked:"",
    relate_type_listchecked:"",
    price:0,
    select:1,

    id:-1,
    warn:"",
    total:0,
    showModalTwo:false,
    showModal: false,
    OnterList:[],

    brandkeys:"",
    brandName:"",
    brandkeys1:"",
    brandName1:"",
    brandkeys2:"",
    brandName2:"",
    brandName3:"",
    brandName5:"",
    brandkeys3:"",
    brandName4:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '商标注册' });
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
      url: url + "/cwg-wechat-app/brand",
      data: {
       
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data) {
          that.setData({
            industry_list: res.data.data.industry_list,
            design_list: res.data.design_list 
          })
          var industry_listes=[];
          for (var i = 0; i < res.data.data.industry_list.length;i++){
          industry_listes.push(res.data.data.industry_list[i].industry_name)
          }
          that.setData({
            industry_listes:industry_listes 
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
  bindPickerChange: function (e) {
    var that=this;
    this.setData({
      brandkeys1: "选择行业",
      brandName1: that.data.industry_listes[Number(e.detail.value)]
    })
    var arr=[];
    
    for (var a = 0; a < this.data.industry_list[Number(e.detail.value)].other_type_list.length;a++ ){
      var obj = {
        name: "",
        checked: false
      };
      obj.name=this.data.industry_list[Number(e.detail.value)].other_type_list[a]
      arr.push(obj)
    };
    this.setData({
      industray_name: this.data.industry_listes[Number(e.detail.value)],
      core_type_list: this.data.industry_list[Number(e.detail.value)].core_type_list,
      relate_type_list: this.data.industry_list[Number(e.detail.value)].relate_type_list,
      other_type_list:arr
    })

  },
  bindKeyInput:function(e){
    this.setData({
      brandkeys:"商标名称",
      brandName: e.detail.value
    })
  },
  radioChange: function (e) {
    var that=this;
    var checked = e.detail.value
    var changed = {}
    this.setData({
      brandkeys2:"选择注册类别",
      brandName2: checked
    })
    var arr=[];
    for (var i = 0; i < this.data.core_type_list.length; i++) {
      if (checked.indexOf(this.data.core_type_list[i])!== -1) {
        changed['core_type_list[' + i + '].checked'] = true;
      } else {
        changed['core_type_list[' + i + '].checked'] = false
      }
    }
    Object.keys(changed).forEach(function(key){
      if (changed[key]==true){
        arr.push(that.data.core_type_list[Number(that.getFaceTag(key).tags[0])])
       }
    })
    that.setData({
      slectcore_type_list:arr
    })
    var legthes = that.data.slectcore_type_list.length + that.data.slectrelate_type_list.length + that.data.slectother_type_list.length;
    switch (legthes){
      case 0:
      that.setData({
        type_price:0
      })
      break;
      case 1:
        that.setData({
          type_price:880
        })
        break;
      case 2:
        that.setData({
          type_price: 880*2
        })
        break;
      case 3:
        that.setData({
          type_price: 880*3
        })
        break;
        default:
        that.setData({
          type_price: 880*legthes
        })
       
    }
    this.setData({
      total: that.data.price + that.data.type_price
    })
  },
  getFaceTag:function(message) {
    let re = /\[([\u4e00-\u9fa5\w]+)\]/g;    
    let r = { fulltag: [], tags: [] };
    let m;
    while(m = re.exec(message)) {
      r.fulltag.push(m[0]);
      r.tags.push(m[1]);
    }
    return r;
  },
  radioChangeGl: function (e) {
    var that=this;
    var checked = e.detail.value;
    this.setData({
      brandName3: checked
    })
    var changed = {}
    var arr=[];
    for (var i = 0; i < this.data.relate_type_list.length; i++) {
      if (checked.indexOf(this.data.relate_type_list[i])!== -1) {
        changed['relate_type_list[' + i + '].checked'] = true
      } else {
        changed['relate_type_list[' + i + '].checked'] = false
      }
    }
    Object.keys(changed).forEach(function (key) {
      if (changed[key] == true) {
        arr.push(that.data.relate_type_list[Number(that.getFaceTag(key).tags[0])])
      }
    })
    this.setData({
      slectrelate_type_list: arr
    })
    var legthes = that.data.slectcore_type_list.length + that.data.slectrelate_type_list.length + that.data.slectother_type_list.length;
    switch (legthes) {
      case 0:
        that.setData({
          type_price: 0
        })
        break;
      case 1:
        that.setData({
          type_price: 1200
        })
        break;
      case 2:
        that.setData({
          type_price: 1000 * 2
        })
        break;
      case 3:
        that.setData({
          type_price: 900 * 3
        })
        break;
      default:
        that.setData({
          type_price: 900 * legthes
        })

    }
    this.setData({
      total: that.data.price + that.data.type_price
    })
  },
  bindPickerChangeOther: function (e) {
    var obj={
      name: e.detail.value,
      checked:true,
    }
    this.data.OnterList.push(obj)
    this.setData(this.data.OnterList)
  },
  tapName:function(e){
    var that=this;
    var id = e.currentTarget.id;
    var val = e.target.dataset.val
    this.setData({
      brandkeys3:"选择注册类别",
      brandName4:e.target.dataset.val,
         id: id
    });
    this.setData({
      price: e.target.dataset.price
    })
    this.setData({
      total: that.data.price + that.data.type_price
    })
    
  },
  radioChangeOtherll:function(e){
  
    var that=this;
    var checked = e.detail.value;
    this.setData({
      brandName5: checked
    });
    var changed = {};
    var arr=[];
    for (var i = 0; i < this.data.other_type_list.length; i++) {
      if (checked.indexOf(that.data.other_type_list[i].name) !== -1) {
        changed['other_type_list[' + i + '].checked'] = true
      } else {
        changed['other_type_list[' + i + '].checked'] = false
      }
    }
    Object.keys(changed).forEach(function (key) {
      if (changed[key] == true) {
        arr.push(that.data.other_type_list[Number(that.getFaceTag(key).tags[0])])
      }
    })
    this.setData({
      slectother_type_list: arr
    })

    var legthes = that.data.slectcore_type_list.length + that.data.slectrelate_type_list.length + that.data.slectother_type_list.length;
    switch (legthes) {
      case 0:
        that.setData({
          type_price: 0
        })
        break;
      case 1:
        that.setData({
          type_price: 1200
        })
        break;
      case 2:
        that.setData({
          type_price: 1000 * 2
        })
        break;
      case 3:
        that.setData({
          type_price: 900 * 3
        })
        break;
      default:
        that.setData({
          type_price: 900 * legthes
        })

    }
    this.setData({
      total: that.data.price + that.data.type_price
    })
  },
  submitOne:function(e){
    var that=this;
    var string="";
    this.setData({
      showModalTwo:true
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
  /**
     * 弹窗
     */
  showDialogBtn: function () {
    var that=this;
    this.setData({
      showModal: true
    }) 
    var arr=[];
    for (var c = 0;c<that.data.other_type_list.length; c++){
      var obj = {
        name: that.data.other_type_list[c].name,
        checked: false,
      }
      arr.push(obj);
    }
    for (var b = 0; b <arr.length; b++) {
        for (var a = 0; a < that.data.slectother_type_list.length; a++) {
            if (arr[b].name == that.data.slectother_type_list[a].name){
               arr[b].checked=true;
         }
      }
    }
    that.setData({
      other_type_list:arr
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
  hideModalOne: function () {
    this.setData({
      showModalTwo: false
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
  certificationButton(){
    this.sendeCode()
  },
  modelSubmit(){
    this.verify_code()
  },
  nameInput(e){
    wx.setStorageSync("name", e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  phoneInput(e){
    wx.setStorageSync("phone", e.detail.value)
    this.setData({
      phone:e.detail.value
    })
  },
  codeInput(e){
    this.setData({
      code: e.detail.value
    })
  },
  settime(){
    var that=this;
    if (that.data.countdown == 0) {
      that.setData({
        disabled: false,
        codeTime:"获取验证码"
      })
      that.setData({
        countdown:60
      })
      return;
    } else {
      that.setData({
        disabled:true,
        countdown: that.data.countdown,
        codeTime: "倒计时" + that.data.countdown+"s"
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
  
  verify_code(){
    var that = this;
    wx.request({
      url: certificationUrl + 'sendmsg_server/verify_code',
      method: "POST",
      data: {
        phone: that.data.phone,
        code:that.data.code,
        send_type:'website_register'
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
    if (that.data.brandName && that.data.brandName1 && that.data.brandName4 && that.data.brandName2&&(!that.data.brandName3) && (!that.data.brandName5)){
        wx.request({
          url: url + '/cwg-wechat-app/submit_info',
          method: "POST",
          data: {
            service: "商标注册",
            name: that.data.name,
            phone: that.data.phone,
            item_list: that.data.brandkeys + "@" + that.data.brandName + "|" + that.data.brandkeys1 + "@" + that.data.brandName1 + "|" + that.data.brandkeys2 + "@" + that.data.brandName2+ "|" + that.data.brandkeys3 + "@" + that.data.brandName4,
            total_price: that.data.total
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res)
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
      }
    if (that.data.brandName && that.data.brandName1 && that.data.brandName4 && (!that.data.brandName2) && (that.data.brandName3) && (!that.data.brandName5)) {
        wx.request({
          url: url + '/cwg-wechat-app/submit_info',
          method: "POST",
          data: {
            service: "商标注册",
            name: that.data.name,
            phone: that.data.phone,
            item_list: that.data.brandkeys + "@" + that.data.brandName + "|" + that.data.brandkeys1 + "@" + that.data.brandName1 + "|" + that.data.brandkeys2 + "@" + that.data.brandName3 + "|" + that.data.brandkeys3 + "@" + that.data.brandName4,
            total_price: that.data.total
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res)
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
      }
    if (that.data.brandName && that.data.brandName1 && that.data.brandName4 && (!that.data.brandName2) && (!that.data.brandName3) && (that.data.brandName5)) {
        wx.request({
          url: url + '/cwg-wechat-app/submit_info',
          method: "POST",
          data: {
            service: "商标注册",
            name: that.data.name,
            phone: that.data.phone,
            item_list: that.data.brandkeys + "@" + that.data.brandName + "|" + that.data.brandkeys1 + "@" + that.data.brandName1 + "|" + that.data.brandkeys2 + "@" + that.data.brandName5 + "|" + that.data.brandkeys3 + "@" + that.data.brandName4,
            total_price: that.data.total
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res)
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
    }
    if (that.data.brandName && that.data.brandName1 && that.data.brandName4 && (that.data.brandName2) && (that.data.brandName3) && (!that.data.brandName5)) {
        wx.request({
          url: url + '/cwg-wechat-app/submit_info',
          method: "POST",
          data: {
            service: "商标注册",
            name: that.data.name,
            phone: that.data.phone,
            item_list: that.data.brandkeys + "@" + that.data.brandName + "|" + that.data.brandkeys1 + "@" + that.data.brandName1 + "|" + that.data.brandkeys2 + "@" + that.data.brandName2.join(";") + that.data.brandName3.join(";")+ "|" + that.data.brandkeys3 + "@" + that.data.brandName4,
            total_price: that.data.total
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res)
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
    } 

    if (that.data.brandName && that.data.brandName1 && that.data.brandName4 && (!that.data.brandName2) && (that.data.brandName3) && (that.data.brandName5)) {
      wx.request({
        url: url + '/cwg-wechat-app/submit_info',
        method: "POST",
        data: {
          service: "商标注册",
          name: that.data.name,
          phone: that.data.phone,
          item_list: that.data.brandkeys + "@" + that.data.brandName + "|" + that.data.brandkeys1 + "@" + that.data.brandName1 + "|" + that.data.brandkeys2 + "@" + that.data.brandName3.join(";") + that.data.brandName5.join(";") + "|" + that.data.brandkeys3 + "@" + that.data.brandName4,
          total_price: that.data.total
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res)
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
    } 
    if (that.data.brandName && that.data.brandName1 && that.data.brandName4 && that.data.brandName2&& that.data.brandName3 && that.data.brandName5) {
      wx.request({
        url: url + '/cwg-wechat-app/submit_info',
        method: "POST",
        data: {
          service: "商标注册",
          name: that.data.name,
          phone: that.data.phone,
          item_list: that.data.brandkeys + "@" + that.data.brandName + "|" + that.data.brandkeys1 + "@" + that.data.brandName1 + "|" + that.data.brandkeys2 + "@" + that.data.brandName2.join(";") + that.data.brandName3.join(";") + that.data.brandName5.join(";") + "|" + that.data.brandkeys3 + "@" + that.data.brandName4,
          total_price: that.data.total
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res)
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
    }
    if (that.data.brandName && that.data.brandName1 && that.data.brandName4 && (that.data.brandName2) && (!that.data.brandName3) && (that.data.brandName5)) {
      wx.request({
        url: url + '/cwg-wechat-app/submit_info',
        method: "POST",
        data: {
          service: "商标注册",
          name: that.data.name,
          phone: that.data.phone,
          item_list: that.data.brandkeys + "@" + that.data.brandName + "|" + that.data.brandkeys1 + "@" + that.data.brandName1 + "|" + that.data.brandkeys2 + "@" + that.data.brandName2.join(";") + that.data.brandName5.join(";") + "|" + that.data.brandkeys3 + "@" + that.data.brandName4,
          total_price: that.data.total
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res)
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
    }
    if (that.data.brandName && that.data.brandName1 && that.data.brandName4 &&     (that.data.brandName2||that.data.brandName3||that.data.brandName5)) {
      that.setData({
        error: ""
      })
    }else{
      that.setData({
        error: "您还有未选择项目"
      })
    } 
  },
  sendeCode(){
    var that=this;
    if ((/^1[34578]\d{9}$/.test(that.data.phone))) {
      that.setData({
        error: "",
        disabled: true,
      })
    wx.request({
      url: certificationUrl+'sendmsg_server/send_code',
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
       if(res.data.error_no==0){
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