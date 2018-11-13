import React from 'react';
import { observer } from 'mobx-react';
import { Input, Modal, Form, Row, Col } from 'antd';
import styles from './TaskModal.scss';

const FormItem = Form.Item;

@observer class EditProjectModal extends React.Component {
  onOk() {
    const { form: { validateFields }, onSubmitEdit, rowData } = this.props;
    validateFields((err, values) => {
      if (!err) {
        onSubmitEdit && onSubmitEdit({ appid: rowData.id, ...values });
      }
    });
  }

  render() {
    const { form: { getFieldDecorator }, editVisible, setEditModalVisible, rowData } = this.props;
    return (
      <Modal className={styles.modalForm}
        title="编辑项目"
        width={560}
        visible={editVisible}
        onOk={() => this.onOk()}
        okText="修改"
        onCancel={() => setEditModalVisible(false)}
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
                      initialValue: rowData.taskname ? rowData.taskname : '',
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
                    initialValue: rowData.taskdesc ? rowData.taskdesc : '',
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
                    initialValue: rowData.caseid ? rowData.caseid : '',
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
                    initialValue: rowData.threadnum ? rowData.threadnum : '',
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
                    initialValue: rowData.runtime ? rowData.runtime : '',
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
                    initialValue: rowData.initthreadnum ? rowData.initthreadnum : '',
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
                    initialValue: rowData.intervaltime ? rowData.intervaltime : '',
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
                    initialValue: rowData.addthreadnum ? rowData.addthreadnum : '',
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

export default Form.create()(EditProjectModal);
