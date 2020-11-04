import Vue from 'vue'
import Router from 'vue-router'
import Helloworld from '@/components/Helloworld'
import fromit from '@/components/from'
import newit from '@/components/new.vue'
import loginset from '@/components/Myloginin.vue'
//此处使用路由拦截

Vue.use(Router)
// export default new Router({//这边改写
 const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/Helloworld',
      name: 'Helloworld',
      component: Helloworld,
      
    },
    {
      path: '/from',
      name: 'from',
      component: fromit,
      
    },
    {
      path: '/new',
      name: 'new',
      component: newit,
      
    },
    {
      path: '/',
      name: 'login',
      component: loginset,
      // meta:{
      //   requireAuth:true
      // }
      
    },


  ]
});
//路由拦截(完成)
router.beforeEach((to, from,next)=>{
  let abc = sessionStorage.getItem('user')
  if(to.name=='login'){
  next()}
  else if(to.name=='Helloworld'){
    if(abc=='admin'){
      next()
    }else{
      next({name:'login'})
    }
  }
  
});
export default router;



