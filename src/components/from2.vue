<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="总荣誉数" name="first">
      <el-input
        v-model="input"
        placeholder="请输入要搜索的姓名"
        style="width: 50%"
        @keydown.enter.native="usedata"
      ></el-input>
      <el-button @click="usedata"> 搜索 </el-button>

      <div id="sumachieve">
        <el-row>
         
          <el-card class="box-card">
            <div slot="header" class="clearfix">
               
              <span>个人信息:</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            </div>
            
            <div class="text item">
              
              <!-- <el-tag class="taguse">姓名:{{ peoplename }}</el-tag>
              <span style="width: 50px"></span><br />
              <el-tag class="taguse">主攻方向:{{ peoplesubject }}</el-tag>
              <span style="width: 50px"></span><br />
              <el-tag class="taguse">个人履历:{{ peopledesr }}</el-tag> -->
              <el-collapse v-model="activeNames">
                <!--  @change="handleChange" -->
                <el-collapse-item title="姓名:" name="1">
                  <div>
                    {{ peoplename }}
                  </div>
                </el-collapse-item>
                <el-collapse-item title="主攻方向:" name="2">
                  <div>
                   {{ peoplesubject }}
                  </div>
                </el-collapse-item>
                <el-collapse-item title="个人履历:" name="3">
                  <el-scrollbar>
                  <div v-html=" peopledesr" style="height:80px"></div>
                   </el-scrollbar>
                </el-collapse-item>
              </el-collapse>
            </div>
            
          </el-card>
         
        </el-row>
      </div>
      <h1>暂无查询信息</h1>
      <div id="contentachieve" v-show="showimage">
        <div class="block">
          <img shape="square" width="100px" :src="circleUrl" />
        </div>

        <br />
        <el-tag>称谓:{{ identity }}</el-tag>
      </div>
    </el-tab-pane>
    <el-tab-pane label="查看文章" name="second"
      >搜索文章
      <el-input
        v-model="input"
        placeholder="请输入您要搜索的文章"
        style="width: 50%"
      ></el-input>
      <el-button> 搜索 </el-button>
      <div id="sumachieve">
        <el-row>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>文章概要</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
            <div class="text item"></div>
          </el-card>
        </el-row>
      </div>
    </el-tab-pane>
    <!-- <el-tab-pane label="数据最近更改" name="third">数据最近更改</el-tab-pane> -->
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ['1'],
      showimage: false,
      circleUrl: "",
      identity: "",
      input: "",
      activeName: "first",
      peoplename: "",
      peoplesubject: "",
      peopledesr: "",
    };
  },
  methods: {
    usedata() {
      //此处对应的peopledetail的数据表
      this.circleUrl = "";
      this.$http
        .get("http://127.0.0.1:8000/blog/people_simple", {
          params: { pageNum: "" },
        })
        .then(
          (response) => {
            console.log(response);
            let a = response.data;
            console.log(a);
            a.forEach((element) => {
              if (this.input === element["name"]) {
                //此处处理了搜索学生姓名的信息
                this.peoplename = element["name"];
                this.peoplesubject = element["major"];
                this.peopledesr = element["description"];
              }
            });

            // success callback
          },
          (response) => {
            // error callback
          }
        );

      this.$http
        .get("http://127.0.0.1:8000/blog/peopleuse", {
          params: { pageNum: "" },
        })
        .then(
          (response) => {
            let a = response.data;
            a.forEach((element) => {
              if (this.input === element["name"]) {
                this.showimage = true;
                console.log(element["pic"]);
                this.circleUrl = element["pic"];
                this.identity = element["identity"];
              }
            });
          },
          (response) => {}
        );

      if (this.input == "") {
        this.showimage = false;
        this.peoplename = "";
        this.peoplesubject = "";
        this.peopledesr = "";
      }
      this.activeNames = ['1','2','3']
      
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style scoped>
#contentachieve {
  position: absolute;
  margin: 0;
  top: 20%;
  width: 35%;
  left: 2%;
  height: 200px;
  /* background:lightgray; */
  text-align: center;
  background: #bbcee1;
}
#sumachieve {
  margin-left: 45%;
  margin-top: 5%;
  top: 40%;
  width: 50%;
  height: auto;
  /* background:lightgray; */
  text-align: left;
}
.taguse {
  margin: 5px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
h1 {
  position: absolute;
  margin: 0;
  top: 20%;
  width: 40%;
  left: 2%;
  height: 400px;
  /* background:lightgray; */
  text-align: center;
}
</style>