<template>
  <div>
    <img src="../assets/image/1.png" :width="width" :height="height"/>
  </div>
</template>
<script>
  import Api from '../assets/js/Api.js';
  import Http from '../assets/js/Http.js';
  export default {
    data(){
      return{
        height:"",
        width:""
      }
    },
    created:function () {
      var that=this;
      this.height=window.innerHeight;
      this.width=window.innerWidth;
      this.isWeiXin()
    },
    methods:{
      isWeiXin:function() {

        var that=this;
        var ua = window.navigator.userAgent.toLowerCase();
        console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          return true;
        } else {
          that.alipay()
          return false;
        }
      },
      async alipay(){
       var that=this;
       console.log(that.$router.currentRoute)
        const result1 =await Http.post('pay/unifiedorder',{
          pay_type:that.$router.currentRoute.query.pay_type,
          body:that.$router.currentRoute.query.body,
          price:that.$router.currentRoute.query.price,
          order_id:that.$router.currentRoute.query.order_id,
          dryrun:"0"
        });
        if(result1.error_no==0){
            window.location.href="https://openapi.alipay.com/gateway.do?"+result1.data;

        }
      }
    }
  }
</script>
