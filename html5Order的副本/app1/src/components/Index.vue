<template>
  <div>
    <div>
    <div>
    <mt-cell title="姓名" :value="productInfo.user_name" ></mt-cell>
    <mt-cell title="电话" :value="productInfo.user_phone"></mt-cell>
    <mt-cell title="服务" :value="name.product_name"></mt-cell>
    <mt-cell title="价格" class="price" :value="'¥'+productInfo.price"></mt-cell>
    <mt-cell title="市场价格" class="marketprice" :value="'¥'+name.market_value"></mt-cell>
    </div>
    <div>
      <img src="../assets/image/pay_img@2x.png" style="height:12.5rem; "/>
    </div>
    <div style="position:absolute;bottom:3.08333333333rem;width:31.25rem;">
    <div v-if="!paysucess" class="paytitle" style="margin-bottom:-1.3rem;">
      选择支付方式
    </div>
    <ul>
      <li v-if="!paysucess">
        <div style="float: left;vertical-align: center"><img src="../assets/image/WeChat_icon@2x.png" style="width:2.5833rem;height:2.5833rem;margin-left: 1.25rem;margin-top: 0.6rem;"/>
         <div style="float: right;margin-top: 1rem;margin-left: 1rem;">微信支付</div>
        </div>
        <div  @click="pay('微信')" style="float: right;">
          <img v-if="show2" src="../assets/image/cancel_select_btn@2x.png" style="width:1.5rem;height: 1.5rem;margin-top: 1.2rem;margin-right: 1.5rem;"/>
          <img v-if="show1" src="../assets/image/cancel_nor_btn@2x.png" style="width:1.5rem;height: 1.5rem;margin-top: 1.2rem;margin-right: 1.5rem;"/>
        </div>
      </li>
      <li v-if="!paysucess">
        <div style="float: left;"><img src="../assets/image/Alipay_icon@2x.png" style="width:2.5833rem;height:2.5833rem;margin-left: 1.25rem;margin-top: 0.6rem;"/>
          <div style="float: right;margin-top: 1rem;margin-left: 1rem;">支付宝支付</div>
        </div>
        <div  @click="pay('支付宝')" style="float: right">
          <img v-if="show3" src="../assets/image/cancel_select_btn@2x.png" style="width:1.5rem;height: 1.5rem;margin-top: 1.2rem;margin-right: 1.5rem;"/>
          <img v-if="show4" src="../assets/image/cancel_nor_btn@2x.png" style="width:1.5rem;height: 1.5rem;margin-top: 1.2rem;margin-right: 1.5rem;"/>
        </div>
      </li>
    </ul>
    </div>
    <mt-button v-if="!paysucess" style="position: fixed;bottom: 0px;font-size:1.8rem;" size="large" type="primary" @click="save()">确认支付</mt-button>
    <mt-button :class="paysucess?'button':''"  style="position: fixed;bottom: 0px;font-size:1.8rem;" size="large" type="primary" v-if="paysucess">已支付</mt-button>
    </div>
  </div>
</template>
<script>
  import '../assets/css/my-mint.css';
  import Api from '../assets/js/Api.js';
  import Http from '../assets/js/Http.js';
export default {
  name: 'HelloWorld',
  data () {
    return {
      show1:false,
      show2:true,
      show3:false,
      show4:true,
      payName:"微信",
      productInfo:"",
      paysucess:false,
      name:"",
      orderId:"",
      oepnid:"",
      msg: '',
      width:"",
      height:"",
      srcdata:"https://openapi.alipay.com/gateway.do?app_id=2017120600406890&biz_content=%7B%22subject%22%3A%22%5Cu6709%5Cu9650%5Cu8d23%5Cu4efb%5Cu516c%5Cu53f8%5Cu6ce8%5Cu518c%22%2C%22out_trade_no%22%3A%2261244e09279ecf9eacbc7425de3381c7%22%2C%22total_amount%22%3A%221099.0%22%2C%22product_code%22%3A%22QUICK_WAP_PAY%22%7D&charset=utf-8&method=alipay.trade.wap.pay&notify_url=https%3A%2F%2Fwww.5dcfo.com%2Falipay_notify&return_url=localhost%3A8657&sign_type=RSA2&timestamp=2018-06-12+15%3A57%3A06&version=1.0&sign=RH2Vm1fMe%2BEGoLYMAHQVeCKZCugbCUWZ7GxAMuYbClkOJ3by4nzSsxMlxuedAgtr92KiG08%2FZ%2FiQK8kkb1Nl19EHoi6iV69GaTHZwwpr73uGS335feQghYUxrlQ%2BC03N8msSYG7EjKcx2irgWPvNpXElt9UcU16uhMzCh2Xk2sEMgolMaozRedLlELDwxyqEVdO6yPZG99bGM%2BtnnaYsr%2FybqSyUXS0ZcxDvpJSHD7X5ySBvF4wjVjZ%2F13mS8AmScoXRV0jE02%2BS%2Fl%2FsLxLsL9xoYXcVIsJKl8gnslX9xK4CBkZ0eBBZafMo8KTO9toC6QtjCE1YTuTkPAVmWJlskQ%3D%3D",
      bollenTrue:true
    }
  },
  created:function(){
    this.height=window.innerHeight;
    this.width=window.innerWidth;
    var that=this;
    function getUrlParms(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null)
        return unescape(r[2]);
      return null;
    }
    if(getUrlParms("code")){
      console.log(getUrlParms("code"))
      that.code=getUrlParms("code");
      that.getcode();
      that.bollenTrue=false;
    }
    this.orderId= getUrlParms("order_id");
    if(that.isWeiXin()){
      if(that.bollenTrue){
        this.weixinBollon()
      }
    }
    this.article_type_list()
    this.article_type_success()
  },
  methods:{
    weixinBollon:function() {
     //判断是否微信登陆
     var that=this;
     window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8900ebd69c04ab38&redirect_uri=http://web.5dcfo.com/html5Order/index.html?order_id="+this.orderId+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
    },
    pay:function (data) {
      var _this=this;
     switch (data) {
       case "微信":
         _this.payName="微信"
         _this.show2=true;
         _this.show1=false;
         _this.show3=false;
         _this.show4=true;

         break;
       case "支付宝":
         _this.payName="支付宝"
         _this.show2=false;
         _this.show1=true;
         _this.show3=true;
         _this.show4=false;
         break;
     }
    },
    async article_type_list(){
      var that=this;
      const result =await Http.get('pay/order_detail',{order_id:that.orderId})

      if( result.error_no==0){
        that.productInfo=result.data.order_list[0]
        that.name=result.data.order_list[0].product_list[0]
      }
    },
    async getcode(){
      var that=this;
      const result =await Http.get('pay/get_openid',{code:that.code})
      if( result.error_no==0){
        that.openid=result.data.openid
      }
    },
    isWeiXin:function() {
      var ua = window.navigator.userAgent.toLowerCase();
      console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    },
    async article_type_success(){
      var that=this;
      const result =await Http.get('pay/pay_success',{order_id:that.orderId})
      if( result.error_no==0) {
        if(result.data.is_pay=="yes"){
          that.paysucess=true;

        }
        if(result.data.is_pay=="no"){
          that.paysucess=false;

        }
      }
    },
    async save() {
      var that=this;
      switch (this.payName) {
        case "微信":
          if(that.isWeiXin()){
            var obj={
              pay_type:"weixin",
              body:that.name.product_name,
              price:that.productInfo.price,
              order_id:that.productInfo.order_id,
              dryrun:"0",
              openid:that.openid
            }
            const result =await Http.post('pay/unifiedorder',obj);
            if(result.error_no==0) {
              window.sessionStorage.setItem("orderId","")
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                {
                  "appId": result.data.appId,     //公众号名称，由商户传入
                  "timeStamp": result.data.timeStamp, //时间戳，自1970年以来的秒数
                  "nonceStr": result.data.nonceStr, //随机串
                  "package": result.data.package,
                  "signType": result.data.signType,//微信签名方式：
                  "paySign": result.data.paySign//微信签名
                },
                function (res) {
                  if (res.err_msg == "get_brand_wcpay_request:ok") {
                    window.location.href = "http://web.5dcfo.com/html5Order/index.html?order_id="+ that.orderId;
                  }
                })
            }
          }else{
            var obj={
              pay_type:"weixin",
              body:that.name.product_name,
              price:that.productInfo.price,
              order_id:that.productInfo.order_id,
              dryrun:"0"
            }
            const result =await Http.post('pay/unifiedorder',obj);
            if(result.error_no==0){
              window.location.href=result.data.MWEB_URL;
            }
          }
          break;
        case "支付宝":
          var obj={
            pay_type:"alipay",
            body:that.name.product_name,
            price:that.productInfo.price,
            order_id:that.productInfo.order_id,
            dryrun:"0"
          }
          const result1 =await Http.post('pay/unifiedorder',obj);
          if(result1.error_no==0){
            if(that.isWeiXin()){
              that.$router.push({path:'/image', query: { pay_type:"alipay",
                  body:that.name.product_name,
                  price:that.productInfo.price,
                  order_id:that.productInfo.order_id,
                  dryrun:"0"}});
             //window.location.replace("https://openapi.alipay.com/gateway.do?"+result1.data)
            }else{
              window.location.href="https://openapi.alipay.com/gateway.do?"+result1.data;
            }
          }
          break;
      }
    }
  }
}
</script>
<style scoped>
.button{
  background: #d3d4d6;
  color: #000;
}
</style>
