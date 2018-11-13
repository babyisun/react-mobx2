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

@toProps('case')
class Case extends BaseStroe {
  // 接口函数统一定义
  api = {
    getList: params => ajax.get('/sfanalyzer/case/getcaselist', {
      params,
    }),
    addCase: params => ajax.post('/sfanalyzer/case/addcase', {
      ...params,
    }),
    addDataSet: params => ajax.post('/sfanalyzer/dataset/addDataSet', {
      ...params,
    }),
    detailCase: params => ajax.get('/sfanalyzer/case/getcasedetail', {
      params,
    }),
    getDataSet: params => ajax.post('/sfanalyzer/dataset/getdatasetList', {
      ...params,
    }),
    getDataSetKey: params => ajax.post('/sfanalyzer/dataset/getdatasetkeysbydatasetid', {
      ...params,
    }),
    editCase: params => ajax.post('/sfanalyzer/case/modifycase', {
      ...params,
    }),
    getApp: params => ajax.get('/sfanalyzer/app/getallapplist', {
      ...params,
    }),
  }

  // 监听store声明
  @observable total = 0;

  // 列表数据
  @observable data = [];

  // 详情页数据
  @observable detailLoading = false;

  // 项目列表
  @observable appList = [];

  // 列数据
  @observable rowData = {};

  // 请求参数项数组
  @observable caseSelectRequests = [];

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

  // 新建提交
  @action onSubmitCreate = async (values, callback) => {
    const data = await this.api.addCase({ ...values });
    runInAction(() => {
      if (data.success) {
        this.addVisible = false;
        message.success('添加成功！');
        callback && callback();
        this.load();
      }
    });
  }

  // 编辑提交
  @action onSubmitEdit = async (values) => {
    const data = await this.api.editCase({ ...values });
    runInAction(() => {
      if (data.success) {
        this.editVisible = false;
        message.success('修改成功！');
        this.load();
      }
    });
  }

  // 列表数据
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

  // 获取详情
  @action.bound async loadDetail(id, callback) {
    this.detailLoading = true;
    const data = await this.api.detailCase({ caseid: id });
    runInAction(() => {
      if (data.success) {
        this.rowData = data.data;
        callback && callback(this.rowData);
        this.detailLoading = false;
      }
    });
  }

  @action.bound async loadAppList() {
    const data = await this.api.getApp();
    runInAction(() => {
      if (data.success) {
        this.appList = data.data;
      }
    });
  }

  // 获取词条Id、name
  @action.bound async getDataSetList(values) {
    return this.api.getDataSet(values);
  }

  // 添加词条key
  @action.bound async getDataSetKey(values) {
    return this.api.getDataSetKey(values);
  }

  // 添加请求参数项
  @action.bound addCaseSelectRequest(caseRequest) {
    this.caseSelectRequests.push(caseRequest);
  }

  // 删除请求参数项
  @action.bound reduceCaseSelectRequest(index, bool) {
    if (bool) return this.caseSelectRequests = [];
    const x = this.caseSelectRequests.findIndex(item => item.i === index);
    return this.caseSelectRequests.splice(x, 1, {});
  }

  // 设置选中列数据
  @action.bound setRowData(row) {
    this.rowData = row;
  }
}
const store = new Case();
export default store;
