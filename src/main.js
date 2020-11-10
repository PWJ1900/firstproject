// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'// 此处可以写路由拦截
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import VueUeditorWrap from 'vue-ueditor-wrap'
Vue.component('vue-ueditor-wrap', VueUeditorWrap)




Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true;//此处增加请求头，以便于后端json获取

// router.beforeEach((to, from,next)=>{
//   if(to.meta.rerequireAuth){
//         next('/Helloworld')
//   }
//   else{
//     next({path:'/'})
//   }
// })//此处为定义路由拦截
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
