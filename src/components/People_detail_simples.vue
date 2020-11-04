<template>
<el-row>
  <div id="buttoninsert" v-show="shownow">
  <el-button
          size="mini"
          type="success"
          @click="handleConfirm()">增加新数据</el-button></div>
  <el-table
    :data="tableData"
    v-show="shownow"
    border
    style="width: 100%"
     :header-cell-style="{background:'#eef1f6',color:'#606266'}">
     <el-table-column fixed prop="pk" label="序号" width="150">
      </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="identity"
      label="身份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="major"
      label="major"
      width="120">
    </el-table-column>
    <el-table-column
      prop="subject"
      label="subject"
      width="120">
    </el-table-column>
    <el-table-column
      prop="description"
      label="描述"
      width="200">
      <template slot-scope="scope">
        <span>{{scope.row.description}}</span>
      </template>
    </el-table-column>
     <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          @keydown.enter.native = "searchinfo(search)"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
   

  </el-table>
<!-- 编辑 -->
 <!-- <el-dialog title="编辑个人信息" :visible="editstudentForm" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
   <el-form ref="editsForm" :model="editsForm" label-width="80px">
     <el-form-item label="姓名:">
       <el-input  v-model="editsForm.name" max-length="10"></el-input>
     </el-form-item>
     <el-form-item label="身份:">
       <el-input v-model="editsForm.identity"></el-input>
     </el-form-item>
     <el-form-item label="major">
       <el-input v-model="editsForm.major"></el-input>
    </el-form-item>
   <el-form-item label="subject">
       <el-input v-model="editsForm.subject"></el-input>
    </el-form-item>
    <el-form-item label="描述:">
       <el-input  type="textarea" :rows="6" v-model="editsForm.description"></el-input>
    </el-form-item>


     <el-form-item>
      <el-button type="primary" @click="studentcEdit()">确定</el-button>
       <el-button @click="editstudentForm = false">取消</el-button>
     </el-form-item>
   </el-form>
 </el-dialog>
 <el-dialog
  title="提示"
  :visible.sync="deleteuse"
  width="30%">
  <span>您确定要删除吗？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deleteuse = false">取 消</el-button>
    <el-button type="primary" @click="deleteju">确 定</el-button>
  </span>
</el-dialog> -->
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-show="shownow"
      :current-page="currentPage4"
      :page-sizes="[5]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalget">
    </el-pagination>
    <el-col  v-show="shownow1">

        序号:<el-input v-model="addsForm.pk" style="width:100px;height:17px" ></el-input>
        姓名:<el-input  v-model="addsForm.name" style="width:100px;height:20px" max-length="10"></el-input>
        身份: <el-input v-model="addsForm.identity" style="width:100px;height:20px"></el-input>
        major:  <el-input v-model="addsForm.major" style="width:100px;height:20px"></el-input>
        subject:  <el-input v-model="addsForm.subject" style="width:180px;height:20px"></el-input>
              <el-button type="success" @click="studentAdd()">保存增加内容</el-button>
        <el-button type="success" @click="return1()">返回</el-button><br>

  <h3>个人简历内容编辑:</h3><vue-ueditor-wrap v-model="addsForm.description" :config="myConfig" style="height:700px"></vue-ueditor-wrap>
      

</el-col>
<el-col  v-show="shownow2">
    
         序号: <el-input v-model="editsForm.pk" style="width:100px;height:17px"></el-input>
         姓名: <el-input  v-model="editsForm.name" max-length="10" style="width:100px;height:17px"></el-input>
          身份: <el-input v-model="editsForm.identity" style="width:100px;height:17px"></el-input>
           major:<el-input v-model="editsForm.major" style="width:100px;height:17px"></el-input>
           subject: <el-input v-model="editsForm.subject" style="width:180px;height:17px"></el-input>  
           <el-button type="success" @click="studentcEdit()">保存修改内容</el-button>
        <el-button type="success" @click="return2()">返回</el-button><br>
<h3>个人简历内容编辑:</h3><vue-ueditor-wrap v-model="editsForm.description" :config="myConfig"></vue-ueditor-wrap>
     
</el-col>
  </el-row>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap';
  export default {
    components: { VueUeditorWrap },
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },


    data() {
       this.$http.get('http://127.0.0.1:8000/blog/people_simple',{params:{pageNum:1}}).then(response => {
        console.log(response)
         this.totalget = response.data[0]['count']
        let a = response.data
        console.log(a)
        this.tableData = a
  // success callback
 }, response => {
  // error callback
 })
    
      return {
        myConfig: {
                // serverUrl: `${__GATEWAYPATH__}/ueditor/ueditorConfig`, // 上传功能的后端服务器接口地址
                UEDITOR_HOME_URL: '../../static/UEditor/', // 你的UEditor资源存放的路径,相对于打包后的index.html
                autoHeightEnabled: true, // 编辑器是否自动被内容撑高
                autoFloatEnabled: false, // 工具栏是否可以浮动
                initialFrameHeight: 340, // 初始容器高度
                initialFrameWidth: '100%', // 初始容器高度
                enableAutoSave: true // 关闭自动保存
            },
        shownow2:false,
        shownow:true,
        shownow1:false,
         tableData:[{}],
         currentPage4:1,
         deletetran:{},
         deleteuse:false,
          pagenumuse:1,
         search:'',
         addstudentForm:false,
         editstudentForm:false,
         totalget:0,
         addsForm:{
           pk:'',
           name:'',
           identity:'',
           major:'',
           subject:'',
           description:''


         },
         editsForm:{
           pk:'',
           name:'',
           identity:'',
           major:'',
           subject:'',
           description:''

         }
         
      }
     
    },
     methods:{
        searchinfo(datasearch){
      if(datasearch!=''){
        this.$http.get("http://127.0.0.1:8000/blog/people_simple",{params:{pageNum:''}}).then((response)=>{
          this.tableData = response.data 
          this.tableData = this.tableData.filter(data => !datasearch || (data.pk+'').toLowerCase().includes(datasearch.toLowerCase()) || data.name.toLowerCase().includes(datasearch.toLowerCase())||(data.identity+'').toLowerCase().includes(datasearch.toLowerCase()))},(response)=>{})

      }},
      return1(){
        this.shownow1 = false
        this.shownow = true

      },
      return2(){
        this.shownow2 = false
        this.shownow = true

      },
          handleEdit(index, row) {
            this.shownow = false
            this.shownow2 = true
            this.editsForm.pk = row.pk
            this.editsForm.name = row.name//此处写的使编辑框对应的数据显示
            this.editsForm.identity = row.identity
            this.editsForm.major = row.major
            this.editsForm.subject = row.subject
            this.editsForm.description = row.description

            console.log(index, row);
      },
      deleteju(){
          this.$http.post('http://127.0.0.1:8000/blog/people_simple',this.deletetran).then(response=>{
          this.$http.get("http://127.0.0.1:8000/blog/people_simple",{params:{pageNum:this.pagenumuse}}).then(
            (response) => {
              console.log(response);
              let a = response.data;
              console.log(a);
              this.tableData = a;
              this.deleteuse = false
              // success callback
            },
            (response) => {
              // error callback
            }
          );

        },response=>{

        })


      },
      handleDelete(index, row) {
        console.log(index, row);
       let change = row.pk
      
        this.deletetran['pk'] = change
        this.deletetran['num'] = '3'
        this.deleteuse = true
      },
      handleConfirm(index, row){
        // this.addstudentForm = true
        this.shownow = false
        this.shownow1 = true
        

      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenumuse = `${val}`//此处作为传分页的当前页数
        this.$http.get("http://127.0.0.1:8000/blog/people_simple",{params:{pageNum:this.pagenumuse}}).then(
      (response) => {
        console.log(response);
        let a = response.data;
        this.totalget = response.data[0]['count']
        console.log(a);
        this.tableData = a;
        // success callback
      },
      (response) => {
        // error callback
      }
    );

       
      },
      closeDialog(){
        this.addstudentForm = false
        this.editstudentForm = false
      },
      studentAdd(){
         let tran = this.addsForm
         tran['num'] = '2'
           this.$http.post('http://127.0.0.1:8000/blog/people_simple',tran).then(response=>{
             this.$http.get('http://127.0.0.1:8000/blog/people_simple',{params:{pageNum:this.pagenumuse}}).then(response => {
        console.log(response)
         this.totalget = response.data[0]['count']
        let a = response.data
        console.log(a)
        this.tableData = a
  // success callback
 }, response => {
  // error callback
 })

           },response=>{
             alert("在个人里面没有设置主键无法加入")

           })


          // this.addstudentForm = false
          this.shownow1 = false
          this.shownow = true
      },
      studentcEdit(){
        let tran = this.editsForm
        tran['num'] = '1'
        this.$http.post('http://127.0.0.1:8000/blog/people_simple',tran).then(response=>{
          this.$http.get('http://127.0.0.1:8000/blog/people_simple',{params:{pageNum:this.pagenumuse}}).then(response => {
        console.log(response)
         this.totalget = response.data[0]['count']
        let a = response.data
        console.log(a)
        this.tableData = a
  // success callback
 }, response => {
  // error callback
 })

        },response=>{
          
        })
        this.shownow2 = false
        this.shownow = true
          
      }
      }
  }
</script>
<style scoped>
#buttoninsert{
  position: relative;
  left: 46%;
}
span{
max-width: 10em;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis; /*超出部分用...代替*/
}
h3{

  margin-right: 1000px;


}
</style>