
export default {
    /**
    * 存储localStorage
    */
    setStore(name, content){
      if (!name) return;
      if (typeof content !== 'string') {
        content = JSON.stringify(content);
      }
      window.localStorage.setItem(name, content);
    },

    /**
     * 获取localStorage
    */
    getStore(name){
      if (!name) return;
      return window.localStorage.getItem(name);
    },

    /**
     * 删除localStorage
    */
    removeStore (name) {
      if (!name) return;
      window.localStorage.removeItem(name);
    },

    /**
     * 控制台输出
     */
    log(name) {
      console.log(name);
    },

    /**
     * 弹窗输出
     */
    model(name) {
      alert(name);
    },

    /**
     * 验证手机号
     */
    availablePhone(phone){
      return /^1[3|4|5|6|8]\d{9}$/.test(phone)
    }
}


