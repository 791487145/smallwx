App({
  globalData:{
    secret:'6687541fe21d85123758f89c887ea1ef',
    appid:'wx918363e91a8ca3e9',
    openid:''
  },


  getUserOpenId: function (callback) {
    var self = this

    if (self.globalData.openid) {
      //console.log(1)
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function (date) {
          console.log(date);
          wx.request({
            url: 'https://devapi.yyougo.com/v1/wx/sessionKey',
            data: {
              appid: self.globalData.appid,
              secret: self.globalData.secret,
              js_code: date.code,
              grant_type: 'authorization_code'              
            },
            method: 'GET',
            success: function (res) {
              console.log('拉取openid成功', res)
              // self.globalData.openid = res.data.openid
              // callback(self.globalData.openid)
            },
            fail: function (res) {
              //console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function (err) {
          //console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  }


  getUserInfo: function (callback)
  {

  },

  wx.login({
    success: function (data) {
      console.log(data);
      var param = {
        appid: app.globalData.appid,
        secret: app.globalData.secret,
        js_code: data.code,
        grant_type: 'authorization_code'
      }
      util.httpget('https://devapi.yyougo.com/v1/wx/sessionKey', param, function (res) {
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

  

  
})


