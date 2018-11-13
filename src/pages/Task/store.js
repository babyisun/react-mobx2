import {
  observable,
  action,
  runInAction,
} from 'mobx';
import BaseStroe from '@/stores/BaseStore';
import ajax from '@/utils/ajax';
import {
  message,
} from 'antd';
import { loading, toProps } from '@/utils/decorator';

@toProps('task')
class Task extends BaseStroe {
  // 接口函数统一定义
  api = {
    getList: params => ajax.get('/sfanalyzer/task/gettasklist', {
      params,
    }),
    getDetailList: params => ajax.get('/sfanalyzer/task/getfinishtaskloglist', {
      params,
    }),
    getDetail: params => ajax.get('/sfanalyzer/task/gettaskdetail', {
      params,
    }),
    addTask: params => ajax.post('/sfanalyzer/task/addtask', {
      ...params,
    }),
    editTask: params => ajax.post('/sfanalyzer/task/modifytask', {
      ...params,
    }),
    stopTask: params => ajax.post('/sfanalyzer/task/stoptask', {
      ...params,
    }),
    startTask: params => ajax.post('/sfanalyzer/task/startuptask', {
      ...params,
    }),
    getApp: params => ajax.get('/sfanalyzer/app/getallapplist', {
      params,
    }),
    getMachine: params => ajax.get('/sfanalyzer/machine/getmachinelist', {
      params,
    }),
    getCase: params => ajax.get('/sfanalyzer/case/getallcaselist', {
      params,
    }),
  }

  // 监听store声明
  @observable total = 0;

  // 任务列表
  @observable data = [];

  // 已完成任务列表
  @observable dataDetail = [];

  // 开始任务modal显隐
  @observable startVisible = false;

  // 选中列
  @observable rowData = {};

  // 项目列表
  @observable appList = [];

  // 机器列表
  @observable machineList = [];

  // 用例列表
  @observable caseList = [];

  // 分页参数
  @observable pagination = {
    page: 1,
    perpage: 10,
  }

  // 详情页loading
  @observable detailLoading = false;

  // 请求参数
  @observable param = {};

  // 总并发
  @observable threadnum = 50;

  @observable initthreadnum = 5;

  @observable intervaltime = 10;

  @observable addthreadnum = 5;

  @observable runtime = 300;

  // 图表参数
  @observable option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
    },
    tooltip: {
      trigger: 'axis',
    },
    yAxis: {
      name: '并发数',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    series: [
      {
        type: 'line',
        name: '并发',
        data: [],
      },
    ],
  };

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

  // 添加提交
  @action onSubmitAdd = async (values, callback) => {
    const data = await this.api.addTask({ ...values });
    runInAction(() => {
      if (data.success) {
        message.success('创建成功！');
        callback();
      }
    });
  }

  // 编辑提交
  @action onSubmitEdit = async (values, callback) => {
    const data = await this.api.editTask({ ...values });
    runInAction(() => {
      if (data.success) {
        message.success('修改成功！');
        callback();
      }
    });
  }

  // 结束任务
  @action onStopTask = async (id) => {
    const data = await this.api.stopTask({ taskid: id });
    runInAction(() => {
      if (data.success) {
        message.success('任务已停止！');
        this.load();
      }
    });
  }

  // 开始任务
  @action onStartTask = async (value, callback) => {
    const data = await this.api.startTask(value);
    runInAction(() => {
      if (data.success) {
        message.success('任务已开始！');
        callback();
      }
      this.startVisible = false;
    });
  }

  // 设置弹框显隐
  @action.bound setStartModalVisible(bool, row) {
    this.startVisible = bool;
    this.rowData = row;
  }

  // 设置选中列值
  @action.bound setRowData(row) {
    this.rowData = row;
  }

  @action.bound setChartOpt(val, props) {
    this[props] = parseInt(val, 10);
  }


  @action.bound initialOptopn(val, props) {
    props && this[props] ? this[props] = val[props]
      : Object.entries(val).map(([k, v]) => this[k] = v);
  }

  @action.bound clearChartOpt() {
    this.threadnum = 0;
    this.initthreadnum = 0;
    this.intervaltime = 0;
    this.addthreadnum = 0;
    this.runtime = 0;
  }

  @action.bound setOption(x, y) {
    this.option.xAxis.data = x;
    this.option.series[0].data = y;
  }


  // 这是一个接口请求示例
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

  // 这是一个接口请求示例
  @action.bound @loading async loadDetailList(id) {
    this.detailLoading = true;
    const params = { ...this.pagination, ...this.paramDetail, taskid: id };
    const data = await this.api.getDetailList(params);
    runInAction(() => {
      if (data.success) {
        this.dataDetail = data.data;
        this.detailLoading = false;
        // this.totalDetail = data.total;
      }
    });
  }

    // 这是一个接口请求示例
    @action.bound @loading async loadDetail(id, callback) {
    this.detailLoading = true;
    const params = { ...this.pagination, ...this.paramDetail, taskid: id };
    const data = await this.api.getDetail(params);
    runInAction(() => {
      if (data.success) {
        this.rowData = data.data;
        this.detailLoading = false;
        callback && callback(this.rowData);
        // this.totalDetail = data.total;
      }
    });
  }

  // 所属项目列表
  @action.bound async loadAppList() {
      const data = await this.api.getApp();
      runInAction(() => {
        if (data.success) {
          this.appList = data.data;
        }
      });
    }

  // 机器列表
  @action.bound async loadMachine() {
    const data = await this.api.getMachine();
    runInAction(() => {
      if (data.success) {
        this.machineList = data.data;
      }
    });
  }

  // case列表
  @action.bound async loadCase() {
    const data = await this.api.getCase();
    runInAction(() => {
      if (data.success) {
        this.caseList = data.data;
      }
    });
  }
}
const store = new Task();
export default store;
