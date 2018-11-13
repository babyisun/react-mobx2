import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Card, Row, Col, Form, Input, Select, Button, InputNumber } from 'antd';
import Path from '@/components/Common/Path';
import ListHeader from '@/components/Common/ListHeader';
import FilterList from '@/components/Common/FilterList';
import ThReadChart from './components/ThReadChart';

const { Option } = Select;

@observer
class EditTask extends Component {
  componentDidMount() {
    const { loadAppList, loadCase, loadDetail, initialOptopn } = this.props.stores.task;
    loadAppList();
    loadCase();
    loadDetail(this.props.match.params.id, (rowdata) => initialOptopn(rowdata));
    // this.getOption();
  }

  componentWillUnmount() {
    this.props.stores.task.clearChartOpt();
  }

  onSubmit = (back) => {
    const { form: { validateFields } } = this.props;
    const { onSubmitEdit } = this.props.stores.task;
    const that = this;

    const callback = back ? that.props.history.push('/Task') : {};

    validateFields((err, values) => {
      if (!err) {
        onSubmitEdit && onSubmitEdit({
          ...values,
          taskid: this.props.match.params.id,
        }, () => callback);
      }
    });
  }

  // 总并发数变化
  onThreadnumChange = (val) => {
    if (val < 90000) {
      this.props.stores.task.setChartOpt(val, 'threadnum');
    }
  }

  // 增加并发数变化
  onAddthreadnumChange = (val) => {
    this.props.stores.task.setChartOpt(val, 'addthreadnum');
  }

  // 初始化并发数变化
  onInitthreadnumChange = (val) => {
    this.props.stores.task.setChartOpt(val, 'initthreadnum');
  }

  // 间隔时间变化
  onIntervaltimeChange = (val) => {
    this.props.stores.task.setChartOpt(val, 'intervaltime');
  }

  // 运行时间变化
  onRuntimeChange = (val) => {
    if (val < 900000) {
      this.props.stores.task.setChartOpt(val, 'runtime');
    }
  }

   // 表单项
   taskInfo = () => [
     {
       label: '任务名称',
       value: 'taskname',
       el: <Input placeholder="请输入任务名称" />,
       option: {
         rules: [{ required: true, message: '请输入任务名称！' }],
         initialValue: this.props.stores.task.rowData.taskname,
       },
     },
     {
       label: '任务描述',
       value: 'taskdesc',
       el: <Input placeholder="请输入任务描述" />,
       option: {
         rules: [{ required: true, message: '请输入任务描述！' }],
         initialValue: this.props.stores.task.rowData.taskdesc,
       },
     },
     {
       label: '所属项目',
       value: 'appid',
       el:
  <Select placeholder="请选择所属项目">
    {this.props.stores.task.appList
      .map(val => <Option value={val.appid} key={val.appid}>{val.appname}</Option>)}
  </Select>,
       option: {
         rules: [{ required: true, message: '请选择所属项目！' }],
         initialValue: this.props.stores.task.rowData.appid,
       },
     },
     {
       label: '关联用例',
       value: 'caseid',
       el:
  <Select placeholder="请选择关联用例">
    {this.props.stores.task.caseList
      .map(val => <Option value={val.caseid} key={val.caseid}>{val.casename}</Option>)}
  </Select>,
       option: {
         rules: [{ required: true, message: '请选择关联用例！' }],
         initialValue: this.props.stores.task.rowData.caseid,
       },
     },
     {
       label: '总并发数',
       value: 'threadnum',
       el: <InputNumber placeholder="请输入总并发数" onChange={this.onThreadnumChange} />,
       option: {
         rules: [
           { required: true, message: '请输入总并发数！' },
           { pattern: /^[0-9]{1,5}$/, message: '最大不得超过5位数！' },
         ],
         initialValue: this.props.stores.task.rowData.threadnum,
       },
     },
     {
       label: '初始化并发数',
       value: 'initthreadnum',
       el: <InputNumber placeholder="请输入初始化并发数" onChange={this.onInitthreadnumChange} />,
       option: {
         rules: [{ required: true, message: '请输入初始化并发数！' }],
         initialValue: this.props.stores.task.rowData.initthreadnum,
       },
     },
     {
       label: '每',
       value: 'intervaltime',
       el: <InputNumber placeholder="请输入时间" onChange={this.onIntervaltimeChange} />,
       option: {
         rules: [{ required: true, message: '请输入时间！' }],
         initialValue: this.props.stores.task.rowData.intervaltime,
       },
       postfix: '秒',
     },
     {
       label: '增加',
       value: 'addthreadnum',
       el: <InputNumber placeholder="请输入并发数" onChange={this.onAddthreadnumChange} />,
       option: {
         rules: [{ required: true, message: '请输入并发数！' }],
         initialValue: this.props.stores.task.rowData.addthreadnum,
       },
       postfix: '并发',
     },
     {
       label: '测试时间（秒）',
       value: 'runtime',
       el: <InputNumber placeholder="请输入测试时间" onChange={this.onRuntimeChange} />,
       option: {
         rules: [
           { required: true, message: '请输入测试时间！' },
           { pattern: /^[0-9]{1,6}$/, message: '最大不得超过6位数！' },
         ],
         initialValue: this.props.stores.task.rowData.runtime,
       },
     },
     {
       label: '监控负载机',
       value: 'loadmachine',
       el: <Input placeholder="请输入监控负载机，如：10.188.60.66,10.188.60.67" />,
       option: {
         rules: [
           { pattern: /^(?:(?:^|,)(?:[0-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])(?:\.(?:[0-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3})+$/,
             message: '请输入正确格式，用英文逗号隔开！' },
         ],
         initialValue: this.props.stores.task.rowData.loadmachine,
       },
     },
     {
       label: '监控mysql',
       value: 'mysqlmachine',
       el: <Input placeholder="请输入监控mysql，如：10.188.60.66,10.188.60.67" />,
       option: {
         rules: [
           { pattern: /^(?:(?:^|,)(?:[0-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])(?:\.(?:[0-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3})+$/,
             message: '请输入正确格式，用英文逗号隔开！' },
         ],
         initialValue: this.props.stores.task.rowData.mysqlmachine,
       },
     },
     {
       label: '监控redis',
       value: 'redismachine',
       el: <Input placeholder="请输入监控redis，如：10.188.60.66,10.188.60.67" />,
       option: {
         rules: [
           { pattern: /^(?:(?:^|,)(?:[0-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])(?:\.(?:[0-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3})+$/,
             message: '请输入正确格式，用英文逗号隔开！' },
         ],
         initialValue: this.props.stores.task.rowData.redismachine,
       },
     },
   ];

   render() {
     const { task: {
       option,
       setOption,
       threadnum,
       initthreadnum,
       intervaltime,
       addthreadnum,
       runtime } } = this.props.stores;
     const { form } = this.props;
     return (
       <div>
         <Path data={[{ name: '任务管理', path: '/Task' }, { name: '编辑任务' }]} />
         <Card>
           <ListHeader title="编辑任务" />
           <Row gutter={24} type="flex" justify="space-between" className="page-header">
             <Card title="1.编辑信息" style={{ width: '100%' }}>
               <Form layout="inline">
                 <FilterList
                   form={form}
                   fromData={this.taskInfo()}
              />
               </Form>
             </Card>
           </Row>
           <Row gutter={24} type="flex" justify="space-between" className="page-header">
             <Card title="2.并发用户随时间变化图" style={{ width: '100%' }}>
               <ThReadChart
                 threadnum={threadnum}
                 initthreadnum={initthreadnum}
                 intervaltime={intervaltime}
                 addthreadnum={addthreadnum}
                 runtime={runtime}
                 option={option}
                 setOption={setOption}
             />
             </Card>
           </Row>
           <Row gutter={24} type="flex" justify="center">
             <Col>
               <Button onClick={() => this.onSubmit(true)} type="primary">提交并返回</Button>
             </Col>
             <Col>
               <Button onClick={() => this.onSubmit()} type="primary">提交</Button>
             </Col>
             <Col>
               <Button onClick={() => this.props.history.push('/Task')}>返回</Button>
             </Col>
           </Row>
         </Card>
       </div>
     );
   }
}

export default Form.create()(EditTask);