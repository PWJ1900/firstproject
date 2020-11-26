<template>
  <el-row>
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
      <el-table-column fixed prop="pk" label="序号" width="80">
      </el-table-column>
      <el-table-column prop="orderID" label="orderID" v-if="false" width="80">
      </el-table-column>
      <el-table-column
        prop="paperinfo"
        label="文章信息"
        width="150"
        :formatter="dateFormat"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.paperinfo }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="index" label="检索证明1" width="90">
      </el-table-column>

      <el-table-column prop="pdf_link" label="文章pdf" width="80">
        <template slot-scope="scope">
          <!-- 此处运用scope来获取当前的值 -->
          <!-- <el-tag
            @click="jump(scope.row.pdf_link)"
            size="mini"
            type=""
            effect="dark"
            >PDF</el-tag
          > -->
          <el-tag
            @click="jumppdf(scope.row.pdf_link)"
            size="mini"
            type=""
            effect="dark"
            >PDF</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="index_link" label="证明pdf1" width="90">
        <template slot-scope="scope">
          <!-- 此处运用scope来获取当前的值 -->
          <el-tag
            @click="jumppdf(scope.row.index_link)"
            size="mini"
            effect="dark"
            type="success"
            >PDF</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="index2" label="检索证明2" width="90">
      </el-table-column>
      <el-table-column prop="index3" label="检索证明3" width="90">
      </el-table-column>
      <el-table-column prop="index_link2" label="证明pdf2" width="90"
        ><template slot-scope="scope">
          <!-- 此处运用scope来获取当前的值 -->
          <!-- <el-tag
            @click="jump(scope.row.index_link2)"
            size="mini"
            type="success"
            effect="dark"
            >PDF</el-tag
          > -->
          <el-tag
            @click="jumppdf(scope.row.index_link2)"
            size="mini"
            type=""
            effect="dark"
            >PDF</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="index_link3" label="证明pdf3" width="90">
        <template slot-scope="scope">
          <!-- <el-tag
            @click="jump(scope.row.index_link3)"
            size="mini"
            type="success"
            effect="dark"
            >PDF</el-tag
          > -->
          <el-tag
            @click="jumppdf(scope.row.index_link3)"
            size="mini"
            type=""
            effect="dark"
            >PDF</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input
            v-model="search"
            size="mini"
            @keydown.enter.native="searchinfo(search)"
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
      :close-on-click-modal="false"
      title="新增论文获得信息"
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
        <el-form-item label="orderID" prop="orderID">
          <el-input v-model="addsForm.orderID" max-length="10"></el-input>
        </el-form-item>
        <el-form-item label="文章信息:" prop="paperinfo">
          <el-input
            type="textarea"
            :rows="4"
            v-model="addsForm.paperinfo"
          ></el-input>
        </el-form-item>
        <el-form-item label="检索证明1" prop="index">
          <el-input v-model="addsForm.index"></el-input>
        </el-form-item>
        <el-form-item label="文章pdf:" prop="pdf_link">
          <!-- <el-input v-model="addsForm.pdf_link"></el-input> -->
          <el-upload
            class="upload-demo"
            action=""
            v-model="addsForm.pdf_link"
            :on-preview="handlePreviewpdf"
            :auto-upload="false"
            :on-remove="handleRemovepdf"
            :before-remove="beforeRemovepdf"
            multiple
            ref="uploadpdf"
            :on-change="handleChangepdf"
            :limit="1"
            :on-exceed="handleExceedpdf"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传pdf文件，且不超过10mb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="证明pdf1:" prop="index_link">
          <!-- <el-input v-model="addsForm.index_link"></el-input> -->
          <el-upload
            class="upload-demo"
            action=""
            v-model="addsForm.index_link"
            :on-preview="handlePreviewpdf1"
            :auto-upload="false"
            :on-remove="handleRemovepdf1"
            :before-remove="beforeRemovepdf1"
            multiple
            ref="uploadpdf1"
            :on-change="handleChangepdf1"
            :limit="1"
            :on-exceed="handleExceedpdf1"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传pdf文件，且不超过10mb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="检索证明2:" prop="index2">
          <el-input v-model="addsForm.index2"></el-input>
        </el-form-item>
        <el-form-item label="检索证明3:" prop="index3">
          <el-input v-model="addsForm.index3"></el-input>
        </el-form-item>
        <el-form-item label="证明pdf2:" prop="index_link2">
          <!-- <el-input v-model="addsForm.index_link2"></el-input> -->
          <el-upload
            class="upload-demo"
            action=""
            v-model="addsForm.index_link2"
            :on-preview="handlePreviewpdf2"
            :auto-upload="false"
            :on-remove="handleRemovepdf2"
            :before-remove="beforeRemovepdf2"
            multiple
            ref="uploadpdf2"
            :on-change="handleChangepdf2"
            :limit="1"
            :on-exceed="handleExceedpdf2"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传pdf文件，且不超过10mb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="证明pdf3:" prop="index_link3">
          <!-- <el-input v-model="addsForm.index_link3"></el-input> -->
          <el-upload
            class="upload-demo"
            action=""
            v-model="addsForm.index_link3"
            :on-preview="handlePreviewpdf3"
            :auto-upload="false"
            :on-remove="handleRemovepdf3"
            :before-remove="beforeRemovepdf3"
            multiple
            ref="uploadpdf3"
            :on-change="handleChangepdf3"
            :limit="1"
            :on-exceed="handleExceedpdf3"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传pdf文件，且不超过10mb
            </div>
          </el-upload>
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
      :close-on-click-modal="false"
      title="编辑论文获得信息"
      :visible="editstudentForm"
      size="tiny"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <el-form ref="editsForm" :model="editsForm" label-width="80px">
        <el-form-item label="orderID">
          <el-input
            v-model="editsForm.orderID"
            max-length="10"
            disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章信息:">
          <el-input
            type="textarea"
            :rows="4"
            v-model="editsForm.paperinfo"
          ></el-input>
        </el-form-item>
        <el-form-item label="检索证明1:">
          <el-input v-model="editsForm.index"></el-input>
        </el-form-item>
        <el-form-item label="文章pdf:">
          <!-- <el-input v-model="editsForm.pdf_link"></el-input> -->
          <el-upload
            class="upload-demo1"
            action=""
            v-model="editsForm.pdf_link"
            :on-preview="handlePreviewpdfE"
            :auto-upload="false"
            :on-remove="handleRemovepdfE"
            :before-remove="beforeRemovepdfE"
            multiple
            ref="uploadpdfE"
            :on-change="handleChangepdfE"
            :limit="1"
            :on-exceed="handleExceedpdfE"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传pdf文件，且不超过10mb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="证明pdf1:">
          <!-- <el-input v-model="editsForm.index_link"></el-input> -->
          <el-upload
            class="upload-demo2"
            action=""
            v-model="editsForm.index_link"
            :on-preview="handlePreviewpdfE1"
            :auto-upload="false"
            :on-remove="handleRemovepdfE"
            :before-remove="beforeRemovepdfE1"
            multiple
            ref="uploadpdfE1"
            :on-change="handleChangepdfE1"
            :limit="1"
            :on-exceed="handleExceedpdfE1"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传pdf文件，且不超过10mb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="检索证明2:">
          <el-input v-model="editsForm.index2"></el-input>
        </el-form-item>
        <el-form-item label="检索证明3:">
          <el-input v-model="editsForm.index3"></el-input>
        </el-form-item>
        <el-form-item label="证明pdf2:">
          <!-- <el-input v-model="editsForm.index_link2"></el-input> -->
           <el-upload
            class="upload-demo3"
            action=""
            v-model="editsForm.index_link2"
            :on-preview="handlePreviewpdfE2"
            :auto-upload="false"
            :on-remove="handleRemovepdfE2"
            :before-remove="beforeRemovepdfE2"
            multiple
            ref="uploadpdfE2"
            :on-change="handleChangepdfE2"
            :limit="1"
            :on-exceed="handleExceedpdfE2"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传pdf文件，且不超过10mb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="证明pdf3:">
          <!-- <el-input v-model="editsForm.index_link3"></el-input> -->
           <el-upload
            class="upload-demo4"
            action=""
            v-model="editsForm.index_link3"
            :on-preview="handlePreviewpdfE3"
            :auto-upload="false"
            :on-remove="handleRemovepdfE3"
            :before-remove="beforeRemovepdfE3"
            multiple
            ref="uploadpdfE3"
            :on-change="handleChangepdfE3"
            :limit="1"
            :on-exceed="handleExceedpdfE3"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传pdf文件，且不超过10mb
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="studentcEdit()">确定</el-button>
          <el-button
            @click="
              editstudentForm = false;
              this.$ref.uploadpdfE.clearFiles();
              this.$refs.uploadpdfE1.clearFiles();
              this.$refs.uploadpdfE2.clearFiles();
              this.$refs.uploadpdfE3.clearFiles();
            "
            >取消</el-button
          >
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
      :total="totalget"
    >
    </el-pagination>
    <el-dialog
      :close-on-click-modal="false"
      title="提示"
      :visible.sync="deleteuse"
      width="30%"
      :before-close="handleClose2"
    >
      <span>您确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteuse = false">取 消</el-button>
        <el-button type="primary" @click="deleteju">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="PDF"
      :visible.sync="dialogVisiblepdf"
      width="80%"
      id="dialogpdf"
      :close-on-click-modal="false"
      :before-close="handleClosepdf"
    >
      <div style="height: 1200px">
        <embed
          :src="contentpdf"
          type="application/pdf"
          width="100%"
          height="100%"
        />
        <span slot="footer" class="dialog-footer">
          <el-button
            @click="
              dialogVisiblepdf = false;
              this.$refs.uploadpdf.clearFiles();
              this.$refs.uploadpdf2.clearFiles();
              this.$refs.uploadpdf1.clearFiles();
              this.$refs.uploadpdf3.clearFiles();
            "
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="
              dialogVisiblepdf = false;
              this.$refs.uploadpdf.clearFiles();
              this.$refs.uploadpdf2.clearFiles();
              this.$refs.uploadpdf1.clearFiles();
              this.$refs.uploadpdf3.clearFiles();
            "
            >确 定</el-button
          >
        </span>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import { Httpuse } from "@/components/api/httpuseget";
import { Usebs4 } from "@/components/utils/bs4use";
export default {
  created() {
    Httpuse(this, "achievementvue", 1);
  },

  methods: {
    handleClick(row) {
      console.log(row);
    },
  },
  // mounted(){
  //     if()

  // },

  data() {
    return {
      contentpdf: "",
      dialogVisiblepdf: false,
      totalget: 0,
      currentPage4: 1,
      pagenumuse: 1,
      tableData: [{}],
      search: "",
      addstudentForm: false,
      editstudentForm: false,
      deleteuse: false,
      deletetran: {},
      addsForm: {
        orderID: "",
        paperinfo: "",
        index: "",
        pdf_link: "",
        index_link: "",
        index2: "",
        index3: "",
        index_link2: "",
        index_link3: "",
      },
      editsForm: {
        //这里面三个作为搜索项
        orderID: "",
        paperinfo: "",
        index: "",
        pdf_link: "",
        index_link: "",
        index2: "",
        index3: "",
        index_link2: "",
        index_link3: "",
      },
    };
  },
  methods: {
    handleRemovepdf(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewpdf(file) {
      console.log(file);
    },
    handleExceedpdf(files, fileList) {
      this.$message.warning(
        `文件限制1, 你选${files.length} 大小的文件, 超过 ${
          files.length + fileList.length
        } 大小`
      );
    },
    beforeRemovepdf(file, fileList) {
      return this.$confirm(`您确定要移走${file.name}文件吗 ?`);
    },
    handleChangepdf(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 / 1024 < 2;
      if (isLt2M) {
        Usebs4(file.raw).then((data) => {
          console.log(data.result);
          this.addsForm.pdf_link = data.result;
        });
      } else {
        this.$message.error("上传pdf大小不能超过 2GB!");
      }
    }, //之前都是pdf方法
    handleRemovepdf2(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewpdf2(file) {
      console.log(file);
    },
    handleExceedpdf2(files, fileList) {
      this.$message.warning(
        `文件限制1, 你选${files.length} 大小的文件, 超过 ${
          files.length + fileList.length
        } 大小`
      );
    },
    beforeRemovepdf2(file, fileList) {
      return this.$confirm(`您确定要移走${file.name}文件吗 ?`);
    },
    handleChangepdf2(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 / 1024 < 2;
      if (isLt2M) {
        Usebs4(file.raw).then((data) => {
          console.log(data.result);
          this.addsForm.index_link2 = data.result;
        });
      } else {
        this.$message.error("上传pdf大小不能超过 2GB!");
      }
    }, //之前都是pdf方法
    //之前都是pdf方法
    handleRemovepdf1(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewpdf1(file) {
      console.log(file);
    },
    handleExceedpdf1(files, fileList) {
      this.$message.warning(
        `文件限制1, 你选${files.length} 大小的文件, 超过 ${
          files.length + fileList.length
        } 大小`
      );
    },
    beforeRemovepdf1(file, fileList) {
      return this.$confirm(`您确定要移走${file.name}文件吗 ?`);
    },
    handleChangepdf1(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 / 1024 < 2;
      if (isLt2M) {
        Usebs4(file.raw).then((data) => {
          console.log(data.result);
          this.addsForm.index_link = data.result;
        });
      } else {
        this.$message.error("上传pdf大小不能超过 2GB!");
      }
      //之前都是pdf方法
    },
    handleRemovepdf3(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewpdf3(file) {
      console.log(file);
    },
    handleExceedpdf3(files, fileList) {
      this.$message.warning(
        `文件限制1, 你选${files.length} 大小的文件, 超过 ${
          files.length + fileList.length
        } 大小`
      );
    },
    beforeRemovepdf3(file, fileList) {
      return this.$confirm(`您确定要移走${file.name}文件吗 ?`);
    },
    handleChangepdf3(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 / 1024 < 2;
      if (isLt2M) {
        Usebs4(file.raw).then((data) => {
          console.log(data.result);
          this.addsForm.index_link3 = data.result;
        });
      } else {
        this.$message.error("上传pdf大小不能超过 2GB!");
      }
    }, //之前都是pdf方法

    handleRemovepdfE(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewpdfE(file) {
      console.log(file);
    },
    handleExceedpdfE(files, fileList) {
      this.$message.warning(
        `文件限制1, 你选${files.length} 大小的文件, 超过 ${
          files.length + fileList.length
        } 大小`
      );
    },
    beforeRemovepdfE(file, fileList) {
      return this.$confirm(`您确定要移走${file.name}文件吗 ?`);
    },
    handleChangepdfE(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 / 1024 < 2;
      if (isLt2M) {
        Usebs4(file.raw).then((data) => {
          console.log(data.result);
          this.editsForm.pdf_link = data.result;
        });
      } else {
        this.$message.error("上传pdf大小不能超过 2GB!");
      }
    }, //之前都是pdf方法
    handleRemovepdfE1(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewpdfE1(file) {
      console.log(file);
    },
    handleExceedpdfE1(files, fileList) {
      this.$message.warning(
        `文件限制1, 你选${files.length} 大小的文件, 超过 ${
          files.length + fileList.length
        } 大小`
      );
    },
    beforeRemovepdfE1(file, fileList) {
      return this.$confirm(`您确定要移走${file.name}文件吗 ?`);
    },
    handleChangepdfE1(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 / 1024 < 2;
      if (isLt2M) {
        Usebs4(file.raw).then((data) => {
          console.log(data.result);
          this.editsForm.index_link = data.result
        });
      } else {
        this.$message.error("上传pdf大小不能超过 2GB!");
      }
    }, //之前都是pdf方法
        handleRemovepdfE2(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewpdfE2(file) {
      console.log(file);
    },
    handleExceedpdfE2(files, fileList) {
      this.$message.warning(
        `文件限制1, 你选${files.length} 大小的文件, 超过 ${
          files.length + fileList.length
        } 大小`
      );
    },
    beforeRemovepdfE2(file, fileList) {
      return this.$confirm(`您确定要移走${file.name}文件吗 ?`);
    },
    handleChangepdfE2(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 / 1024 < 2;
      if (isLt2M) {
        Usebs4(file.raw).then((data) => {
          console.log(data.result);
          this.editsForm.index_link2 = data.result
        });
      } else {
        this.$message.error("上传pdf大小不能超过 2GB!");
      }
    }, //之前都是pdf方法
        handleRemovepdfE3(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewpdfE3(file) {
      console.log(file);
    },
    handleExceedpdfE3(files, fileList) {
      this.$message.warning(
        `文件限制1, 你选${files.length} 大小的文件, 超过 ${
          files.length + fileList.length
        } 大小`
      );
    },
    beforeRemovepdfE3(file, fileList) {
      return this.$confirm(`您确定要移走${file.name}文件吗 ?`);
    },
    handleChangepdfE3(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 / 1024 < 2;
      if (isLt2M) {
        Usebs4(file.raw).then((data) => {
          console.log(data.result);
          this.editsForm.index_link3 = data.result
        });
      } else {
        this.$message.error("上传pdf大小不能超过 2GB!");
      }
    }, //之前都是pdf方法

    jump(link) {
      window.open(link);
    },
    jumppdf(link) {
      this.dialogVisiblepdf = true;
      this.contentpdf = link;
    },
    searchinfo(datasearch) {
      if (datasearch != "") {
        this.$http
          .get("http://127.0.0.1:8000/blog/achievementvue", {
            params: { pageNum: "" },
          })
          .then(
            (response) => {
              this.tableData = response.data;
              this.tableData = this.tableData.filter(
                (data) =>
                  !datasearch ||
                  (data.orderID + "")
                    .toLowerCase()
                    .includes(datasearch.toLowerCase()) ||
                  (data.index + "")
                    .toLowerCase()
                    .includes(datasearch.toLowerCase()) ||
                  data.paperinfo
                    .toLowerCase()
                    .includes(datasearch.toLowerCase())
              );
              console.log(this.tableData);
            },
            (response) => {}
          );
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenumuse = `${val}`; //此处作为传分页的当前页数
      this.$http
        .get("http://127.0.0.1:8000/blog/achievementvue", {
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
    handleEdit(index, row) {
      this.editstudentForm = true;
      this.editsForm.orderID = row.orderID; //此处写的使编辑框对应的数据显示
      this.editsForm.paperinfo = row.paperinfo;
      this.editsForm.index = row.index;
      this.editsForm.pdf_link = row.pdf_link;
      this.editsForm.index_link = row.index_link;
      this.editsForm.index2 = row.index2;
      this.editsForm.index3 = row.index3;
      this.editsForm.index_link2 = row.index_link2;
      this.editsForm.index_link3 = row.index_link3;
      console.log(index, row);
    },
    deleteju() {
      this.$http
        .post("http://127.0.0.1:8000/blog/achievementvue", this.deletetran)
        .then(
          (response) => {
            this.$http
              .get("http://127.0.0.1:8000/blog/achievementvue", {
                params: { pageNum: this.pagenumuse },
              })
              .then(
                (response) => {
                  console.log(response);
                  let a = response.data;
                  console.log(a);
                  this.tableData = a;
                  alert("删除成功！");
                  // success callback
                },
                (response) => {
                  // error callback
                }
              );
          },
          (response) => {}
        );
      this.deleteuse = false;
    },
    handleClose2(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleDelete(index, row) {
      let change = row.orderID;
      this.deletetran["orderID"] = change;
      this.deletetran["num"] = "3";
      console.log(this.deletetran);
      this.deleteuse = true;
      console.log(index, row);
    },
    handleConfirm(index, row) {
      this.addstudentForm = true;
    },
    closeDialog() {
      this.addstudentForm = false;
      this.editstudentForm = false;
      this.$refs.uploadpdf.clearFiles();
      this.$refs.uploadpdf2.clearFiles();
      this.$refs.uploadpdf1.clearFiles();
      this.$refs.uploadpdf3.clearFiles();
      this.$refs.uploadpdfE.clearFiles();
      this.$refs.uploadpdfE1.clearFiles();
      this.$refs.uploadpdfE2.clearFiles();
      this.$refs.uploadpdfE3.clearFiles();
    },
    dateFormat() {},
    studentAdd() {
      let tran = this.addsForm;
      tran["num"] = "2";
      this.$http.post("http://127.0.0.1:8000/blog/achievementvue", tran).then(
        (response) => {
          this.$http
            .get("http://127.0.0.1:8000/blog/achievementvue", {
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
    },
    studentcEdit() {
      let tran = this.editsForm;
      tran["num"] = "1";
      this.$http.post("http://127.0.0.1:8000/blog/achievementvue", tran).then(
        (response) => {
          this.$http
            .get("http://127.0.0.1:8000/blog/achievementvue", {
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
      this.$refs.uploadpdfE.clearFiles();
      this.$refs.uploadpdfE1.clearFiles();
      this.$refs.uploadpdfE2.clearFiles();
      this.$refs.uploadpdfE3.clearFiles();
    },
  },
};
</script>

<style scoped>
span {
  max-width: 10em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; /*超出部分用...代替*/
}
#buttoninsert {
  position: relative;
  left: 46%;
}
</style>