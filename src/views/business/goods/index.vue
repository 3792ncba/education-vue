<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="商品名称" prop="goodsName">
        <el-input
          v-model="queryParams.goodsName"
          placeholder="请输入商品名称"
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
      <el-form-item label="子类名称" prop="subclassName">
        <el-input
          v-model="queryParams.subclassName"
          placeholder="请输入子类名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品价格" prop="goodsPrice">
        <el-input
          v-model="queryParams.goodsPrice"
          placeholder="请输入商品价格"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="积分" prop="goodsIntegral">
        <el-input
          v-model="queryParams.goodsIntegral"
          placeholder="请输入积分"
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
          v-hasPermi="['business:goods:add']"
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
          v-hasPermi="['business:goods:edit']"
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
          v-hasPermi="['business:goods:remove']"
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
          v-hasPermi="['business:goods:export']"
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
      :data="goodsList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="商品名称" align="center" prop="goodsName" />
      <el-table-column label="类别名称" align="center" prop="classesName" />
      <el-table-column label="子类名称" align="center" prop="subclassName" />
      <el-table-column label="商品价格" align="center" prop="goodsPrice" />
      <el-table-column label="积分" align="center" prop="goodsIntegral" />
      <el-table-column label="商品数量" align="center" prop="goodsNum" />
      <el-table-column label="商品单位" align="center" prop="goodsUnit" />
      <el-table-column label="商品图片" align="center" prop="goodsImg" />
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
            v-hasPermi="['business:goods:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['business:goods:remove']"
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

    <!-- 添加或修改商品对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="form.goodsName" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="类别id" prop="classesId">
          <el-input v-model="form.classesId" placeholder="请输入类别id" />
        </el-form-item>
        <el-form-item label="类别名称" prop="classesName" hidden>
          <el-input v-model="form.classesName" placeholder="请输入类别名称" />
        </el-form-item>
        <el-form-item label="子类id" prop="subclassId">
          <el-input v-model="form.subclassId" placeholder="请输入子类id" />
        </el-form-item>
        <el-form-item label="子类名称" prop="subclassName" hidden>
          <el-input v-model="form.subclassName" placeholder="请输入子类名称" />
        </el-form-item>
        <el-form-item label="商品价格" prop="goodsPrice">
          <el-input v-model="form.goodsPrice" placeholder="请输入商品价格" />
        </el-form-item>
        <el-form-item label="积分" prop="goodsIntegral">
          <el-input v-model="form.goodsIntegral" placeholder="请输入积分" />
        </el-form-item>
        <el-form-item label="商品数量" prop="goodsNum">
          <el-input v-model="form.goodsNum" placeholder="请输入商品数量" />
        </el-form-item>
        <el-form-item label="商品单位" prop="goodsUnit">
          <el-input v-model="form.goodsUnit" placeholder="请输入商品单位" />
        </el-form-item>
        <el-form-item label="商品图片" prop="goodsImg">
          <el-input v-model="form.goodsImg" placeholder="请输入商品图片" />
        </el-form-item>
        <el-form-item label="商品详情" prop="goodsDetail">
          <el-input
            v-model="form.goodsDetail"
            type="textarea"
            placeholder="请输入商品详情"
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
  listGoods,
  getGoods,
  delGoods,
  addGoods,
  updateGoods,
} from "@/api/business/goods";

export default {
  name: "Goods",
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
      // 商品表格数据
      goodsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        goodsName: null,
        classesId: null,
        classesName: null,
        subclassId: null,
        subclassName: null,
        goodsPrice: null,
        goodsIntegral: null,
        goodsNum: null,
        goodsUnit: null,
        goodsImg: null,
        goodsDetail: null,
        goodsStatus: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        goodsName: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
        ],
        classesId: [
          { required: true, message: "类别id不能为空", trigger: "blur" },
        ],
        subclassId: [
          { required: true, message: "子类id不能为空", trigger: "blur" },
        ],
        goodsPrice: [
          {
            required: true,
            message: "商品价格（元）不能为空",
            trigger: "blur",
          },
        ],
        goodsIntegral: [
          { required: true, message: "积分不能为空", trigger: "blur" },
        ],
        goodsNum: [
          { required: true, message: "商品数量不能为空", trigger: "blur" },
        ],
        goodsUnit: [
          { required: true, message: "商品单位不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询商品列表 */
    getList() {
      this.loading = true;
      listGoods(this.queryParams).then((response) => {
        this.goodsList = response.rows;
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
        goodsId: null,
        goodsName: null,
        classesId: null,
        classesName: null,
        subclassId: null,
        subclassName: null,
        goodsPrice: null,
        goodsIntegral: null,
        goodsNum: null,
        goodsUnit: null,
        goodsImg: null,
        goodsDetail: null,
        goodsStatus: 0,
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
      this.ids = selection.map((item) => item.goodsId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加商品";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const goodsId = row.goodsId || this.ids;
      getGoods(goodsId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改商品";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.goodsId != null) {
            updateGoods(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addGoods(this.form).then((response) => {
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
      const goodsIds = row.goodsId || this.ids;
      this.$modal
        .confirm('是否确认删除商品编号为"' + goodsIds + '"的数据项？')
        .then(function () {
          return delGoods(goodsIds);
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
        "business/goods/export",
        {
          ...this.queryParams,
        },
        `goods_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
