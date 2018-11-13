import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Form, Row, Col, Select } from 'antd';
import styles from './TaskModal.scss';

const FormItem = Form.Item;
const { Option } = Select;

@observer class startModal extends React.Component {
  onOk() {
    const { form: { validateFields }, onStartTask, rowData, toTaskDetail } = this.props;
    validateFields((err, values) => {
      if (!err) {
        onStartTask && onStartTask({
          taskid: rowData.id,
          ...values,
        }, () => toTaskDetail());
      }
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
      visible,
      setStartModalVisible,
      machineList } = this.props;
    return (
      <Modal className={styles.modalForm}
        title="选择起压机"
        width={560}
        visible={visible}
        onOk={() => this.onOk()}
        okText="确定"
        onCancel={() => setStartModalVisible(false)}
        destroyOnClose
        >
        <Form layout="inline">
          <div className={styles.formBox}>
            <Row type="flex" justify="start">
              <Col span={24}>
                <FormItem
                  label="可用起压机"
                  className={styles.formItem}>
                  {
                    getFieldDecorator('machineid', {
                      rules: [{ required: true, message: '请选择可用起压机！' }],
                    })(
                      <Select placeholder="请选择可用起压机" style={{ width: 350 }}>
                        {machineList
                          .map((val) => (
                            <Option value={val.machine_id} key={val.machine_id}>
                              {val.machine_ip}
                              &nbsp;:&nbsp;
                              {val.machine_port}
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

export default Form.create()(startModal);
