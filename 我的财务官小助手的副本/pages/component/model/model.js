Component({

  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

    backdrop: {
      type: Boolean,
      value: true
    },

    animated: {
      type: Boolean,
      value: true
    },

    modalSize: {
      type: String,
      value: "md"
    },

    animationOption: {
      type: Object,
      value: {
        duration: 300
      }
    }

  },
  ready: function () {
    this.animation = wx.createAnimation({
      duration: this.data.animationOption.duration,
      timingFunction: "linear",
      delay: 0
    });
  },
  methods: {
    hideModal: function (e) {
      if (e) {
        let type = e.currentTarget.dataset.type;
        if (type == 'mask' && !this.data.backdrop) {
          return;
        }
      }
      if (this.data.isShow) this._toggleModal();
    },

    showModal: function () {
      if (!this.data.isShow) {
        this._toggleModal();
      }
    },

    _toggleModal: function () {
      if (!this.data.animated) {
        this.setData({
          isShow: !this.data.isShow
        })
      }
      else {
        let isShow = !this.data.isShow;
        this._executeAnimation(isShow);
      }


    },

    _executeAnimation: function (isShow) {
       
      }

}
})