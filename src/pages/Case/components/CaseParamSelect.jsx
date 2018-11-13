import React from 'react';
import { observer } from 'mobx-react';
import { Form, Row, Col, Icon, Input, Select } from 'antd';
import styles from './CaseParam.scss';

const FormItem = Form.Item;
const { Option } = Select;

@observer class CaseParamSelect extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSetList: [],
      dataSetKeyList: [],
    };
  }

  onChangeApp = (value) => {
    this.props.getDataSetList({ app_id: value }).then(res => {
      this.setState({
        dataSetList: res.data.list,
      });
    });
  }

  onChangeDataset = (value) => {
    this.props.getDataSetKey({ dataset_id: value }).then(res => {
      this.setState({
        dataSetKeyList: res.data,
      });
    });
  }


  render() {
    const {
      form: { getFieldDecorator },
      data,
      appList,
      formIndex,
      reduceCaseSelectRequest,
      index: i } = this.props;
    const {
      dataSetList,
      dataSetKeyList,
    } = this.state;
    return (
      <div className={styles.FilterForm}>
        {
          data.type === 2 ? (
            <Row gutter={24} justify="flex-start" className="param">
              <Col span={5}>
                <FormItem
                  label="key"
                  className={styles.formItem}>
                  {getFieldDecorator(`dataSetKey${formIndex}`, {
                    initialValue: data ? data.key : '',
                    rules: [{ required: true, message: '请输入key值' }],
                  })(
                    <div>
                      <Input placeholder="请输入key值"
                        key={i}
                        defaultValue={data ? data.key : ''}
                        disabled={data ? data.disabled : false} />
                    </div>,
                  )}
                </FormItem>
              </Col>
              <Col span={5}>
                <FormItem
                  label="所属项目"
                  className={styles.formItem}>
                  {getFieldDecorator(`dataSetappid${formIndex}`, {
                    initialValue: data ? data.dataset_appid : '',
                    rules: [{ required: true, message: '请选择所属项目' }],
                  })(
                    <Select placeholder="请选择所属项目"
                      disabled={data ? data.disabled : false}
                      onChange={this.onChangeApp}>
                      {appList
                        .map(v => (
                          <Option value={v.appid} key={i}>
                            {v.appname}
                          </Option>
                        ))}
                    </Select>,
                  )}
                </FormItem>
              </Col>
              <Col span={5}>
                <FormItem
                  label="词条文件"
                  className={styles.formItem}>
                  {
                getFieldDecorator(`dataSetId${formIndex}`, {
                  initialValue: data ? data.dataset_id : '',
                  rules: [{ required: true, message: '请选择词条文件' }],
                })(
                  <Select placeholder="请选择词条文件"
                    disabled={data ? data.disabled : false}
                    onChange={this.onChangeDataset}>
                    {
                      dataSetList && dataSetList.length > 0 ? dataSetList
                        .map(v => (
                          <Option value={v.dataset_id} key={i}>
                            {v.dataset_name}
                          </Option>
                        )) : (
                          <Option
                            value={data.dataset_id ? data.dataset_id : 0}>
                            {data.dataset_name ? data.dataset_name : ''}
                          </Option>
                      )
                    }
                  </Select>,
                )
              }
                </FormItem>
              </Col>
              <Col span={5}>
                <FormItem
                  label="Value"
                  className={styles.formItem}>
                  {getFieldDecorator(`dataSetValue${formIndex}`, {
                    initialValue: data ? data.dataset_key : '',
                    rules: [{ required: true, message: '请选择词条key名' }],
                  })(
                    <Select placeholder="请选择词条key名"
                      disabled={data ? data.disabled : false}>
                      { dataSetKeyList && dataSetKeyList.length > 0 && dataSetKeyList
                        .map(v => (
                          <Option key={i} value={v}>
                            {v}
                          </Option>
                        ))}
                    </Select>,
                  )}
                </FormItem>
              </Col>
              <Col span={4}>
                <Icon type="close" onClick={() => reduceCaseSelectRequest(i)} />
              </Col>
            </Row>
          ) : null
          }
        {
            data.type === 1 ? (
              <Row gutter={24} justify="flex-start" className="param">
                <Col span={5}>
                  <FormItem
                    label="key"
                    className={styles.formItem}>
                    {getFieldDecorator(`key${formIndex}`, {
                      initialValue: data ? data.key : '',
                      rules: [{ required: true, message: '请输入key' }],
                    })(
                      <Input placeholder="请输入key"
                        key={i}
                        disabled={data ? data.disabled : false} />,
                    )}
                  </FormItem>
                </Col>
                <Col span={5}>
                  <FormItem
                    label="Value"
                    className={styles.formItem}>
                    {getFieldDecorator(`value${formIndex}`, {
                      initialValue: data ? data.value : '',
                      rules: [{ required: true, message: '请输入value' }],
                    })(
                      <Input placeholder="请输入value"
                        key={i}
                        disabled={data ? data.disabled : false} />,
                    )}
                  </FormItem>
                </Col>
                <Col span={4}>
                  <Icon type="close" title="删除" onClick={() => reduceCaseSelectRequest(i)} />
                </Col>
              </Row>
            ) : null
        }
      </div>
    );
  }
}

export default CaseParamSelect;
