<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="资源名称" prop="resourceName">
        <el-input
          v-model="queryParams.resourceName"
          placeholder="请输入资源名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类别id" prop="classesId">
        <el-input
          v-model="queryParams.classesId"
          placeholder="请输入类别id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类别名称" prop="classesName">
        <el-input
          v-model="queryParams.classesName"
          placeholder="请输入类别名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="下载积分" prop="resourceIntegral">
        <el-input
          v-model="queryParams.resourceIntegral"
          placeholder="请输入下载积分"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['business:resource:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['business:resource:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['business:resource:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['business:resource:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="resourceList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="资源名称" align="center" prop="resourceName" />
      <el-table-column label="类别名称" align="center" prop="classesName" />
      <el-table-column
        label="下载积分"
        align="center"
        prop="resourceIntegral"
      />
      <el-table-column label="资源路径" align="center" prop="resourcePath" />
      <el-table-column label="资源简介" align="center" prop="resourceIntro" />
      <el-table-column label="备注" align="center" prop="resourceNote" />
      <el-table-column label="创建人" align="center" prop="createBy" />
      <el-table-column label="创建时间" align="center" prop="createTime" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['business:resource:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['business:resource:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改资源管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form
        ref="form"
        enctype="multipart/form-data"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="资源名称" prop="resourceName">
          <el-input v-model="form.resourceName" placeholder="请输入资源名称" />
        </el-form-item>
        <el-form-item label="资源类别" prop="classesId">
          <el-select v-model="form.classesId" placeholder="请选择资源类别">
            <el-option
              v-for="item in resourceClassesList"
              :key="item.classesId"
              :label="item.classesName"
              :value="item.classesId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别名称" prop="classesName" hidden>
          <el-input v-model="form.classesId" placeholder="请输入类别名称" />
        </el-form-item>
        <el-form-item label="下载积分" prop="resourceIntegral">
          <el-input
            type="number"
            v-model="form.resourceIntegral"
            placeholder="请输入下载积分"
          />
        </el-form-item>
        <el-form-item
          id="resourcePath"
          label="当前文件"
          prop="resourcePath"
          v-show="resourcePathShow"
        >
          <el-input type="input" v-model="form.resourcePath" readonly="true" />
        </el-form-item>
        <el-form-item label="资源文件">
          <input type="file" @change="fileUpload" />
        </el-form-item>
        <el-form-item label="资源简介" prop="resourceIntro">
          <el-input
            v-model="form.resourceIntro"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="备注" prop="resourceNote">
          <el-input
            v-model="form.resourceNote"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listResource,
  getResource,
  delResource,
  fileUpload,
  addResource,
  updateResource,
} from "@/api/business/resource";
import { listAllResourceClasses } from "@/api/business/resourceClasses";

export default {
  name: "Resource",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 资源管理表格数据
      resourceList: [],
      // 资源类别数据
      resourceClassesList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        resourceName: null,
        classesId: null,
        classesName: null,
        resourceIntegral: null,
        resourcePath: null,
        resourceIntro: null,
        resourceNote: null,
      },
      // 表单参数
      form: {},
      // 资源文件是否展示
      resourcePathShow: false,
      // 表单校验
      rules: {
        resourceName: [
          { required: true, message: "资源名称不能为空", trigger: "blur" },
        ],
        classesId: [
          { required: true, message: "类别名称不能为空", trigger: "blur" },
        ],
        resourceIntegral: [
          { required: true, message: "下载积分不能为空", trigger: "blur" },
        ],
        resourcePath: [
          { required: true, message: "资源文件不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询资源管理列表 */
    getList() {
      this.loading = true;
      listResource(this.queryParams).then((response) => {
        this.resourceList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        resourceId: null,
        resourceName: null,
        classesId: null,
        classesName: null,
        resourceIntegral: null,
        resourcePath: null,
        myFile: null,
        resourceIntro: null,
        resourceNote: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.resourceId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    //文件上传
    fileUpload(e) {
      const files = e.target.files;
      if (files.length > 0) {
        const formData = new FormData();
        formData.append("myFile", files[0]);
        fileUpload(formData).then((response) => {
          this.form.resourcePath = response;
        });
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.resourcePathShow = false;
      //查询全部资源类别列表
      listAllResourceClasses().then((response) => {
        this.resourceClassesList = response.data;
      });
      this.open = true;
      this.title = "添加资源管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.resourcePathShow = true;
      //查询全部资源类别列表
      listAllResourceClasses().then((response) => {
        this.resourceClassesList = response.data;
      });
      const resourceId = row.resourceId || this.ids;
      getResource(resourceId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改资源管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.resourceId != null) {
            updateResource(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addResource(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const resourceIds = row.resourceId || this.ids;
      this.$modal
        .confirm("是否确认删除？")
        .then(function () {
          return delResource(resourceIds);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "business/resource/export",
        {
          ...this.queryParams,
        },
        `resource_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
