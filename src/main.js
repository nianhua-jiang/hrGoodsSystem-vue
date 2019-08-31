// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import $ from "jquery"

Vue.use(iView)
Vue.config.productionTip = false
Vue.prototype.hr = '/hrGoodsSystem'

//路由的前置方法
router.beforeEach((to, from, next) => {
  if (to.path != "/login" && to.path != "/newUserInfo") {
    //发送Ajax验证用户是否登录
    $.ajax({
      url: Vue.prototype.hr + "/user/isLogin",
      async: false,
      type: "post",
      data: null,
      success: (json) => {
        if (json) {
          //TODO 检测用户权限
          next();
        } else {
          //失败跳转登录页面
          next("login");
        }

      },
      error: (error) => {
        console.log(error)
      }
    });
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'

})
