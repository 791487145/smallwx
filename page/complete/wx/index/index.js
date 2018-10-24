// page/login/index.js
var util = require('../../../../util/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
  
  
  },
  // formSubmit: function (e) {
    
  //   var formsubmit = e.detail.value;
  //   console.log(formsubmit);
    
  //   if (formsubmit.name == ''){
  //     wx.showToast({
  //       title:"请填写用户名称"
  //     })
  //   } 
  //   wx.request({
  //     url: 'https://devapi.yyougo.com/v1/cart', 
  //     data: { 
  //       uid:'24',
  //       goods_id:'1',
  //       spec_id:'1',
  //       num:'1',
  //       timestamp:'1',
  //       sign:'1'
  //     },
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     method:'POST',
     
  //     success: function (res) {
  //       console.log(res.data)
  //     }
  //   })
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    // util.httpget('https://devapi.yyougo.com/v1/conf/banner', { pavilion_id: '24' }, function(res){
    //   //console.log(res)
    //   that.setData({
    //       ConfBanners: res.data.data
    //   })
    // })

    // util.httpget('https://devapi.yyougo.com/v1/goods/theme_recommend', {pavilion_id: '24'}, function(res){
    //   //console.log(res)
    //   that.setData({
    //     ThemesGoods: res.data.data
    //   })
    // })

    // util.httpget('https://devapi.yyougo.com/v1/conf/pavilion', {}, function (res) {
    //   //console.log(res)
    //   that.setData({
    //     ConfPavilions: res.data.data
    //   })
    // })
    
    //登陆授权
    wx.login({
      success: function (data) {
        console.log(data);
        var param = {
          appid: app.globalData.appid,
          secret: app.globalData.secret,
          js_code: data.code,
          grant_type:'authorization_code'
        }
        util.httpget('https://devapi.yyougo.com/v1/wx/sessionKey', param,function(res){
          //console.log(res)
          // util.cookie('sessionKey', res.data.session_key);
          // util.cookie('openId', res.data.openid);
          var sessionKey = res.data.session_key;
          wx.getUserInfo({
            withCredentials: true,
            success: function (msg) {
              var data = {
                iv: msg.iv,
                sessionKey: sessionKey,
                appid: app.globalData.appid,
                encryptedData: msg.encryptedData
              };
              console.log(data);
              util.httpget('https://devapi.yyougo.com/v1/wx/userInfo', data, function (res) {
                console.log(res)
              })
            }
          })         
        })
      }
    })

    // app.getUserOpenId(function (res){
    //   console.log(res)
      
    // })

        // wx.getUserInfo({
        //   withCredentials: true,
        //   success: function (msg) {
        //     var data = {
        //       iv: msg.iv,
        //       sessionKey: '',
        //       appid: app.globalData.appid,
        //       encryptedData:msg.encryptedData
        //     };
        //     util.httpPost('https://devapi.yyougo.com/v1/wx/userInfo',data,function(res){
        //       console.log(res)
        //     })
        //   }
        // })

    //定位
    //  wx.getLocation({
    //    type: 'wgs84',
    //    success: function (res) {
    //      console.log(res);
    //    },
    //    fail: function (e) {
    //      console.log(e);
    //    }
    //  })
    
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

  //ajax
  cartInsert: function (event) {
    //console.log(event.currentTarget.dataset.goodsId);
    var that = this;
    data: {
      uid: '1';
      spec_id:'1';
      goods_id:'1';
      num:'1';
      timestamp:'1';
      sign:'1'
    };
    util.httpPost('https://devapi.yyougo.com/v1/cart',data,function(res){
      console.log(res)
      wx.showToast({
        title: "加入购物车成功"
      })
    })
  },


  //图片上传
  chooseImage: function (event) {
    var that = this;
    wx.chooseImage({
      count: 5, // 一次最多可以选择2张图片一起上传
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        //console.log(tempFilePaths)
        util.upload('https://devapi.yyougo.com/v1/upload/image', 'body', tempFilePaths,function(res){
          console.log(res)
        })
      
      }
    })
  },

  //文件下载
  downupload:function (event) {
    var that = this;
    //console.log(event)
    wx.downloadFile({
      url: 'https://img2.yyougo.com/2583ac559be157dbbb99.jpeg', 
      success: function (res) {
        console.log(res)
        // wx.playVoice({
        //   filePath: res.tempFilePath
        //   console.log()
        // })
      }
    })
  }
  

  

  

})