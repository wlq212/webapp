<template>
  <div>
    <img src="../assets/image/bg.png" :width="width" style="height:116.666666rem; "/>
    <img src="../assets/image/turntable@2x.png" id="rotate"  style="width:27.25rem;height: 27.25rem;position: absolute;top:12rem;left:2rem;">
    <img src="../assets/image/button@2x.png" @click="showModel()" style="width:8.5rem;height: 10rem;position: absolute;top:0rem;top: 20rem;
    left: 11.5rem;"/>
    <div style="font-size:1.6rem;color:rgb(239,101,2);position: absolute;top:41rem;text-align: center;width:31.25rem;">您剩余抽奖次数：<span class="cover_num" style="font-size:2rem;color: #fff;">{{count}}</span>次</div>
    <div style="position: absolute;text-align: left;width:27.666666666rem;margin:0 auto;color: rgb(255,255,255);top:81.7rem;left:2rem;font-size:1.3rem;">
       <p>1.&nbsp;&nbsp;抽奖时间：2018年6月30号；</p>
       <p>2.&nbsp;&nbsp;参与要求：通过财务官小程序购买"一元活动"，成为我的财务官会员；</p>
      <p>3.&nbsp;&nbsp;抽奖次数：会员每人有三次机会；</p>
      <p>4.&nbsp;&nbsp;活动最终解释权归我的财务官所有；</p>
    </div>
    <div class="modelclass" v-if="modelShow">
       <img src="../assets/image/close_btn@2x.png" style="width:1.75rem;height: 1.75rem;position: absolute;right:0.2rem;top:0.2rem;" @click="closeButton()"/>
       <div v-if="modelContent1" >
         <div><input placeholder="请提交您的电话号码" v-model="phone" style="width:14.33333rem;    padding-left: 4rem;font-size:1rem;color:#fff;margin:1.7rem 0rem;height: 3rem;background:none;border: 0.083333rem solid #fff;border-radius: 0.41666666rem;" type="text"/></div>
         <div><button style="width:18.53333rem;height: 3rem;background: #fff;border-radius: 0.41666666rem;font-size: 1.3333rem;color: rgb(233,87,3); " @click="postphone()">确定</button></div>
       </div>
      <div v-if="modelContnet2">
        <div style="width:15rem;color: #fff;    margin: 2rem auto;">
          非常抱歉,您的抽奖次数已用完，谢谢您的参与！
        </div>
        <div><button style="width:18.53333rem;height: 3rem;background: #fff;border-radius: 0.41666666rem;font-size: 1.3333rem;color: rgb(233,87,3); " @click="closeButton()">我知道了</button></div>
      </div>
      <div v-if="modelContnet3">
        <div style="width:15rem;color: #fff;    margin: 2rem auto;">
          非常抱歉，当前活动仅限于财务官会员参加
        </div>
        <div><button style="width:18.53333rem;height: 3rem;background: #fff;border-radius: 0.41666666rem;font-size: 1.3333rem;color: rgb(233,87,3); " @click="closeButton()">我知道了</button></div>
      </div>
      <div v-if="modelContnet4">
        <div style="width:15rem;color: #fff;    margin: 2rem auto;">
          {{msg}}
        </div>
        <div><button style="width:18.53333rem;height: 3rem;background: #fff;border-radius: 0.41666666rem;font-size: 1.3333rem;color: rgb(233,87,3); " @click="closeButton()">我知道了</button></div>
      </div>
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
      height:"",
      width:"",
      phone:"",
      count:0,
      buttonClick:true,
      modelShow:false,
      bRotate:false,
      modelContent1:true,
      modelContnet2:false,
      modelContnet3:false,
      modelContnet4:false,
      msg:""
    }
  },
  created:function(){
    var that=this;
    this.width=window.innerWidth;
    if(window.localStorage.getItem("phone")){
      that.phone=window.localStorage.getItem("phone");

         window.localStorage.clear();
    }
  },
  methods:{
    closeButton:function () {
      if(window.localStorage.getItem("user_id")){
        var that=this;
        this.modelShow=false;
        that.modelContent1=true;
        that.modelContnet2=false;
        that.modelContnet3=false;
        that.modelContnet4=false;
      }else{
        var that=this;
        this.modelShow=false;
        that.modelContent1=true;
        that.modelContnet2=false;
        that.modelContnet3=false;
        that.modelContnet4=false;
      }

    },
    async postphone(){
      var that=this;
      var myreg= /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if(myreg.test(that.phone)) {
        var result = await Http.post("lottery/user_check", {phone: that.phone});
        if (result.error_no == 0) {
          if (result.data.status == "yes") {
            that.count = result.data.times;
            that.modelShow = false;
            that.modelContent1 = false;
            that.modelContnet2 = false;
            that.modelContnet3 = false;
            window.localStorage.setItem("phone", that.phone)
            window.localStorage.setItem("user_id", result.data.user_id)
          }
          if (result.data.status == "no") {
            that.count = 0;
            that.modelContent1 = false;
            that.modelContnet2 = true;
            that.modelContnet3 = false;
          }
        }
        if (result.status == false) {
          if (result.data.error_no == 4) {
            that.count = 0;
            that.modelContent1 = false;
            that.modelContnet2 = false;
            that.modelContnet3 = true;
          }

        }
      }
    },
     showModel:function () {

        var that = this;
        if (!window.localStorage.getItem("user_id")) {
          var that = this;
          this.modelShow = true;
          that.modelContent1 = true;
          that.modelContnet2 = false;
          that.modelContnet3 = false;
        } else {
          if (that.count != 0) {
            if(that.buttonClick) {
              that.buttonClick=false;
              var result = Http.get("lottery/start", {user_id: window.localStorage.getItem("user_id")});
              result.then(function (resultData) {
                if (resultData.error_no == 0) {
                  if (JSON.stringify(resultData.data) != "{}") {
                    that.rotateFn(resultData.data.award_type, resultData.data.angle, resultData.data.msg);
                    that.count = resultData.data.times;
                  } else {
                    that.count = 0;
                    that.modelShow = true;
                    that.modelContent1 = false;
                    that.modelContnet2 = true;
                    that.modelContnet3 = false;
                  }
                }
              }, function () {
                that.modelShow = true;
                that.modelContent1 = false;
                that.modelContnet2 = false;
                that.modelContnet3 = false;
                that.modelContnet4 = true;
                that.msg = "系统异常";
              })
            }
          } else {
            that.modelShow = true;
            that.modelContent1 = false;
            that.modelContnet2 = true;
            that.modelContnet3 = false;
          }
        }

    },
    rotateFn:function (awards, angles, txt) {
      var that=this;
      this.bRotate = !this.bRotate;
      $('#rotate').stopRotate();
      $('#rotate').rotate({
        angle:0,
        animateTo:angles+2820,
        duration:8000,
        callback:function (){
            that.modelShow=true;
            that.modelContent1=false;
            that.modelContnet2=false;
            that.modelContnet3=false;
            that.modelContnet4=true;
            that.msg=txt;
            that.buttonClick=true;
        }
      })
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
