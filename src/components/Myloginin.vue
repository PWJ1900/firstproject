
<template>
<!-- 这里面给他设置如果身份为admin通过数据库获取来判断是否给admin则可以登录 -->
<!-- 此处的ref相当于给dom取对象使用 -->
  <div id="login">
    <div class="loginToHome">
      <el-form
        ref="form"
        :model="form"
        :rules="ruleForm"
        status-icon
        label-width="80px"
        class="loginForm"
      >
        <h3>实验室后台管理系统</h3>
        <el-form-item label="用户名" prop="name">
          <el-input
            type="text"
            v-model="form.name"
            auto-complete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            auto-complete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            class="homeBut"
            type="primary"
            plain
            @click="submit"
            :loading="logining"
            >登录</el-button
          >

          <el-button class="loginBut" type="primary" plain @click="resetForm()"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
     this.$http.get("http://127.0.0.1:8000/blog/gerloginper").then(
      (response) => {
        console.log(response);
        let a = response.data;
        this.uselogin = a
        
        // success callback
      },
      (response) => {
        // error callback
      }
    );

    return {
      uselogin:[{}],
      logining: false,
      judge:false,

      form: {
        name: "",

        password: "",
      },

      ruleForm: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],

        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  methods: {
    submit(event) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.logining = true;
         
         this.uselogin.forEach(element => {
           if(this.form.name === element['number'] && this.form.password === element['password']){
             this.logining = false;

            sessionStorage.setItem("user", "admin");
            sessionStorage.setItem("username", element['name'])
            this.$router.push({ name: "Helloworld" ,params:{userId:1}});//搞懂这个params怎么用
            judge = true

           }
           

           
         });
         if(this.judge === false){
            this.logining = false;
           this.$alert("姓名或者密码错误!", "提醒", {
              confirmButtonText: "ok",
             
            });
         }
          // if (this.form.name === "admin" && this.form.password === "123456") {
          //   this.logining = false;

          //   sessionStorage.setItem("user", "admin");
          //   this.$router.push({ name: "Helloworld" ,params:{userId:1}});//搞懂这个params怎么用
            
          // } else {
          //   this.logining = false;

          //   this.$alert("姓名或者密码错误!", "提醒", {
          //     confirmButtonText: "ok",
          //   });
          // }
        } else {
          console.log("error submit!");

          return false;
        }
      });
    },

    resetForm() {
      this.$refs.form.resetFields();//这里的refs使用的是组件属性对象
    },
  },
};
</script>

<style>
/* body{
  background:url('../assets/timg231.jpg');
  background-size: cover;
} */
.loginToHome {
  position: absolute;

  left: 0px;

  right: 0;

  top: 0;

  bottom: 0;

  margin: auto;

  width: 400px;

  height: 260px;

  -webkit-border-radius: 5px;

  border-radius: 5px;

  background: #fff;

  border: 1px solid #dcdfe6;
}

.loginForm {
  text-align: center;

  padding-top: 15px;

  padding-right: 30px;

  top: 10px;
}

.homeBut {
  position: absolute;

  left: 0px;
}

.loginBut {
  position: absolute;

  right: 0px;
}
</style>
