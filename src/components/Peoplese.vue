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
      prop="pic"
      label="个人照片"
      width="150">
    <template slot-scope="scope">
      <!-- <span>{{scope.row.pic}}</span> -->
      <img :src="scope.row.pic" width="100px">
    </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="identity"
      label="身份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="category"
      label="类型号"
      width="120">
      <template slot-scope="scope">
      <span>{{scope.row.category}}</span>
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
  <el-dialog title="新增个人信息" :visible="addstudentForm" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
<el-form id="#addsForm" ref="addsForm" :model="addsForm" label-width="80px">
  <el-form-item label="id:" prop="pk">
       <el-input v-model="addsForm.pk"></el-input>
     </el-form-item>
     <el-form-item label="个人照片:" prop="pic">
       <!-- <el-input  v-model="addsForm.pic" max-length="10"></el-input> -->
       <h3>点击上传图片，且每人只能用一张图片 </h3>
      <el-upload
      ref="upload"
  action=""
  list-type="picture-card"
  :on-change="imgBroadcastChange"
  :on-success="uploadSuccess"
  :auto-upload="false"
>
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{file}">
      <img
        class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      >
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
</el-upload>
<el-dialog :visible.sync="dialogVisibleimage">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
     </el-form-item>
     <el-form-item label="姓名:" prop="name">
       <el-input v-model="addsForm.name"></el-input>
     </el-form-item>
         <el-form-item label="身份:" prop="identity">
       <el-input v-model="addsForm.identity"></el-input>
     </el-form-item>
     <el-form-item label="届数:" prop="category">
       <el-input type="textarea" :row="4"  v-model="addsForm.category"></el-input>
     </el-form-item>
     <el-form-item>
       <el-button type="primary" @click="studentAdd()">确定</el-button>
       <el-button @click="addstudentForm = false;canceladdT('formt')">取消</el-button>
     </el-form-item>
   </el-form>
 </el-dialog>
<!-- 编辑 -->
 <el-dialog title="编辑个人信息" :visible="editstudentForm" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
   <el-form ref="editsForm" :model="editsForm" label-width="80px">
     <el-form-item label="个人照片:">
       <!-- <el-input  v-model="editsForm.pic" max-length="10"></el-input> -->
        <h3>点击上传图片，且每人只能用一张图片 </h3>
      <el-upload
      ref="upload2"
  action=""
  list-type="picture-card"
  :on-change="imgBroadcastChange2"
  :auto-upload="false"
>
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{file}">
      <img
        class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      >
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview2(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove2(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
</el-upload>
<el-dialog :visible.sync="dialogVisibleimage2">
  <img width="100%" :src="dialogImageUrl2" alt="">
</el-dialog>
     </el-form-item>
     <el-form-item label="姓名:">
       <el-input v-model="editsForm.name"></el-input>
     </el-form-item>
     <el-form-item label="身份:">
       <el-input v-model="editsForm.identity"></el-input>
    </el-form-item>
    <el-form-item label="届数:" >
       <el-input  type="textarea" :row="6" v-model="editsForm.category"></el-input>
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
import {Usebs4} from "@/components/utils/bs4use" 
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
       this.$http.get('http://127.0.0.1:8000/blog/peopleuse',{params:{pageNum:1}}).then(response => {
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
        dialogVisibleimage2:false,
        dialogImageUrl2:'',
         dialogImageUrl: '',
        dialogVisibleimage: false,
        disabled: false,
         tableData:[{}],
         totalget:0,
         currentPage4:1,
         search:'',
         addstudentForm:false,
         editstudentForm:false,
         deleteuse:false,
         deletetran:{},
         pagenumuse:1,
         addsForm:{
           pk:'',
           pic:'',
           name:'',
           identity:'',
           category:''

         },
         editsForm:{
           pk:'',
           pic:'',
           name:'',
           identity:'',
           category:''

         }
         
      }
     
    },
     methods:{
    //   uploadImgToBase64(file) {  //核心方法，将图片转成base64字符串形式
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onload = function() { // 图片转base64完成后返回reader对象
    //       resolve(reader)
    //     }
    //     reader.onerror = reject
    //   })
    // },
       imgBroadcastChange(file){
        //  this.addsForm.pic = file.url
        //  console.log(file)

        const isLt2M = file.size / 1024 / 1024/ 1024 < 2
      if (isLt2M) {
        // uploadImgToBase64()返回一个Promise对象，通过.then()获取其数据。其中data.result是图片转成的base64值
        Usebs4(file.raw).then(data => { this.addsForm.pic = data.result })
      } else {
        this.$message.error('上传封面图片大小不能超过 2GB!')
      }

       },
       imgBroadcastChange2(file){
          const isLt2M = file.size / 1024 / 1024/ 1024 < 2
      if (isLt2M) {
        // uploadImgToBase64()返回一个Promise对象，通过.then()获取其数据。其中data.result是图片转成的base64值
        Usebs4(file.raw).then(data => { this.editsForm.pic = data.result })
      } else {
        this.$message.error('上传封面图片大小不能超过 2GB!')
      }

       },
        handleRemove(file) {
          this.$refs.upload.clearFiles();
          // this.$refs.upload.abort(file);
          
              
        
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        console.log(this.dialogImageUrl)
        this.dialogVisibleimage = true;
      },
       handleRemove2(file) {
          this.$refs.upload2.clearFiles();
          // this.$refs.upload.abort(file);
          
              
        
      },
      handlePictureCardPreview2(file){
        this.dialogImageUrl2 = file.url;
        this.dialogVisibleimage2 = true;
      },

        searchinfo(datasearch){
      if(datasearch!=''){
        this.$http.get("http://127.0.0.1:8000/blog/peopleuse",{params:{pageNum:''}}).then((response)=>{
          this.tableData = response.data 
          this.tableData = this.tableData.filter(data => !datasearch || (data.pk+'').toLowerCase().includes(datasearch.toLowerCase()) || data.name.toLowerCase().includes(datasearch.toLowerCase())||(data.identity+'').toLowerCase().includes(datasearch.toLowerCase()))},(response)=>{})

      }},
          handleEdit(index, row) {
            this.editstudentForm = true
            this.editsForm.pk = row.pk
            this.editsForm.pic = row.pic//此处写的使编辑框对应的数据显示
            this.editsForm.name = row.name
            this.editsForm.identity = row.identity
            this.editsForm.category = row.category
            this.$refs.upload2.clearFiles();
            console.log(index, row);
      },
       handleClose2(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      deleteju(){
        this.$http.post('http://127.0.0.1:8000/blog/peopleuse',this.deletetran).then(response=>{
          this.$http.get("http://127.0.0.1:8000/blog/peopleuse",{params:{pageNum:this.pagenumuse}}).then(
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
      uploadSuccess(){
        alert("上传成功")
      },
      studentAdd(){
         let tran = this.addsForm
         tran['num'] = '2'
           this.$http.post('http://127.0.0.1:8000/blog/peopleuse',tran).then(response=>{
             this.$http.get('http://127.0.0.1:8000/blog/peopleuse',{params:{pageNum:this.pagenumuse}}).then(response => {
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


          this.addstudentForm = false
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenumuse = `${val}`//此处作为传分页的当前页数
        this.$http.get("http://127.0.0.1:8000/blog/peopleuse",{params:{pageNum:this.pagenumuse}}).then(
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
      studentcEdit(){
        let tran = this.editsForm
        tran['num'] = '1'
        this.$http.post('http://127.0.0.1:8000/blog/peopleuse',tran).then(response=>{
          this.$http.get('http://127.0.0.1:8000/blog/peopleuse',{params:{pageNum:this.pagenumuse}}).then(response => {
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
        this.editstudentForm = false
          
      }
      }
  }
</script>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
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