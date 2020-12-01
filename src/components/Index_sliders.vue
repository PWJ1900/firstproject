<template>
  <el-row>
    <h1>图片最好寻找1024X400</h1>
    <div id="buttoninsert">
      <el-button size="mini" type="success" @click="handleConfirm()"
        >增加新数据</el-button
      >
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >
      <el-table-column fixed prop="pk" label="序号" width="150">
      </el-table-column>
      <el-table-column prop="slider_image" label="轮播图片" width="150">
         <template slot-scope="scope">
          <!-- <span>{{scope.row.pic}}</span> -->
          <img :src="scope.row.slider_image" width="100px" />
        </template>
      </el-table-column>
      <el-table-column prop="slider_title" label="轮播标题" width="120">
      </el-table-column>
      <el-table-column
        prop="slider_description"
        label="轮播图大小"
        width="120"
      >
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input
            v-model="search"
            @keydown.enter.native="searchinfo(search)"
            size="mini"
            placeholder="输入关键字搜索"
          />
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
      <el-form-item label="轮播顺序" prop="pk">
          <el-input v-model="addsForm.pk" max-length="10"></el-input>
        </el-form-item>
         <el-form-item label="轮播图片:" prop="slider_image">
          <h3>点击上传图片，一次只能用一张图片</h3>
          <el-upload
            ref="upload"
            action=""
            list-type="picture-card"
            :on-change="imgBroadcastChange"
            :on-success="uploadSuccess"
            :auto-upload="false"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
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
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="轮播标题" prop="slider_title">
          <el-input v-model="addsForm.slider_title"></el-input>
        </el-form-item>
        <el-form-item label="轮播图大小" prop="slider_description">
          <el-input
            type="textarea"
            :rows="6"
            v-model="addsForm.slider_description"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="studentAdd()">确定</el-button>
          <el-button
            @click="
              addstudentForm = false;
              $refs.upload.clearFiles();
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
      @close="closeDialog2"
    >
      <el-form ref="editsForm" :model="editsForm" label-width="80px">
         <el-form-item label="轮播顺序">
          <el-input
            v-model="editsForm.pk"
            max-length="20"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="轮播图片">
          <el-input
            v-model="editsForm.slider_image"
            max-length="10"
          ></el-input>
        </el-form-item> -->
         <el-form-item label="轮播图片:">
          <h3>点击上传图片，一次只能用一张图片</h3>
          <el-upload
            ref="uploadE"
            action=""
            list-type="picture-card"
            :on-change="imgBroadcastChangeE"
            :on-success="uploadSuccess"
            :auto-upload="false"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreviewE(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemoveE(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisibleimageE">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="轮播标题">
          <el-input v-model="editsForm.slider_title"></el-input>
        </el-form-item>
        <el-form-item label="轮播图大小">
          <el-input
            type="textarea"
            :rows="6"
            v-model="editsForm.slider_description"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="studentcEdit()">确定</el-button>
          <el-button @click="editstudentForm = false;$refs.uploadE.clearFiles();">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="deleteuse" width="30%">
      <span>您确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteuse = false">取 消</el-button>
        <el-button type="primary" @click="deleteju">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalget"
    >
    </el-pagination>
  </el-row>
</template>

<script scoped>
import { Usebs4 } from "@/components/utils/bs4use";
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
  },

  data() {
    this.$http
      .get("http://127.0.0.1:8000/blog/index_slider", {
        params: { pageNum: 1 },
      })
      .then(
        (response) => {
          console.log(response);
          this.totalget = response.data[0]["count"];
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
      disabled:false,
      dialogVisibleimageE:false,
      dialogVisibleimage:false,
      currentPage4: 1,
      totalget: 0,
      pagenumuse: 1,
      deletetran: {},
      deleteuse: false,
      tableData: [{}],
      search: "",
      addstudentForm: false,
      editstudentForm: false,
      addsForm: {
        slider_image: "",
        slider_title: "",
        slider_description: "",
      },
      editsForm: {
        pk:"",
        slider_image: "",
        slider_title: "",
        slider_description: "",
      },
    };
  },
  methods: {
    imgBroadcastChange(file) {
      //  this.addsForm.pic = file.url
      //  console.log(file)

      const isLt2M = file.size / 1024 / 1024 / 1024 < 2;
      if (isLt2M) {
        // uploadImgToBase64()返回一个Promise对象执行微任务，通过.then()获取其数据。其中data.result是图片转成的base64值
        Usebs4(file.raw).then((data) => {
          this.addsForm.slider_image = data.result;
        });
      } else {
        this.$message.error("上传封面图片大小不能超过 2GB!");
      }
    },
    handleRemove(file) {
      this.$refs.upload.clearFiles();
      // this.$refs.upload.abort(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log(this.dialogImageUrl);
      this.dialogVisibleimage = true;
    },
    imgBroadcastChangeE(file) {
      //  this.addsForm.pic = file.url
      //  console.log(file)

      const isLt2M = file.size / 1024 / 1024 / 1024 < 2;
      if (isLt2M) {
        // uploadImgToBase64()返回一个Promise对象执行微任务，通过.then()获取其数据。其中data.result是图片转成的base64值
        Usebs4(file.raw).then((data) => {
          this.editsForm.slider_image = data.result;
          console.log("ok")
        });
      } else {
        this.$message.error("上传封面图片大小不能超过 2GB!");
      }
    },
    handleRemoveE(file) {
      this.$refs.uploadE.clearFiles();
      // this.$refs.upload.abort(file);
    },
    handlePictureCardPreviewE(file) {
      this.dialogImageUrl = file.url;
      console.log(this.dialogImageUrl);
      this.dialogVisibleimageE = true;
    },
    handleEdit(index, row) {
      this.editstudentForm = true;
      this.editsForm.pk = row.pk;
      this.editsForm.slider_image = row.slider_image; //此处写的使编辑框对应的数据显示
      this.editsForm.slider_title = row.slider_title;
      this.editsForm.slider_description = row.slider_description;
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenumuse = `${val}`; //此处作为传分页的当前页数
      this.$http
        .get("http://127.0.0.1:8000/blog/index_slider", {
          params: { pageNum: this.pagenumuse },
        })
        .then(
          (response) => {
            console.log(response);
            let a = response.data;
            this.totalget = response.data[0]["count"];
            console.log(a);
            this.tableData = a;
            // success callback
          },
          (response) => {
            // error callback
          }
        );
    },
    deleteju() {
      this.$http
        .post("http://127.0.0.1:8000/blog/index_slider", this.deletetran)
        .then(
          (response) => {
            this.$http
              .get("http://127.0.0.1:8000/blog/index_slider", {
                params: { pageNum: this.pagenumuse },
              })
              .then(
                (response) => {
                  console.log(response);
                  let a = response.data;
                  console.log(a);
                  this.tableData = a;
                  this.deleteuse = false;
                  // success callback
                },
                (response) => {
                  // error callback
                }
              );
          },
          (response) => {}
        );
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.deletetran["pk"] = row.pk;
      this.deletetran["num"] = "3";
      this.deleteuse = true;
    },
    handleConfirm(index, row) {
      this.addstudentForm = true;
    },
    closeDialog() {
      this.addstudentForm = false;
      this.$refs.upload.clearFiles();

    },
    closeDialog2() {
      this.editstudentForm = false;
      this.$refs.uploadE.clearFiles();
    },
    searchinfo(datasearch) {
      if (datasearch != "") {
        this.$http
          .get("http://127.0.0.1:8000/blog/index_slider", {
            params: { pageNum: "" },
          })
          .then(
            (response) => {
              this.tableData = response.data;
              this.tableData = this.tableData.filter(
                (data) =>
                  !datasearch ||
                  (data.pk + "")
                    .toLowerCase()
                    .includes(datasearch.toLowerCase()) ||
                  data.slider_title
                    .toLowerCase()
                    .includes(datasearch.toLowerCase()) ||
                  (data.slider_description + "")
                    .toLowerCase()
                    .includes(datasearch.toLowerCase())
              );
            },
            (response) => {}
          );
      }
    },
    studentAdd() {
      let tran = this.addsForm;
      tran["num"] = "2";
      this.$http.post("http://127.0.0.1:8000/blog/index_slider", tran).then(
        (response) => {
          this.$http
            .get("http://127.0.0.1:8000/blog/index_slider", {
              params: { pageNum: this.pagenumuse },
            })
            .then(
              (response) => {
                console.log(response);
                this.totalget = response.data[0]["count"];
                let a = response.data;
                console.log(a);
                this.tableData = a;
                // success callback
              },
              (response) => {
                // error callback
              }
            );
        },
        (response) => {}
      );

      this.addstudentForm = false;
      this.$refs.upload.clearFiles();
    },
    studentcEdit() {
      let tran = this.editsForm;
      tran["num"] = "1";
      this.$http.post("http://127.0.0.1:8000/blog/index_slider", tran).then(
        (response) => {
          this.$http
            .get("http://127.0.0.1:8000/blog/index_slider", {
              params: { pageNum: this.pagenumuse },
            })
            .then(
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
        },
        (response) => {}
      );
      this.editstudentForm = false;
      this.$refs.uploadE.clearFiles();
    },
  },
};
</script>
<style scoped>
#buttoninsert {
  position: relative;
  left: 46%;
}
</style>