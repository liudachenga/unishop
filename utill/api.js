// import Vue from 'vue'

//封装的获取数据失败弹框
uni.baseToast = function (str = '数据获取失败') {
    uni.showToast({
        title: str,
        icon: 'none',
        duration: 1500
    })
}

// 根路径
const baseURL = 'http://localhost:8082'

// 封装get请求
uni.get = function (url, data = {}) {
    return uni.request({
        url: baseURL + url,
        method: 'GET',
        data: data
    })
}

// 封装post请求
uni.post = function (url, data = {}) {
    return uni.request({
        url: baseURL + url,
        method: 'POST',
        data: data
    })
}
