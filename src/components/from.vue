<template>
  <el-row>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column fixed prop="title" label="title" width="150">
        <!-- 此处为显示方法
      <template slot-scope="scope">
        <span v-show="showuse">{{scope.row.title}}</span>
        <el-input v-show="!showuse" v-model="scope.row.title"></el-input>
      </template> -->
      </el-table-column>
      <el-table-column prop="brief_content" label="brief_content" width="120">
      </el-table-column>
      <el-table-column prop="content" label="content" width="120">
      </el-table-column>

      <el-table-column prop="publish_date" label="publish_date" width="120">
      </el-table-column>

      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 -->
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
        label-width="80px"
      >
        <el-form-item label="title" prop="title">
          <el-input v-model="addsForm.title" max-length="10"></el-input>
        </el-form-item>
        <el-form-item label="brief_content" prop="brief_content">
          <el-input v-model="addsForm.brief_content"></el-input>
        </el-form-item>
        <el-form-item label="content" prop="content">
          <el-input v-model="addsForm.content"></el-input>
        </el-form-item>
        <el-form-item label="publish_date" prop="publish_date">
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
        <el-form-item label="title">
          <el-input
            v-model="editsForm.title"
            max-length="10"
            disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="brief_content">
          <el-input v-model="editsForm.brief_content"></el-input>
        </el-form-item>
        <el-form-item label="content">
          <el-input v-model="editsForm.content"></el-input>
        </el-form-item>
        <el-form-item label="publish_date">
          <el-input v-model="editsForm.publish_date"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="studentcEdit()">确定</el-button>
          <el-button @click="editstudentForm = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-button size="mini" type="danger" @click="handleConfirm()"
      >Add</el-button
    >
  </el-row>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
  },

  data() {
    this.$http.get("http://127.0.0.1:8000/blog/articleuse").then(
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

    return {
      tableData: [{}],
      search: "",
      addstudentForm: false,
      editstudentForm: false,
      addsForm: {
        title: "",
        brief_content: "",
        content: "",
        publish_date: "",
      },
      editsForm: {
        title: "",
        brief_content: "",
        content: "",
        publish_date: "",
      },
    };
  },
  methods: {
    change() {},
    handleEdit(index, row) {
      this.editstudentForm = true;
      this.editsForm.title = row.title; //此处写的使编辑框对应的数据显示
      this.editsForm.brief_content = row.brief_content;
      this.editsForm.content = row.content;
      this.editsForm.publish_date = row.publish_date;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleConfirm(index, row) {
      this.addstudentForm = true;
    },
    closeDialog() {
      this.addstudentForm = false;
      this.editstudentForm = false;
    },
    studentAdd() {
      let tran = this.addsForm;
      this.$http.post("http://127.0.0.1:8000/blog/articleuse", tran).then(
        (response) => {},
        (response) => {}
      );

      this.addstudentForm = false;
    },
    studentcEdit() {
      let tran = this.editsForm;
      this.$http.put("http://127.0.0.1:8000/blog/articleuse", tran).then(
        (response) => {},
        (response) => {}
      );
    },
  },
};
</script>