import {
  observable,
  action,
  runInAction,
} from 'mobx';
import BaseStroe from '@/stores/BaseStore';
import ajax from '@/utils/ajax';
import { message } from 'antd';
import { toProps } from '@/utils/decorator';
import moment from 'moment';

@toProps('chart')
class TaskChart extends BaseStroe {
  // 实时监控详情
  @observable chartData = [];

  @observable chartLoading = false;

  @observable detailData = {};

  @observable cpuBusyX = [];

  @observable cpuBusyY = [];

  @observable cpuUserX = [];

  @observable cpuUserY = [];

  @observable memUsedX = [];

  @observable memUsedY = [];

  @observable memUsedPerX = [];

  @observable memUsedPerY = [];

  @observable netInX = [];

  @observable netInY = [];

  @observable netOutX = [];

  @observable netOutY = [];

  @observable questionX = [];

  @observable questionY = [];

  @observable redisX = [];

  @observable redisY = [];

  @observable timer5 = null;

  @observable timer10 = null;

  @observable timer30 = null;

  @observable resTableData = null;

  @observable endTime = 0;

  @observable curTime = 0;

  // 接口函数统一定义
  api = {
    // 图表数据
    getChartData: params => ajax.get('/sfanalyzer/task/getjmeterfiguredatabytaskid', {
      params,
    }),
    // 历史图表数据
    getResChartData: params => ajax.get('/sfanalyzer/task/getjmeterreportdatabytaskid', {
      params,
    }),
    // 图标机器数据
    getChartRootData: params => ajax.get('/sfanalyzer/servicemetric/getallmetric', {
      params,
    }),
    // 更新root
    updateRootChart: params => ajax.get('/sfanalyzer/servicemetric/getmomentmetric', {
      params,
    }),
    // 实时监控详情
    getTaskDetail: params => ajax.get('/sfanalyzer/task/gettaskdetail', {
      params,
    }),
    getTaskLogDetail: params => ajax.get('/sfanalyzer/task/gettasklogdetail', {
      params,
    }),
    stopTask: params => ajax.post('/sfanalyzer/task/stoptask', {
      ...params,
    }),
  }

  // 实时监控详情
  @action.bound async getChartData(params) {
    this.chartLoading = true;
    this.stopTaskTime();
    const { data } = await this.api.getChartData(params);
    runInAction(() => {
      if (data && data.length) {
        this.chartLoading = false;
        this.chartData = [...this.chartData, ...data.slice(-200)];
        if (this.chartData.length > 200) {
          this.chartData.shift();
        }
      }
    });
  }

  // 历史图表详情
  @action.bound async getResChartData(params) {
    this.chartLoading = true;
    const { data } = await this.api.getResChartData(params);
    runInAction(() => {
      if (data && data.figure.length) {
        this.chartLoading = false;
        this.chartData = data.figure.slice(-200);
        this.resTableData = [data.table];
        if (this.chartData.length > 200) {
          this.chartData.shift();
        }
      }
    });
  }

  @action.bound async getChartRootData(params) {
    const { data } = await this.api.getChartRootData(params);
    runInAction(() => {
      if (data) {
        // CPU_BUSY
        if (data.CPU_BUSY && data.CPU_BUSY.x) {
          this.cpuBusyX = data.CPU_BUSY.x.slice(-200).map(v => moment.unix(v).format('HH:mm:ss'));
          this.cpuBusyY = data.CPU_BUSY.lines.slice(-200);
          for (let i = 0; i < this.cpuBusyY.length; i++) {
            this.cpuBusyY[i].smooth = true;
            this.cpuBusyY[i].showSymbol = false;
          }
        }

        // CPU_USER
        if (data.CPU_USER && data.CPU_USER.x) {
          this.cpuUserX = data.CPU_USER.x.slice(-200).map(v => moment.unix(v).format('HH:mm:ss'));
          this.cpuUserY = data.CPU_USER.lines.slice(-200);
          for (let i = 0; i < this.cpuUserY.length; i++) {
            this.cpuUserY[i].smooth = true;
            this.cpuUserY[i].showSymbol = false;
            this.cpuUserY[i].areaStyle = { opacity: 0.2 };
          }
        }

        // MEM_USED
        if (data.MEM_USED && data.MEM_USED.x) {
          this.memUsedX = data.MEM_USED.x.slice(-200).map(v => moment.unix(v).format('HH:mm:ss'));
          this.memUsedY = data.MEM_USED.lines.slice(-200);
          for (let i = 0; i < this.memUsedY.length; i++) {
            this.memUsedY[i].smooth = true;
            this.memUsedY[i].showSymbol = false;
          }
        }

        // MEM_USED_PERCENT
        if (data.MEM_USED_PERCENT && data.MEM_USED_PERCENT.x) {
          this.memUsedPerX = data.MEM_USED_PERCENT.x.slice(-200).map(v => moment.unix(v).format('HH:mm:ss'));
          this.memUsedPerY = data.MEM_USED_PERCENT.lines.slice(-200);
          for (let i = 0; i < this.memUsedPerY.length; i++) {
            this.memUsedPerY[i].smooth = true;
            this.memUsedPerY[i].showSymbol = false;
            this.memUsedPerY[i].areaStyle = { opacity: 0.2 };
          }
        }

        // NET_BOND1_IN_BITPS
        if (data.NET_BOND1_IN_BITPS && data.NET_BOND1_IN_BITPS.x) {
          this.netInX = data.NET_BOND1_IN_BITPS.x.slice(-200).map(v => moment.unix(v).format('HH:mm:ss'));
          this.netInY = data.NET_BOND1_IN_BITPS.lines.slice(-200);
          for (let i = 0; i < this.netInY.length; i++) {
            this.netInY[i].smooth = true;
            this.netInY[i].showSymbol = false;
          }
        }

        // NET_BOND1_OUT_BITPS
        if (data.NET_BOND1_OUT_BITPS && data.NET_BOND1_OUT_BITPS.x) {
          this.netOutX = data.NET_BOND1_OUT_BITPS.x.slice(-200).map(v => moment.unix(v).format('HH:mm:ss'));
          this.netOutY = data.NET_BOND1_OUT_BITPS.lines.slice(-200);
          for (let i = 0; i < this.netOutY.length; i++) {
            // this.netOutY[i].smooth = true;
            this.netOutY[i].showSymbol = false;
            this.netOutY[i].areaStyle = { opacity: 0.2 };
          }
        }

        // Questions
        if (data.Questions && data.Questions.x) {
          this.questionX = data.Questions.x.slice(-200).map(v => moment.unix(v).format('HH:mm:ss'));
          this.questionY = data.Questions.lines.slice(-200);
          for (let i = 0; i < this.questionY.length; i++) {
            this.questionY[i].smooth = true;
            this.questionY[i].showSymbol = false;
          }
        }

        // Redis_instantaneous_ops_per_sec
        if (data.Redis_instantaneous_ops_per_sec && data.Redis_instantaneous_ops_per_sec.x) {
          this.redisX = data.Redis_instantaneous_ops_per_sec.x.slice(-200).map(v => moment.unix(v).format('HH:mm:ss'));
          this.redisY = data.Redis_instantaneous_ops_per_sec.lines.slice(-200);
          for (let i = 0; i < this.redisY.length; i++) {
            this.redisY[i].smooth = true;
            this.redisY[i].showSymbol = false;
            this.redisY[i].areaStyle = { opacity: 0.2 };
          }
        }
      }
    });
  }

  @action.bound async updateRootChart(params) {
    this.stopTaskTime();
    const { data } = await this.api.updateRootChart(params);
    runInAction(() => {
      if (data && data.CPU_BUSY && data.CPU_USER) {
        // CPU_BUSY
        this.cpuBusyX = this.cpuBusyX && data && [...this.cpuBusyX, ...data.CPU_BUSY.x.map(v => moment.unix(v).format('HH:mm:ss'))];
        this.cpuBusyX.length > 200 && this.cpuBusyX.shift();
        const cpuBusyList = data.CPU_BUSY.lines;
        for (let j = 0; j < cpuBusyList.length; j++) {
          for (let i = 0; i < this.cpuBusyY.length; i++) {
            if (this.cpuBusyY[i].name === cpuBusyList[j].name) {
              this.cpuBusyY[i].data = [...this.cpuBusyY[i].data, ...cpuBusyList[j].data];
              this.cpuBusyY[i].data.length > 200 && this.cpuBusyY[i].data.shift();
            }
          }
        }

        // CPU_USER
        this.cpuUserX = this.cpuUserX && data && [...this.cpuUserX, ...data.CPU_USER.x.map(v => moment.unix(v).format('HH:mm:ss'))];
        this.cpuUserX.length > 200 && this.cpuUserX.shift();
        const cpuUserList = data.CPU_USER.lines;
        for (let j = 0; j < cpuUserList.length; j++) {
          for (let i = 0; i < this.cpuUserY.length; i++) {
            if (this.cpuUserY[i].name === cpuUserList[j].name) {
              this.cpuUserY[i].data = [...this.cpuUserY[i].data, ...cpuUserList[j].data];
              this.cpuUserY[i].data.length > 200 && this.cpuUserY[i].data.shift();
            }
          }
        }

        // MEM_USED
        this.memUsedX = this.memUsedX && data && [...this.memUsedX, ...data.MEM_USED.x.map(v => moment.unix(v).format('HH:mm:ss'))];
        this.memUsedX.length > 200 && this.memUsedX.shift();
        const memUsedList = data.MEM_USED.lines;
        for (let j = 0; j < memUsedList.length; j++) {
          for (let i = 0; i < this.memUsedY.length; i++) {
            if (this.memUsedY[i].name === memUsedList[j].name) {
              this.memUsedY[i].data = [...this.memUsedY[i].data, ...memUsedList[j].data];
              this.memUsedY[i].data.length > 200 && this.memUsedY[i].data.shift();
            }
          }
        }
        // MEM_USED_PERCENT
        this.memUsedPerX = this.memUsedPerX && data && [...this.memUsedPerX, ...data.MEM_USED_PERCENT.x.map(v => moment.unix(v).format('HH:mm:ss'))];
        this.memUsedPerX.length > 200 && this.memUsedPerX.shift();
        const memUsedPerList = data.MEM_USED_PERCENT.lines;
        for (let j = 0; j < memUsedPerList.length; j++) {
          for (let i = 0; i < this.memUsedPerY.length; i++) {
            if (this.memUsedPerY[i].name === memUsedPerList[j].name) {
              this.memUsedPerY[i].data = [...this.memUsedPerY[i].data, ...memUsedPerList[j].data];
              this.memUsedPerY[i].data.length > 200 && this.memUsedPerY[i].data.shift();
            }
          }
        }

        // NET_BOND1_IN_BITPS
        this.netInX = this.netInX && data && [...this.netInX, ...data.NET_BOND1_IN_BITPS.x.map(v => moment.unix(v).format('HH:mm:ss'))];
        this.netInX.length > 200 && this.netInX.shift();
        const netInList = data.NET_BOND1_IN_BITPS.lines;
        for (let j = 0; j < netInList.length; j++) {
          for (let i = 0; i < this.netInY.length; i++) {
            if (this.netInY[i].name === netInList[j].name) {
              this.netInY[i].data = [...this.netInY[i].data, ...netInList[j].data];
              this.netInY[i].data.length > 200 && this.netInY[i].data.shift();
            }
          }
        }

        // NET_BOND1_OUT_BITPS
        this.netOutX = this.netOutX && data && [...this.netOutX, ...data.NET_BOND1_OUT_BITPS.x.map(v => moment.unix(v).format('HH:mm:ss'))];
        this.netOutX.length > 200 && this.netOutX.shift();
        const netOutList = data.NET_BOND1_OUT_BITPS.lines;
        for (let j = 0; j < netOutList.length; j++) {
          for (let i = 0; i < this.netOutY.length; i++) {
            if (this.netOutY[i].name === netOutList[j].name) {
              this.netOutY[i].data = [...this.netOutY[i].data, ...netOutList[j].data];
              this.netOutY[i].data.length > 200 && this.netOutY[i].data.shift();
            }
          }
        }
      }
      if (data && data.Questions && data.Redis_instantaneous_ops_per_sec) {
        // Questions
        this.questionX = this.questionX && data && [...this.questionX, ...data.Questions.x.map(v => moment.unix(v).format('HH:mm:ss'))];
        this.questionX.length > 200 && this.questionX.shift();
        const questionList = data.Questions.lines;
        for (let j = 0; j < questionList.length; j++) {
          for (let i = 0; i < this.questionY.length; i++) {
            if (this.questionY[i].name === questionList[j].name) {
              this.questionY[i].data = [...this.questionY[i].data, ...questionList[j].data];
              this.questionY[i].data.length > 200 && this.questionY[i].data.shift();
            }
          }
        }

        // Redis_instantaneous_ops_per_sec
        this.redisX = this.redisX && data && [...this.redisX, ...data.Redis_instantaneous_ops_per_sec.x.map(v => moment.unix(v).format('HH:mm:ss'))];
        this.redisX.length > 200 && this.redisX.shift();
        const redisList = data.Redis_instantaneous_ops_per_sec.lines;
        for (let j = 0; j < redisList.length; j++) {
          for (let i = 0; i < this.redisY.length; i++) {
            if (this.redisY[i].name === redisList[j].name) {
              this.redisY[i].data = [...this.redisY[i].data, ...redisList[j].data];
              this.redisY[i].data.length > 200 && this.redisY[i].data.shift();
            }
          }
        }
      }
    });
  }

  // 重置
  @action.bound handleReset() {
    this.chartData = [];
    this.cpuBusyX = [];
    this.cpuBusyY = [];
    this.cpuUserX = [];
    this.cpuUserY = [];
    this.memUsedX = [];
    this.memUsedY = [];
    this.memUsedPerX = [];
    this.memUsedPerY = [];
    this.netInX = [];
    this.netInY = [];
    this.netOutX = [];
    this.netOutY = [];
    this.questionX = [];
    this.questionY = [];
    this.redisX = [];
    this.redisY = [];
    this.chartLoading = false;
    this.endTime = 0;
  }

  // 实时监控详情
  @action.bound async getTaskDetail(id, callback) {
    const { data } = await this.api.getTaskDetail(id);
    runInAction(() => {
      if (data) {
        this.detailData = data;
        // const endTime = moment().add(10, 'seconds').format('X');
        // if (+endTime > +data.endtime) {
        //   console.log(endTime, data.endtime, 1111111112334);
        //   clearInterval(this.timer5);
        //   clearInterval(this.timer10);
        //   clearInterval(this.timer30);
        // } else if (data.tasklogid) {
        //   callback && callback(data.tasklogid);
        // }
        this.endTime = moment.unix(+data.endtime).add(30, 'seconds').format('X');
        callback && callback(data.tasklogid);
      }
    });
  }

  @action.bound async getTaskLogDetail(id) {
    const { data } = await this.api.getTaskLogDetail(id);
    runInAction(() => {
      if (data) {
        this.detailData = data;
      }
    });
  }

  @action.bound async stopTask(id) {
    const { data } = await this.api.stopTask({ taskid: id });
    runInAction(() => {
      if (data) {
        message.success('任务停止成功~');
      }
    });
  }

  @action.bound stopTaskTime() {
    const curTime = moment().format('X');
    console.log(curTime, 'curTime', this.endTime, 'endtime');
    this.curTime = curTime;
    if (+curTime > this.endTime && this.endTime > 0) {
      console.log(curTime, this.endTime, 1111111112334);
      clearInterval(this.timer5);
      clearInterval(this.timer10);
      clearInterval(this.timer30);
    }
  }

  @action.bound timeWork(params) {
    // 每5秒
    this.timer5 = setInterval(() => {
      params.mode = 1;
      this.getChartData(params);
    }, 5000);

    // 每10秒
    this.timer10 = setInterval(() => {
      this.updateRootChart({
        task_log_id: params.tasklog_id,
        // task_log_id: 15380182811840,
        type: 1,
      });
    }, 10000);

    // // 每30秒
    this.timer30 = setInterval(() => {
      this.updateRootChart({
        task_log_id: params.tasklog_id,
        // task_log_id: 15380182811840,
        type: 2,
      });
    }, 30000);
  }
}
const store = new TaskChart();
export default store;
