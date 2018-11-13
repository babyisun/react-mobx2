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

@toProps('words')
class Words extends BaseStroe {
  // 接口函数统一定义
  api = {
    getList: params => ajax.get('/sfanalyzer/dataset/getdatasetList', {
      params,
    }),
    // 获取项目列表
    getProjects: params => ajax.get('/sfanalyzer/app/getallapplist', {
      params,
    }),
    getTemplete: () => ajax.get('/sfanalyzer/dataset/getdatasettempleteurl'),
    addWords: params => ajax.post('/sfanalyzer/dataset/addDataSet', {
      ...params,
    }),
    editWords: params => ajax.post('/sfanalyzer/dataset/UpdateDataSet', {
      ...params,
    }),
  }

  // 监听store声明
  @observable total = 0;

  @observable data = [];

  @observable projects = [];

  @observable visible = false;

  @observable rowData = null;// {};

  @observable pagination = {
    page: 1,
    page_size: 10,
  }

  @observable url='';

  @observable param = {};

  // 改变分页参数
  @action.bound onPageChange(page, page_size) {
    this.pagination.page = page;
    this.pagination.page_size = page_size;
    this.load();
  }

  // 搜索
  @action.bound onSearch(values) {
    this.pagination.page = 1;
    this.param = values;
    this.load(values);
  }

  @action onSubmitCreate = async (values) => {
    const { data } = await this.api.addWords({ ...values });
    runInAction(() => {
      if (data) {
        this.visible = false;
        message.success('新增成功！');
        this.load();
      }
    });
  }

  @action.bound onEdit(row) {
    this.rowData = row;
    this.visible = true;
  }

  @action onSubmitEdit = async (values) => {
    const { data } = await this.api.editWords({ ...values });
    runInAction(() => {
      if (data) {
        this.visible = false;
        message.success('修改成功！');
        this.load();
      }
    });
  }

  @action.bound setModalVisible(bool) {
    this.rowData = null;
    this.visible = bool;
  }

  // 请求词表列表数据
  @action.bound @loading async load() {
    const params = { ...this.pagination, ...this.param };
    const { data, success } = await this.api.getList(params);
    runInAction(() => {
      if (success) {
        this.data = data.list;
        this.total = data.count;
      }
    });
  }

  // 获取项目列表数据
  @action.bound @loading async loadProjects() {
    const { data, success } = await this.api.getProjects();
    runInAction(() => {
      if (success) {
        this.projects = data;
      }
    });
  }

  @action.bound async laodTemplete() {
    const { data, success } = await this.api.getTemplete();
    runInAction(() => {
      if (success) {
        this.url = data.url;
      }
    });
  }
}
const store = new Words();
export default store;
