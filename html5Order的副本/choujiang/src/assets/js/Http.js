'use strict';
import axios from 'axios'

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
});

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: false,
    msg: '网络异常',

  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === false) {
  }else{
    if (res.data && res.data.error_no != 0) {
      if(res.data.error_no == 4){
        res.mark = true;
      }
      res.status = false;
    }else{
      res = res.data;
      res.status = true;
    }
  }
  return res;
}

export default {
  post (url, data,type) {
    var baseurl;
    if(type === 'code'){
      baseurl = "https://micro.5dcfo.com/"
    }else{
      baseurl = "http://39.108.231.191:8685/"
    }
    return axios({
      method:'POST',
      baseURL:baseurl,
      url,
      data: JSON.stringify(data),
      timeout: 10000,
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url,params) {
    return axios({
      method: 'get',
      url: 'http://39.108.231.191:8685/'+url,
      params,
      /*timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }*/
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
}
