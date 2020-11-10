<template>
<el-row>
   <div id = "buttoninsert" v-show="shownow">
   <el-button
          size="mini"
         type="success"
          @click="handleConfirm()">增加新数据</el-button>
   </div>

  <el-table
   v-show="shownow"
    :data="tableData"
    border
    style="width: 100%"
     :header-cell-style="{background:'#eef1f6',color:'#606266'}">
     <el-table-column fixed prop="pk" label="序号" width="150">
      </el-table-column>
      <el-table-column
      prop="introduction"
      label="介绍"
      width="400">
        <template slot-scope="scope">
            <span>{{scope.row.introduction}}</span>
        </template>
    </el-table-column>
   <el-table-column
      align="right">
      <template slot="header">
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
  <!-- 新增 -->
  <!-- <el-dialog title="新增实验室介绍信息" :visible="addstudentForm" v-show="shownow" size="tiny" :modal-append-to-body='false' @close='closeDialog'> -->
<!-- <el-form id="#addsForm" ref="addsForm" :model="addsForm" label-width="80px">
     <el-form-item label="介绍:" prop="introduction">
       <el-input  type="textarea" :rows="6" v-model="addsForm.introduction" max-length="10"></el-input>
     </el-form-item>
     <el-form-item>
       <el-button type="primary" @click="studentAdd()">确定</el-button>
       <el-button @click="addstudentForm = false;canceladdT('formt')">取消</el-button>
     </el-form-item>
   </el-form>
 </el-dialog> -->
 <!-- 编辑 -->
 <!-- <el-dialog title="编辑实验室介绍信息" :visible="editstudentForm" v-show="shownow" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
   <el-form ref="editsForm" :model="editsForm" label-width="80px">
     <el-form-item label="介绍">
       <el-input type="textarea" :rows="6" v-model="editsForm.introduction" max-length="10"></el-input>
     </el-form-item>
     <el-form-item>
      <el-button type="primary" @click="studentcEdit()">确定</el-button>
       <el-button @click="editstudentForm = false">取消</el-button>
     </el-form-item>
   </el-form>
 </el-dialog> -->
 <el-dialog
  title="提示"
  :visible.sync="deleteuse"
  width="30%"
  :before-close="handleClose2">
  <span>您确定要删除吗？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deleteuse = false">取 消</el-button>
    <el-button type="primary" @click="deleteju">确 定</el-button>
  </span>
</el-dialog>
 
    <el-pagination
      v-show="shownow" 
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalget">
    </el-pagination>
     
<el-col  v-show="shownow1">
      <el-button type="success" @click="studentAdd()">保存增加内容</el-button>
        <el-button type="success" @click="return1()">返回</el-button>
  <vue-ueditor-wrap v-model="addsForm.introduction" :config="myConfig"></vue-ueditor-wrap>
     
<!-- <el-input type="textarea" :rows="100" v-model="addsForm.introduction" max-length="10"></el-input> --> -->

</el-col>
<el-col  v-show="shownow2"><el-button type="success" @click="studentcEdit()">保存修改内容</el-button>
        <el-button type="success" @click="return2()">返回</el-button>
<vue-ueditor-wrap v-model="editsForm.introduction" :config="myConfig"></vue-ueditor-wrap>
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
       this.$http.get('http://127.0.0.1:8000/blog/introduction',{params:{pageNum:1}}).then(response => {
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
        // ruleForm:{
        //     content:''
        //   },
            /* ueditor */
            myConfig: {
                // serverUrl: `${__GATEWAYPATH__}/ueditor/ueditorConfig`, // 上传功能的后端服务器接口地址
                UEDITOR_HOME_URL: '../../static/UEditor/', // 你的UEditor资源存放的路径,相对于打包后的index.html
                autoHeightEnabled: true, // 编辑器是否自动被内容撑高
                autoFloatEnabled: false, // 工具栏是否可以浮动
                initialFrameHeight: 340, // 初始容器高度
                initialFrameWidth: '100%', // 初始容器高度
                enableAutoSave: true // 关闭自动保存
            },
        shownow:true,
        shownow2:false,
        shownow1:false,
         tableData:[{}],
         search:'',
         currentPage4:1,
         pagenumuse:1,
         pk:0,
         totalget:0,
         deletetran:{},
         deleteuse:false,
        //  addstudentForm:false,
        //  editstudentForm:false,
         addsForm:{
           introduction:''

         },
         editsForm:{
           introduction:''
         }
         
      }
     
    },
     methods:{
       return1(){
         this.shownow1 = false
         this.shownow = true

       },
       return2(){
         this.shownow2 = false
         this.shownow = true

       },
          handleEdit(index, row) {
            // this.editstudentForm = false
            this.shownow = false
            this.shownow2 = true
            this.editsForm.pk = row.pk
            this.editsForm.introduction = row.introduction//此处写的使编辑框对应的数据显示

            console.log(index, row);
      },
       deleteju(){
        this.$http.post('http://127.0.0.1:8000/blog/introduction',this.deletetran).then(response=>{
          this.$http.get("http://127.0.0.1:8000/blog/introduction",{params:{pageNum:this.pagenumuse}}).then(
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
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenumuse = `${val}`//此处作为传分页的当前页数
        this.$http.get("http://127.0.0.1:8000/blog/introduction",{params:{pageNum:this.pagenumuse}}).then(
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
      handleConfirm(index, row){
        this.shownow = false
        this.shownow1 = true
        

      },
      closeDialog(){
        this.addstudentForm = false
        this.editstudentForm = false
      },
       handleDelete(index, row) {
        console.log(index, row);
         let change = row.pk
      
        this.deletetran['pk'] = change
        this.deletetran['num'] = '3'
        this.deleteuse = true
        
      },
      searchinfo(datasearch){
      if(datasearch!=''){
        this.$http.get("http://127.0.0.1:8000/blog/introduction",{params:{pageNum:''}}).then((response)=>{
          this.tableData = response.data 
          this.tableData = this.tableData.filter(data => !datasearch || (data.pk+'').toLowerCase().includes(datasearch.toLowerCase()) || data.introduction.toLowerCase().includes(datasearch.toLowerCase()))},(response)=>{})

      }},
 studentAdd(){
         let tran = this.addsForm
         tran['num'] = '2'
           this.$http.post('http://127.0.0.1:8000/blog/introduction',tran).then(response=>{
             this.$http.get('http://127.0.0.1:8000/blog/introduction',{params:{pageNum:this.pagenumuse}}).then(response => {
        this.totalget = response.data[0]['count']
        console.log(response)
        let a = response.data
        console.log(a)
        this.tableData = a
  // success callback
 }, response => {
  // error callback
 })

           },response=>{

           })


          this.shownow = true
          this.shownow1 = false
      },
      studentcEdit(){
        let tran = this.editsForm
        tran['num'] = '1'
        this.$http.post('http://127.0.0.1:8000/blog/introduction',tran).then(response=>{
          this.$http.get('http://127.0.0.1:8000/blog/introduction',{params:{pageNum:this.pagenumuse}}).then(response => {
        console.log(response)
        let a = response.data
        console.log(a)
        this.tableData = a
  // success callback
 }, response => {
  // error callback
 })

        },response=>{
          
        })
        this.shownow2= false
        this.shownow = true
          
      }
      }
  }
</script>

<style scoped>
span{
max-width: 10em;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis; /*超出部分用...代替*/
}
#buttoninsert{
  position: relative;
  left: 46%;
}

</style>