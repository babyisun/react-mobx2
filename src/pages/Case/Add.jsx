import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Form, Card, Input, Select, Row, Button, Col } from 'antd';
import ListHeader from '@/components/Common/ListHeader';
import Path from '@/components/Common/Path';
import CaseParamSelect from './components/CaseParamSelect';
import FilterList from '@/components/Common/FilterList';

const { Option } = Select;

@observer
class AddCase extends Component {
  componentDidMount() {
    this.props.stores.case.loadAppList();
  }

  componentWillUnmount() {
    this.props.stores.case.reduceCaseSelectRequest(0, true);
  }

  // 表单项
  caseInfo = () => [
    {
      label: '用例描述',
      value: 'casename',
      el: <Input placeholder="请输入用例描述" />,
      option: { rules: [{ required: true, message: '请输入用例描述' }] },
    },
    {
      label: '所属项目',
      value: 'appid',
      el:
  <Select placeholder="请选择所属项目">
    {this.props.stores.case.appList
      .map(val => <Option value={val.appid} key={val.appid}>{val.appname}</Option>)}
  </Select>,
      option: { rules: [{ required: true, message: '请选择所属项目' }] },
    },
    {
      label: '服务器名称或IP',
      value: 'host',
      el: <Input placeholder="请输入服务器名称或IP" />,
      option: { rules: [{ required: true, message: '请输入服务器名称或IP' }] },
    },
    {
      label: '端口号',
      value: 'port',
      el: <Input placeholder="请输入端口号" />,
      option: { rules: [{ required: true, message: '请输入端口号' }] },
    },
    {
      label: '路径',
      value: 'path',
      el: <Input placeholder="请输入路径" />,
      option: { rules: [{ required: true, message: '请输入路径' }] },
    },
    {
      label: '请求协议',
      value: 'protocol',
      el:
  <Select placeholder="请选择请求协议">
    <Option value="HTTP">HTTP</Option>
    <Option value="HTTPS">HTTPS</Option>
  </Select>,
      option: { rules: [{ required: true, message: '请选择请求协议' }] },
    },
    {
      label: '请求方法',
      value: 'method',
      el:
  <Select placeholder="请选择请求方法">
    <Option value="GET">GET</Option>
    <Option value="POST">POST</Option>
  </Select>,
      option: { rules: [{ required: true, message: '请选择请求方法' }] },
    },
    {
      label: '响应断言',
      value: 'assertcontent',
      el: <Input placeholder="请输入响应断言" />,
    },
    {
      label: 'Cookie',
      value: 'cookie',
      el: <Input placeholder="请输入Cookie" />,
    },
  ];

  // 提交表单
  onSubmit = (back) => {
    const { form: { validateFields } } = this.props;

    validateFields((err, values) => {
      if (!err) {
        this.formatParam(values, back);
      }
    });
  }

  // 表单参数处理
  formatParam = (values, back) => {
    const keyValue = [];
    const dataSets = [];
    Object.entries(values).map(([key, val]) => {
      const i = key.replace(/[^0-9]/ig, '');
      if (i && (key.indexOf('key') !== -1 || key.indexOf('value') !== -1)) {
        keyValue.push([i, key, val]);
        delete values[key];
      }
      if (i && key.indexOf('dataSet') !== -1) {
        dataSets.push([i, key, val]);
        delete values[key];
      }
      return false;
    });
    const params = {};
    keyValue.map((val, key) => {
      if ((key - 1) >= 0 && val[0] === keyValue[key - 1][0]) {
        params[keyValue[key - 1][2]] = {
          value: val[2],
          type: 1,
        };
      }
      return false;
    });
    dataSets.map((val, key) => {
      if (key >= 3 && val[0] === dataSets[key - 1][0]
        && val[0] === dataSets[key - 2][0] && val[0] === dataSets[key - 3][0]) {
        params[dataSets[key - 3][2]] = {
          dataset_appid: dataSets[key - 2][2],
          dataset_id: dataSets[key - 1][2],
          dataset_key: dataSets[key][2],
          type: 2,
        };
      }
      return false;
    });

    const { onSubmitCreate } = this.props.stores.case;
    const callback = back ? () => this.props.history.push('/Case')
      : this.props.form.resetFields;
    onSubmitCreate({ ...values, params: JSON.stringify(params) }, callback);
  }

  // 增加文本类型请求参数
  addText = () => {
    this.props.stores.case.addCaseSelectRequest({ type: 1, i: Math.random() });
  }

  // 增加选择类型请求参数
  addDataSet = () => {
    this.props.stores.case.addCaseSelectRequest({ type: 2, i: Math.random() });
  }

  render() {
    const { case: {
      caseSelectRequests,
      reduceCaseSelectRequest,
      appList,
      dataSetList,
      getDataSetList,
      getDataSetKey,
      dataSetKeyList,
      version,
    },
    } = this.props.stores;
    const { form } = this.props;
    return (
      <div version={version}>
        <Path data={[{ name: '用例管理', path: '/Case' }, { name: '新增用例' }]} />
        <Card>
          <ListHeader title="新增用例" />
          <Row gutter={24} type="flex" justify="space-between" className="page-header">
            <Card title="1.用例信息" style={{ width: '100%' }}>
              <Form layout="inline">
                <FilterList
                  fromData={this.caseInfo()}
                  form={form}
                />
              </Form>
            </Card>
          </Row>
          <Row gutter={24} type="flex" justify="space-between" className="page-header">
            <Card title="2.请求参数" style={{ width: '100%' }}>
              <Button icon="plus" style={{ marginLeft: 20, marginBottom: 30, borderWidth: 2 }} onClick={this.addText}>文本</Button>
              <Button icon="plus" style={{ marginLeft: 20, marginBottom: 30, borderWidth: 2 }} onClick={this.addDataSet}>词表</Button>
              <Form layout="inline">
                {
                  caseSelectRequests && caseSelectRequests.length
                    ? caseSelectRequests.map((val, key) => (
                      <CaseParamSelect
                        version={version}
                        key={val.i}
                        index={val.i}
                        formIndex={key}
                        data={val}
                        appList={appList}
                        dataSetList={dataSetList}
                        dataSetKeyList={dataSetKeyList}
                        getDataSetList={getDataSetList}
                        getDataSetKey={getDataSetKey}
                        form={form}
                        reduceCaseSelectRequest={reduceCaseSelectRequest}
                    />
                    )) : null
                }
              </Form>
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
              <Button onClick={() => this.props.history.push('/Case')}>返回</Button>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default Form.create()(AddCase);
