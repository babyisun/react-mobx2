import {
  observable,
  action,
  runInAction,
} from 'mobx';
import BaseStroe from '@/stores/BaseStore';
import ajax from '@/utils/ajax';
import { loading, toProps } from '@/utils/decorator';
import {
  message,
} from 'antd';

@toProps('project')
class Project extends BaseStroe {
  // 接口函数统一定义
  api = {
    getList: params => ajax.get('/sfanalyzer/app/getapplist', {
      params,
    }),
    addApp: params => ajax.post('/sfanalyzer/app/addapp', {
      ...params,
    }),
    editApp: params => ajax.post('/sfanalyzer/app/modifyapp', {
      ...params,
    }),
  }

  // 监听store声明
  @observable total = 0;

  // 列表参数
  @observable data = [];

  // 编辑弹框显隐
  @observable editVisible = false;

  // 添加弹框显隐
  @observable addVisible = false;

  // 选中列
  @observable rowData = {};

  // 分页
  @observable pagination = {
    page: 1,
    perpage: 10,
  }

  // 请求参数
  @observable param = {};

  // 改变分页参数
  @action.bound onPageChange(page, perpage) {
    this.pagination.page = page;
    this.pagination.perpage = perpage;
    this.load();
  }

  // 搜索
  @action.bound onSearch(values) {
    this.pagination.page = 1;
    this.param = values;
    this.load(values);
  }

  // 新增项目
  @action onCreateProject() {
    this.addVisible = true;
  }

  @action onSubmitCreate = async (values) => {
    const data = await this.api.addApp({ ...values });
    runInAction(() => {
      if (data) {
        this.addVisible = false;
        message.success('添加成功！');
        this.load();
      }
    });
  }

  // 编辑
  @action.bound onEdit(row) {
    this.editVisible = true;
    this.rowData = row;
  }

  // 提交编辑
  @action onSubmitEdit = async (values) => {
    const data = await this.api.editApp({ ...values });
    runInAction(() => {
      if (data) {
        this.editVisible = false;
        message.success('修改成功！');
        this.load();
      }
    });
  }

  // 设置弹框显隐
  @action.bound setAddModalVisible(bool) {
    this.addVisible = bool;
  }

  // 设置弹框显隐
  @action.bound setEditModalVisible(bool) {
    this.editVisible = bool;
  }

  // 加载数据
  @action.bound @loading async load() {
    const params = { ...this.pagination, ...this.param };
    const data = await this.api.getList(params);
    runInAction(() => {
      if (data.success) {
        this.data = data.data.list;
        this.total = data.data.total;
      }
    });
  }
}
const store = new Project();
export default store;
