<template>
<el-row>
  <div id = "buttoninsert">
   <el-button
          size="mini"
          type="success"
          @click="handleConfirm()">增加新数据</el-button>
  </div>

  <el-table
    :data="tableData"
    border
    style="width: 100%"
     :header-cell-style="{background:'#eef1f6',color:'#606266'}">
     <el-table-column fixed prop="pk" label="序号" width="150">
      </el-table-column>
    <el-table-column
      prop="time"
      label="年份"
      width="150">
    </el-table-column>
    <el-table-column
      prop="education"
      label="教育"
      width="120">
    </el-table-column>
    <el-table-column
      prop="university"
      label="大学"
      width="120">
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
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalget">
    </el-pagination>
  <!-- 新增 -->
  <el-dialog title="新增学生信息" :visible="addstudentForm" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
<el-form id="#addsForm" ref="addsForm" :model="addsForm" label-width="80px">
  <el-form-item label="id:" prop="pk">
       <el-input v-model="addsForm.pk"></el-input>
     </el-form-item>
     <el-form-item label="年份:" prop="time">
       <el-input  v-model="addsForm.time" max-length="10"></el-input>
     </el-form-item>
     <el-form-item label="教育:" prop="education">
       <el-input v-model="addsForm.education"></el-input>
     </el-form-item>
         <el-form-item label="大学:" prop="university">
       <el-input v-model="addsForm.university"></el-input>
     </el-form-item>
     <el-form-item>
       <el-button type="primary" @click="studentAdd()">确定</el-button>
       <el-button @click="addstudentForm = false;canceladdT('formt')">取消</el-button>
     </el-form-item>
   </el-form>
 </el-dialog>
<!-- 编辑 -->
 <el-dialog title="编辑学生信息" :visible="editstudentForm" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
   <el-form ref="editsForm" :model="editsForm" label-width="80px">
     <el-form-item label="年份:">
       <el-input  v-model="editsForm.time" max-length="10"></el-input>
     </el-form-item>
     <el-form-item label="教育:">
       <el-input v-model="editsForm.education"></el-input>
     </el-form-item>
     <el-form-item label="大学:">
       <el-input v-model="editsForm.university"></el-input>
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
  width="30%"
  :before-close="handleClose2">
  <span>您确定要删除吗？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deleteuse = false">取 消</el-button>
    <el-button type="primary" @click="deleteju">确 定</el-button>
  </span>
</el-dialog>
  </el-row>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

     data() {
       this.$http.get('http://127.0.0.1:8000/blog/education',{params:{pageNum:1}}).then(response => {
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
         tableData:[{}],
         currentPage4:1,
         totalget:0,
         search:'',
         deletetran:{},
         pagenumuse:1,
         deleteuse:false,
         addstudentForm:false,
         editstudentForm:false,
         addsForm:{
           pk:'',
           time:'',
           education:'',
           university:''

         },
         editsForm:{
           pk:'',
           time:'',
           education:'',
           university:''

         }
         
      }
     
    },
     methods:{
       handleClose2(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
          handleEdit(index, row) {
            this.editstudentForm = true
            this.editsForm.pk = row.pk
            this.editsForm.time = row.time//此处写的使编辑框对应的数据显示
            this.editsForm.education = row.education
            this.editsForm.university = row.university
            console.log(index, row);
      },
      searchinfo(datasearch){
      if(datasearch!=''){
        this.$http.get("http://127.0.0.1:8000/blog/education",{params:{pageNum:''}}).then((response)=>{
          this.tableData = response.data 
          this.tableData = this.tableData.filter(data => !datasearch || (data.pk+'').toLowerCase().includes(datasearch.toLowerCase()) || data.education.toLowerCase().includes(datasearch.toLowerCase())||(data.university+'').toLowerCase().includes(datasearch.toLowerCase()))},(response)=>{})

      }},
       deleteju(){
        this.$http.post('http://127.0.0.1:8000/blog/education',this.deletetran).then(response=>{
          this.$http.get("http://127.0.0.1:8000/blog/education",{params:{pageNum:this.pagenumuse}}).then(
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
        this.addstudentForm = true
        

      },
      closeDialog(){
        this.addstudentForm = false
        this.editstudentForm = false
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenumuse = `${val}`//此处作为传分页的当前页数
        this.$http.get("http://127.0.0.1:8000/blog/education",{params:{pageNum:this.pagenumuse}}).then(
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
     studentAdd(){
         let tran = this.addsForm
         tran['num'] = '2'
           this.$http.post('http://127.0.0.1:8000/blog/education',tran).then(response=>{
             this.$http.get('http://127.0.0.1:8000/blog/education',{params:{pageNum:this.pagenumuse}}).then(response => {
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
             alert("对不起,您的id号不存在！")

           })


          this.addstudentForm = false
      },
      studentcEdit(){
        let tran = this.editsForm
        tran['num'] = '1'
        this.$http.post('http://127.0.0.1:8000/blog/education',tran).then(response=>{
          this.$http.get('http://127.0.0.1:8000/blog/education',{params:{pageNum:this.pagenumuse}}).then(response => {
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
        this.editstudentForm = false
          
      }
      }
  }
</script>
<style scoped>
#buttoninsert{
  position: relative;
  left: 46%;
}

</style>