import axios from "axios"
import Element from 'element-ui'
import router from './router'
import store from './store'

axios.defaults.baseURL = process.env.VUE_APP_AXIOS_URL

//前置拦截 (发起请求作的配置)
axios.interceptors.request.use(config => {
    return config
})

//后置拦截
axios.interceptors.response.use(response => {
    let res = response.data;
    if (res.code == 200) {
        return response;
    } else {
        //这是在后台通过“非异常处理”返回的“错误状态response”，所以请求头状态码依旧是200，会触发该fulfil动作
        //整体上来说，这两行代码，也就是该处理逻辑，与之后在“异常处理”中的处理方式完全相同
        Element.Message.error(res.msg, { duration: 3 * 1000 });
        return Promise.reject(res.msg);
    }
}, error => {
    //如果在后台框架中，触发了异常处理器的相关函数，都会使得response中的响应头状态码变为非200
    //进而触发该error动作，而不是上面的fulfil动作
    console.log(error);
    if (error.response.data) {
        error.message = error.response.data.msg;
    }
    //401是权限报错，这也说明当前的token是无效的，所以我们本地可以清除掉与该token相关的信息
    if (error.response.status == 401) {
        store.commit("REMOVE_INFO")
        router.push("/login")
    }
    //与“非异常处理”response完全相同，这样后文的处理逻辑就很类似了
    Element.Message.error(error.message, { duration: 3 * 1000 });
    return Promise.reject(error);
})