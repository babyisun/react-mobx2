import React from 'react';
import { observer } from 'mobx-react';
import { Input, Modal, Form, Row, Col } from 'antd';
import styles from './TaskModal.scss';

const FormItem = Form.Item;

@observer class AddTaskModal extends React.Component {
  onOk() {
    const { form: { validateFields }, onSubmitCreate } = this.props;
    validateFields((err, values) => {
      if (!err) {
        onSubmitCreate && onSubmitCreate(values);
      }
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
      addVisible,
      setAddModalVisible } = this.props;
    return (
      <Modal className={styles.modalForm}
        title="新增任务"
        width={560}
        visible={addVisible}
        onOk={() => this.onOk()}
        okText="添加"
        onCancel={() => setAddModalVisible(false)}
        destroyOnClose
        >
        <Form layout="inline">
          <div className={styles.formBox}>
            <Row type="flex" justify="start">
              <Col span={24}>
                <FormItem
                  label="任务名称"
                  className={styles.formItem}>
                  {
                    getFieldDecorator('taskname', {
                      rules: [{ required: true, message: '请输入任务名称' }],
                    })(<Input style={{ width: 350 }} placeholder="请输入任务名称" />)
                  }
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span={24}>
                <FormItem
                  label="任务描述"
                  className={styles.formItem}>
                  {getFieldDecorator('taskdesc', {
                    rules: [{ required: true, message: '请输入任务描述' }],
                  })(<Input style={{ width: 350 }} placeholder="请输入任务描述" />)}
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span={24}>
                <FormItem
                  label="用例ID"
                  className={styles.formItem}>
                  {getFieldDecorator('caseid', {
                    rules: [{ required: true, message: '请输入用例ID' }],
                  })(<Input style={{ width: 350 }} placeholder="请输入用例ID" />)}
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span={24}>
                <FormItem
                  label="线程数"
                  className={styles.formItem}>
                  {getFieldDecorator('threadnum', {
                    rules: [{ required: true, message: '请输入线程数' }],
                  })(<Input style={{ width: 350 }} placeholder="请输入线程数" />)}
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span={24}>
                <FormItem
                  label="执行时间"
                  className={styles.formItem}>
                  {getFieldDecorator('runtime', {
                    rules: [{ required: true, message: '请输入执行时间' }],
                  })(<Input style={{ width: 350 }} placeholder="请输入执行时间" />)}
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span={24}>
                <FormItem
                  label="初始化并发数"
                  className={styles.formItem}>
                  {getFieldDecorator('initthreadnum', {
                    rules: [{ required: true, message: '请输入初始化并发数' }],
                  })(<Input style={{ width: 350 }} placeholder="请输入初始化并发数" />)}
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span={24}>
                <FormItem
                  label="间隔时间"
                  className={styles.formItem}>
                  {getFieldDecorator('intervaltime', {
                    rules: [{ required: true, message: '请输入间隔时间' }],
                  })(<Input style={{ width: 350 }} placeholder="请输入间隔时间" />)}
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span={24}>
                <FormItem
                  label="增加线程数"
                  className={styles.formItem}>
                  {getFieldDecorator('addthreadnum', {
                    rules: [{ required: true, message: '请输入增加线程数' }],
                  })(<Input style={{ width: 350 }} placeholder="请输入增加线程数" />)}
                </FormItem>
              </Col>
            </Row>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddTaskModal);
