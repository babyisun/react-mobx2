import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Form, Row, Col, Select } from 'antd';
import styles from './AddEntryModal.scss';

const FormItem = Form.Item;
const { Option } = Select;

@observer class AddEntryModal extends React.Component {
  onOk() {
    const { form: { validateFields }, addDataSet, modalClose } = this.props;
    validateFields((err, values) => {
      if (!err) {
        console.log('dataset', values);
        values.type = 2;
        delete values.dataset_name;
        console.log(values);
        addDataSet(values);
        modalClose(false);
      }
    });
  }

  onChangeApp = (value) => {
    this.props.getDataSetList({ app_id: value });
    console.log('appid', value);
  }

  onChangeDataset = (value) => {
    this.props.getDataSetKey({ dataset_id: value });
    // this.props.setDataSetId(value);
    console.log('dataset_id', value);
  }

  render() {
    const { form: { getFieldDecorator },
      modalVisible,
      modalClose,
      appList,
      dataSetList,
      dataSetKeyList } = this.props;
    console.log(dataSetKeyList);
    return (
      <Modal className={styles.modalForm}
        title="添加词条"
        width={560}
        visible={modalVisible}
        onOk={() => this.onOk()}
        okText="添加"
        onCancel={() => modalClose(false)}
        destroyOnClose
            >
        <Form layout="inline">
          <div className={styles.formBox}>
            <Row type="flex" justify="start">
              <Col span={24}>
                <FormItem
                  label="项目名称"
                  className={styles.formItem}>
                  {
                    getFieldDecorator('appid', {
                      rules: [
                        { required: true, message: '请选择项目名称' },
                      ],
                    })(
                      <Select placeholder="请选择所属项目" style={{ width: 350 }} onChange={this.onChangeApp}>
                        {appList
                          .map(val => (
                            <Option value={val.appid} key={val.appid}>
                              {val.appname}
                            </Option>
                          ))}
                      </Select>,
                    )
                  }
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem
                  label="词条文件"
                  className={styles.formItem}>
                  {
                    getFieldDecorator('dataset_id', {
                      rules: [
                        { required: true, message: '请选择词条文件' },
                      ],
                    })(
                      <Select placeholder="请选择词条文件" style={{ width: 350 }} onChange={this.onChangeDataset}>
                        {dataSetList
                          .map(val => (
                            <Option value={val.dataset_id} key={val.dataset_id}>
                              {val.dataset_name}
                            </Option>
                          ))}
                      </Select>,
                    )
                  }
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem
                  label="词条key名"
                  className={styles.formItem}>
                  {
                    getFieldDecorator('dataset_key', {
                      rules: [
                        { required: true, message: '请选择词条key名' },
                      ],
                    })(
                      <Select placeholder="请选择词条文件" style={{ width: 350 }}>
                        {dataSetKeyList
                          .map(val => (
                            <Option value={val} key={val}>
                              {val}
                            </Option>
                          ))}
                      </Select>,
                    )
                  }
                </FormItem>
              </Col>
            </Row>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddEntryModal);
