<template>
  <el-row>
    <div id = "buttoninsert">
    <el-button size="mini" type="success" @click="handleConfirm()">增加新数据</el-button>
    </div>
    <el-table
      id="articletable"
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >
      <el-table-column fixed prop="pk" label="序号" width="150" align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="150" align="center">
      </el-table-column>
      <el-table-column prop="brief_content" label="摘要" width="120" align="center">
        <template slot-scope="scope">
            <span>{{scope.row.brief_content}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" width="120" align="center">
        
        <template slot-scope="scope">
          <span>{{scope.row.content}}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="publish_date"
        label="出版时间"
        width="120"
        :formatter="dateFormat"
        align="center"
      >
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            style="width: 30%"
            placeholder="通过关键词搜索"
            @keydown.enter.native = "searchinfo(search)"
          />
          <i class="el-icon-search" @click="searchinfo(search)"></i>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新增学生信息"
      :visible="addstudentForm"
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
        <el-form-item label="标题:" prop="title">
          <el-input v-model="addsForm.title" max-length="10"></el-input>
        </el-form-item>
        <el-form-item label="摘要:" prop="brief_content">
          <el-input v-model="addsForm.brief_content"></el-input>
        </el-form-item>
        <el-form-item label="内容:" prop="content">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="addsForm.content"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="出版时间:" prop="publish_date">
          <el-input v-model="addsForm.publish_date"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="studentAdd()">确定</el-button>
          <el-button
            @click="
              addstudentForm = false;
              canceladdT('formt');
            "
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="编辑学生信息"
      :visible="editstudentForm"
      size="tiny"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <el-form ref="editsForm" :model="editsForm" label-width="80px">
        <el-form-item label="标题:">
          <el-input
            v-model="editsForm.title"
            max-length="10"
            disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="摘要:">
          <!-- <el-input v-model="editsForm.brief_content"></el-input> -->
           <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="editsForm.brief_content"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="文章内容:">
            <el-input type="textarea" :rows="10"  v-model="editsForm.content"></el-input>

          <!-- <el-input v-model="editsForm.content"></el-input> -->
        </el-form-item>
        <el-form-item label="出版时间">
          <el-input v-model="editsForm.publish_date"></el-input>
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
import {config} from "@/components/utils/urluse"
import {Httpuse} from "@/components/api/httpuseget"
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
  },
  created(){
    //  this.$http.get( config.requesturl+"/articleuse",{params:{pageNum:1}}).then(
    //   (response) => {
    //     console.log(response);
    //     let a = response.data;
    //     console.log(a);
    //     this.totalget = response.data[0]['count']
    //     this.tableData = a;
    //     // success callback
    //   },
    //   (response) => {
    //     // error callback
    //   }
    // );
    Httpuse(this,"articleuse",1)
    // this.tableData = a
  },

  data() {
   

    return {
      publish_date:false,
      labelPosition: 'right',
        searchDatause: {
         title: "",
        brief_content: "",
        content: "",
        publish_date: "",
        },
      deletetran : {},
      deleteuse:false,
      // searchbrief:false,
      // searchbrief2:false,
      pagenumuse:1,
      totalget:0,
       currentPage4: 1,
      tableData: [{}],
      inputshow:false,
      search: "",
      addstudentForm: false,
      editstudentForm: false,
      dialogVisible: false,
      addsForm: {
        title: "",
        brief_content: "",
        content: "",
        publish_date: "",
      },
      editsForm: {
        pk:'',
        title: "",
        brief_content: "",
        content: "",
        publish_date: "",
      },
    };
  },
  methods: {
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenumuse = `${val}`//此处作为传分页的当前页数
    //     this.$http.get(config.requesturl+"/articleuse",{params:{pageNum:this.pagenumuse}}).then(
    //   (response) => {
    //     console.log(response);
    //     let a = response.data;
    //     this.totalget = response.data[0]['count']
    //     console.log(a);
    //     this.tableData = a;
    //     // success callback
    //   },
    //   (response) => {
    //     // error callback
    //   }
    // );
    Httpuse(this,"articleuse",this.pagenumuse)
       
      },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    dateFormat(row, column) {
      let date = row[column.property];
      console.log(date);
      let newDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(date);
      return newDate;
    },
    handleEdit(index, row) {
      this.editstudentForm = true;
      this.editsForm.pk = row.pk
      this.editsForm.title = row.title; //此处写的使编辑框对应的数据显示
      this.editsForm.brief_content = row.brief_content;
      this.editsForm.content = row.content;
      this.editsForm.publish_date = row.publish_date;
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
        this.$http.post(config.requesturl+"/articleuse", this.deletetran).then(
        (response) => {
        this.$http.get("http://127.0.0.1:8000/blog/articleuse",{params:{pageNum:this.pagenumuse}}).then(
            (response) => {
              console.log(response);
              let a = response.data;
              console.log(a);
              this.tableData = a;
              // success callback
            },
            (response) => {
              // error callback
            }
          );
        // Httpuse(this,"articleuse",this.pagenumuse)
        },
        (response) => {}
      );
        this.deleteuse = false
        
      },
    handleDelete(index, row) {
      let change = row.title;
      this.deletetran["pk"] = row.pk;
      this.deletetran["num"] = "3";

      this.deleteuse = true
      
      console.log(index, row);
    },
    handleConfirm(index, row) {
      this.addstudentForm = true;
    },
    closecontentDialog() {
      this.usecon = false;
    },
     closecontentDialog2() {
      this.usecon2 = false;
    },
    closeDialog() {
      this.addstudentForm = false;
      this.editstudentForm = false;
    },
    studentAdd() {
      let tran = this.addsForm;
      tran["num"] = 2; //2代表create
      this.$http.post(config.requesturl+"/articleuse", tran).then(
        (response) => {
         Httpuse(this,"articleuse",this.pagenumuse)
        },
        (response) => {}
      );

      this.addstudentForm = false;
    },
    searchinfo(datasearch){
      if(datasearch!=''){
        this.$http.get(config.requesturl+"/articleuse",{params:{pageNum:''}}).then((response)=>{
          this.tableData = response.data 
          this.tableData = this.tableData.filter(data => !datasearch || data.title.toLowerCase().includes(datasearch.toLowerCase()) || data.publish_date.toLowerCase().includes(datasearch.toLowerCase())||data.content.toLowerCase().includes(datasearch.toLowerCase()) || data.brief_content.toLowerCase().includes(datasearch.toLowerCase()))},(response)=>{})

      }},

    studentcEdit() {
      let tran = this.editsForm;
      tran["num"] = "1";
      this.$http.post(config.requesturl+"/articleuse", tran).then(
        (response) => {
          Httpuse(this,"articleuse",this.pagenumuse)
        },
        (response) => {}
      );
      this.editstudentForm = false;
    },
  },
};
</script>
<style scoped>
span{
max-width: 10em;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis; /*超出部分用...代替*/
}
#articletable {
  margin: auto;
}
#buttoninsert{
  position: relative;
  left: 46%;
}
</style>