function httpget(url, data, callback) 
{
  wx.request({
    url: url,
    data: data,
    header: {
      'content-type': 'application/json'
    },
    method: 'GET',

    success: function (res) {
      //console.log(res)
      callback(res)
    }
  });
}

function httpPost(url, data, callback) 
{
  wx.request({
    url: url,
    data: data,
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',

    success: function (res) {
      //console.log(res)
      callback(res)
    }
  });
}

function upload(url, data,tempFilePaths,callback)
{
  wx.uploadFile({
    url: url,
    filePath: tempFilePaths[0],
    name: data,
    formData: {
      'user': 'test'
    },
    success: function (res) {
      callback(res.data)
      //var data = res.data
      //do something
    },
    fail: function (res) {
      callback(res.data)
      //console.log(1)
      //console.log(res)
    }
  })
}

function cookie(key,value)
{
  wx.setStorage({
    key: key,
    data: value
  })
}

function getCookie(key,callback)
{
  wx.getStorage({
    key: key,
    success: function (res) {
      callback(res.data)
    }
  })
}

module.exports = {
  httpget: httpget,
  httpPost: httpPost,
  upload: upload,
  cookie: cookie,
  getCookie: getCookie
}
