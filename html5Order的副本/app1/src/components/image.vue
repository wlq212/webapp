<template>
  <div>
    <img v-if="imageShow" src="../assets/image/1.png" :width="width" :height="height"/>
  </div>
</template>
<script>
  import Api from '../assets/js/Api.js';
  import Http from '../assets/js/Http.js';
  export default {
    data(){
      return{
        height:"",
        width:"",
        imageShow:true
      }
    },
    created:function () {
      var that=this;
      this.isWeiXin();
      this.height=window.innerHeight;
      this.width=window.innerWidth;

    },
    methods:{
      isWeiXin:function() {
        var that=this;
        var ua = window.navigator.userAgent.toLowerCase();
        console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          return true;
        } else {
          that.imageShow=false;
          that.alipay()
          return false;
        }
      },
      async alipay(){
       var that=this;
        function getUrlParms(name){
          var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
          var r = window.location.search.substr(1).match(reg);
          if(r!=null)
            return unescape(r[2]);
          return null;
        }
        const result1 =await Http.post('pay/unifiedorder',{
          pay_type:getUrlParms("pay_type"),
          body:getUrlParms("body"),
          price:getUrlParms("price"),
          order_id:getUrlParms("order_id"),
          dryrun:"0"
        });
        if(result1.error_no==0){
            window.location.href="https://openapi.alipay.com/gateway.do?"+result1.data;

        }
      }
    }
  }
</script>
