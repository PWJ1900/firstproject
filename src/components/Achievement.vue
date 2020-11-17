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
     <el-table-column fixed prop="pk" label="序号" width="80">
      </el-table-column>
      <el-table-column
      prop="orderID"
      label="orderID"
      width="80">
    </el-table-column>
    <el-table-column
      prop="paperinfo"
      label="文章信息"
      width="150"
      :formatter="dateFormat">
      <template slot-scope="scope">
            <span>{{scope.row.paperinfo}}</span>
        </template>
    </el-table-column>
    <el-table-column
      prop="index"
      label="检索证明1"
      width="90">
    </el-table-column>
     
    <el-table-column
      prop="pdf_link"
      label="文章pdf"
      width="80">
      <template slot-scope="scope">
        <!-- 此处运用scope来获取当前的值 -->
      <el-tag @click="jump(scope.row.pdf_link)" size="mini">PDF</el-tag>
      </template>
    </el-table-column>
   <el-table-column
      prop="index_link"
      label="证明链接1"
      width="90">
      <template slot-scope="scope">
            <span>{{scope.row.index_link}}</span>
        </template>
    </el-table-column>
      <el-table-column
      prop="index2"
      label="检索证明2"
      width="90">
    </el-table-column>
      <el-table-column
      prop="index3"
      label="检索证明3"
      width="90">
    </el-table-column>
      <el-table-column
      prop="index_link2"
      label="证明链接2"
      width="90"><template slot-scope="scope">
            <span>{{scope.row.index_link2}}</span>
        </template>
    </el-table-column>
      <el-table-column
      prop="index_link3"
      label="证明链接3"
      width="90">
      <template slot-scope="scope">
            <span>{{scope.row.index_link3}}</span>
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
  <el-dialog title="新增论文获得信息" :visible="addstudentForm" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
<el-form id="#addsForm" ref="addsForm" :model="addsForm" label-width="80px">
     <el-form-item label="orderID" prop="orderID">
       <el-input  v-model="addsForm.orderID" max-length="10"></el-input>
     </el-form-item>
     <el-form-item label="文章信息:" prop="paperinfo">
       <el-input type="textarea" :rows="4" v-model="addsForm.paperinfo"></el-input>
     </el-form-item>
         <el-form-item label="检索证明1" prop="index">
       <el-input v-model="addsForm.index"></el-input>
     </el-form-item>
     <el-form-item label="文章pdf:" prop="pdf_link">
       <el-input v-model="addsForm.pdf_link"></el-input>
     </el-form-item>
          <el-form-item label="证明链接1:" prop="index_link">
       <el-input v-model="addsForm.index_link"></el-input>
     </el-form-item>
          <el-form-item label="检索证明2:" prop="index2">
       <el-input v-model="addsForm.index2"></el-input>
     </el-form-item>
          <el-form-item label="检索证明3:" prop="index3">
       <el-input v-model="addsForm.index3"></el-input>
     </el-form-item>
          <el-form-item label="证明链接2:" prop="index_link2">
       <el-input v-model="addsForm.index_link2"></el-input>
     </el-form-item>
     <el-form-item label="证明链接3:" prop="index_link3">
       <el-input v-model="addsForm.index_link3"></el-input>
     </el-form-item>
     <el-form-item>
       <el-button type="primary" @click="studentAdd()">确定</el-button>
       <el-button @click="addstudentForm = false;canceladdT('formt')">取消</el-button>
     </el-form-item>
   </el-form>
 </el-dialog>
 <!-- 编辑 -->
 <el-dialog title="编辑论文获得信息" :visible="editstudentForm" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
   <el-form ref="editsForm" :model="editsForm" label-width="80px">
     <el-form-item label="orderID">
       <el-input  v-model="editsForm.orderID" max-length="10" disabled="disabled"></el-input>
     </el-form-item>
     <el-form-item label="文章信息:">
       <el-input type="textarea" :rows="4"  v-model="editsForm.paperinfo"></el-input>
     </el-form-item>
     <el-form-item label="检索证明1:">
       <el-input v-model="editsForm.index"></el-input>
     </el-form-item>
     <el-form-item label="文章pdf:">
       <el-input v-model="editsForm.pdf_link"></el-input>
     </el-form-item>
          <el-form-item label="证明链接1:">
       <el-input v-model="editsForm.index_link"></el-input>
     </el-form-item>
          <el-form-item label="检索证明2:">
       <el-input v-model="editsForm.index2"></el-input>
     </el-form-item>
          <el-form-item label="检索证明3:">
       <el-input v-model="editsForm.index3"></el-input>
     </el-form-item>
          <el-form-item label="证明链接2:">
       <el-input v-model="editsForm.index_link2"></el-input>
     </el-form-item>
     <el-form-item label="证明链接3:">
       <el-input v-model="editsForm.index_link3"></el-input>
     </el-form-item>

     <el-form-item>
      <el-button type="primary" @click="studentcEdit()">确定</el-button>
       <el-button @click="editstudentForm = false">取消</el-button>
     </el-form-item>
   </el-form>
 </el-dialog>
          <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalget">
    </el-pagination>
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
import {Httpuse} from "@/components/api/httpuseget"
  export default {
  created(){
        Httpuse(this,"achievementvue",1)

      },

    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

   data() {
    
      return {
        totalget:0,
        currentPage4:1,
        pagenumuse:1,
         tableData:[{}],
         search:'',
         addstudentForm:false,
         editstudentForm:false,
         deleteuse:false,
         deletetran:{},
         addsForm:{
           orderID:'',
           paperinfo:'',
           index:'',
           pdf_link:'',
           index_link:'',
           index2:'',
           index3:'',
           index_link2:'',
           index_link3:''

         },
         editsForm:{//这里面三个作为搜索项
          orderID:'',
           paperinfo:'',
           index:'',
           pdf_link:'',
           index_link:'',
           index2:'',
           index3:'',
           index_link2:'',
           index_link3:''
         }
         
      }
     
    },
     methods:{
       jump(link){
         window.open(link)

       },
       searchinfo(datasearch){
      if(datasearch!=''){
        this.$http.get("http://127.0.0.1:8000/blog/achievementvue",{params:{pageNum:''}}).then((response)=>{
          this.tableData = response.data 
          this.tableData = this.tableData.filter(data => !datasearch || (data.orderID+'').toLowerCase().includes(datasearch.toLowerCase())||(data.index+'').toLowerCase().includes(datasearch.toLowerCase())||data.paperinfo.toLowerCase().includes(datasearch.toLowerCase()))
          console.log(this.tableData)
          },(response)=>{})

      }},
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenumuse = `${val}`//此处作为传分页的当前页数
        this.$http.get("http://127.0.0.1:8000/blog/achievementvue",{params:{pageNum:this.pagenumuse}}).then(
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
          handleEdit(index, row) {
            this.editstudentForm = true
            this.editsForm.orderID = row.orderID//此处写的使编辑框对应的数据显示
            this.editsForm.paperinfo = row.paperinfo
            this.editsForm.index = row.index
            this.editsForm.pdf_link = row.pdf_link
             this.editsForm.index_link = row.index_link
            this.editsForm.index2 = row.index2
            this.editsForm.index3 = row.index3
            this.editsForm.index_link2 = row.index_link2
            this.editsForm.index_link3 = row.index_link3
            console.log(index, row);
      },
       deleteju(){
        this.$http.post("http://127.0.0.1:8000/blog/achievementvue", this.deletetran).then(
        (response) => {
          this.$http.get("http://127.0.0.1:8000/blog/achievementvue",{params:{pageNum:this.pagenumuse}}).then(
            (response) => {
              console.log(response);
              let a = response.data;
              console.log(a);
              this.tableData = a;
              alert("删除成功！")
              // success callback
            },
            (response) => {
              // error callback
            }
          );
        },
        (response) => {}
      );
        this.deleteuse = false
        
      },
      handleClose2(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleDelete(index, row) {
      let change = row.orderID;
      this.deletetran["orderID"] = change;
      this.deletetran["num"] = "3";
      console.log(this.deletetran)
      this.deleteuse = true
      console.log(index, row);
      },
      handleConfirm(index, row){
        this.addstudentForm = true
        

      },
      closeDialog(){
        this.addstudentForm = false
        this.editstudentForm = false
      },
      dateFormat(){

      },
       studentAdd(){
         let tran = this.addsForm
         tran['num'] = '2'
           this.$http.post('http://127.0.0.1:8000/blog/achievementvue',tran).then(response=>{
             this.$http.get('http://127.0.0.1:8000/blog/achievementvue',{params:{pageNum:this.pagenumuse}}).then(response => {
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


          this.addstudentForm = false
      },
      studentcEdit(){
        let tran = this.editsForm
        tran['num'] = '1'
        this.$http.post('http://127.0.0.1:8000/blog/achievementvue',tran).then(response=>{
          this.$http.get('http://127.0.0.1:8000/blog/achievementvue',{params:{pageNum:this.pagenumuse}}).then(response => {
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