<template>
<div class="homeWrap">
<el-container style="margin:0;height:100%">
  <el-header style="text-align: right;font-size: 18px;background-color: rgb(48, 65, 86)">欢迎来到管理系统
    <el-dropdown>
        <i class="el-icon-s-custom" style="margin-left: 1200px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="lookusername()">更改信息</el-dropdown-item>
          <el-dropdown-item @click.native="addFormstate=true">新增</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{getname}}</span>
  </el-header>
<el-container style="height: 100%; border: 1px solid #eee;background-color:rgb(191, 203, 217);">
  <el-aside width="200px" style="background-color: rgb(191, 203, 217)">
    <el-menu :default-openeds="['1', '3']" style="background-color: rgb(48, 65, 86);" id="coloruse">
      <el-submenu index="1">
        <template slot="title" ><i class="el-icon-s-check"></i><span>后台管理系统</span></template>
        <el-menu-item-group style="background-color: rgb(48, 65, 86)">
          <el-menu-item index="1-1" @click="change" style="color:#aab2c3;"><span>信息预览</span></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i><span>更改信息</span></template>
        <el-menu-item-group style="background-color: rgb(48, 65, 86)">
          <el-menu-item index="2-1" @click="achievechange" style="color:#aab2c3;">成就</el-menu-item>
          <el-menu-item index="2-2" @click="Articles" style="color:#aab2c3;">文章</el-menu-item>
          <el-menu-item index="2-3" @click="Index_introductions" style="color:#aab2c3;">介绍</el-menu-item>
          <el-menu-item index="2-4" @click="Index_peoples" style="color:#aab2c3;">Index_peoples</el-menu-item>
          <el-menu-item index="2-5" @click="Index_sliders" style="color:#aab2c3;">Index_sliders</el-menu-item>
          <el-menu-item index="2-6" @click="People_detail_simples" style="color:#aab2c3;">个人详情简介</el-menu-item>
          <el-menu-item index="2-7" @click="People_educations" style="color:#aab2c3;">个人文化水平</el-menu-item>
          <el-menu-item index="2-8" @click="Peoplesue" style="color:#aab2c3;">个人</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i><span>设置</span></template>
      </el-submenu> -->
    </el-menu>
  </el-aside>
  <el-main>
     <el-dialog
      title="新增管理员信息"
      :visible="addFormstate"
      size="tiny"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <el-form
        id="#addsForm"
        ref="addsForm"
        :model="addsForm"
        label-width="100px"
      >
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="addsForm.name" max-length="10"></el-input>
        </el-form-item>
        <el-form-item label="账号:" prop="number">
          <el-input v-model="addsForm.number"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="addsForm.password"></el-input>
         
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="userAdd()">确定</el-button>
          <el-button
            @click="
              addFormstate = false;
              canceladdT('formt');
            "
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
        <el-dialog
      title="更改管理员信息"
      :visible="edituser"
      size="tiny"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <el-form
        id="#edForm"
        ref="edForm"
        :model="edForm"
        label-width="100px"
      >
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="edForm.name"></el-input>
        </el-form-item>
        <el-form-item label="账号:" prop="number">
         <el-input v-model="edForm.number"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="edForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userEdit()">确定</el-button>
          <el-button
            @click="
              edituser = false;
              canceladdT('formt');
            "
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
      <!-- <el-button type="success" v-if="ishow">MISSIT</el-button>
      <el-button type="warning" v-if="noshow">bu</el-button> -->
      <div v-if="acshow">
        <achieve></achieve>
      </div>
      <div v-if="arshow">
        <Articles></Articles>
      </div>
      <div v-if="inpeople">
        <Index_peoples></Index_peoples>
      </div>
      <div v-if="slider">
        <Index_sliders></Index_sliders>
      </div>
      <div v-if="intro">
        <Index_introductions></Index_introductions>
      </div>
      <div v-if="detail_simples">
        <People_detail_simples></People_detail_simples>
      </div>
      <div v-if="educations">
        <People_educations></People_educations>
      </div>
      <div v-if="peopleuse">
        <Peoples></Peoples>
      </div>
      
      <div v-if="ishow">
      <demo></demo>
      </div>
   
    </el-main>
</el-container>
</el-container>
</div>
</template>
<style scoped>
  .el-header {
    background-color: #698dbb;
    color: #aab2c3;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .homeWrap {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}
span{
  color: rgb(170, 178, 195);
}

</style>

<script>
import demo from '@/components/from2.vue'
import achieve from '@/components/Achievement.vue'
import Articles from '@/components/Articles.vue'
import Index_peoples from '@/components/Index_peoples.vue'
import Index_sliders from '@/components/Index_sliders.vue'
import Index_introductions from '@/components/Index_introductions.vue'
import People_detail_simples from '@/components/People_detail_simples.vue'
import People_educations from '@/components/People_educations.vue'
import Peoples from '@/components/Peoplese.vue'



  export default {
    data() {
      
      return{
        addFormstate:false,
        addsForm:{
          name:'',
          number:'',
          password:''
        },
        edForm:{
          name:'',
          number:'',
          password:''
        },
        edituser:false,
      getname:sessionStorage.getItem('username'),
      searchin:{},
      ishow:true,
      acshow:false,
      inpeople:false,
      slider:false,
      intro:false,
      detail_simples:false,
      educations:false,
      peopleuse:false,
      arshow:false




      }
    },
    components:{
     achieve,
     demo,
     Articles,
     Index_peoples,
     Index_sliders,
     Index_introductions,
     People_detail_simples,
     People_educations,
     Peoples



    },
    methods:{
      change(){
        this.acshow = false
        this.arshow = false
        this.inpeople = false
        this.slider = false
        this.intro = false
        this.detail_simples = false
        this.educations = false
        this.peopleuse = false
        this.ishow = true
        

      },
      userAdd(){
        let tran = this.addsForm
        tran['num'] = 3
         this.$http.post("http://127.0.0.1:8000/blog/gerloginper",tran).then((response)=>{
          console.log(response.data)
          this.addFormstate = false
          alert("更改成功")

          


        },(response)=>{

        })


      },
      userEdit(){
         let tran = this.edForm
         tran['num'] = 2
          console.log(tran)
        this.$http.post("http://127.0.0.1:8000/blog/gerloginper",tran).then((response)=>{
          console.log(response.data)
          this.edituser = false
          alert("更改成功")

          


        },(response)=>{

        })


      },
      achievechange(){
        this.acshow = true
        this.arshow = false
        this.inpeople = false
        this.slider = false
        this.intro = false
        this.detail_simples = false
        this.educations = false
        this.peopleuse = false
        this.ishow = false


      },
      Articles(){
        this.acshow = false
        this.arshow = true
        this.inpeople = false
        this.slider = false
        this.intro = false
        this.detail_simples = false
        this.educations = false
        this.peopleuse = false
        this.ishow = false

      },
      Index_introductions(){
        this.acshow = false
        this.arshow = false
        this.inpeople = false
        this.slider = false
        this.intro = true
        this.detail_simples = false
        this.educations = false
        this.peopleuse = false
        this.ishow = false

      },
      Index_peoples(){
        this.acshow = false
        this.arshow = false
        this.inpeople = true
        this.slider = false
        this.intro = false
        this.detail_simples = false
        this.educations = false
        this.peopleuse = false
        this.ishow = false

      },
      Index_sliders(){
        this.acshow = false
        this.arshow = false
        this.inpeople = false
        this.slider = true
        this.intro = false
        this.detail_simples = false
        this.educations = false
        this.peopleuse = false
        this.ishow = false

      },
      People_detail_simples(){
        this.acshow = false
        this.arshow = false
        this.inpeople = false
        this.slider = false
        this.intro = false
        this.detail_simples = true
        this.educations = false
        this.peopleuse = false
        this.ishow = false

      },
      People_educations(){
        this.acshow = false
        this.arshow = false
        this.inpeople = false
        this.slider = false
        this.intro = false
        this.detail_simples = false
        this.educations = true
        this.peopleuse = false
        this.ishow = false

      },
      closeDialog(){
        this.edituser = false
      },
      Peoplesue(){
        this.acshow = false
        this.arshow = false
        this.inpeople = false
        this.slider = false
        this.intro = false
        this.detail_simples = false
        this.educations = false
        this.peopleuse = true
        this.ishow = false

      },
      lookusername(){
      this.searchin["name"] = sessionStorage.getItem("username")
      let tran = this.searchin
      tran['num'] = 1
        this.$http.post("http://127.0.0.1:8000/blog/gerloginper",tran).then((response)=>{
          console.log(response.data)
          this.edituser = true
          this.edForm.name = response.data['name']
          this.edForm.number = response.data['number']
          this.edForm.password = response.data['password']
          


        },(response)=>{

        })

      }
      

    
    }
  };

</script>