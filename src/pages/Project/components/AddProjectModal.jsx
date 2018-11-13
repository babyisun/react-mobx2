import React from 'react';
import { observer } from 'mobx-react';
import { Input, Modal, Form, Row, Col } from 'antd';
import styles from './ProjectModal.scss';

const FormItem = Form.Item;

@observer class AddProjectModal extends React.Component {
  onOk() {
    const { form: { validateFields }, onSubmitCreate } = this.props;
    validateFields((err, values) => {
      if (!err) {
        onSubmitCreate && onSubmitCreate(values);
      }
    });
  }

  render() {
    const { form: { getFieldDecorator }, addVisible, setAddModalVisible } = this.props;
    return (
      <Modal className={styles.modalForm}
        title="新增项目"
        width={560}
        visible={addVisible}
        onOk={() => this.onOk()}
        okText="提交"
        onCancel={() => setAddModalVisible(false)}
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
                    getFieldDecorator('appname', {
                      rules: [{ required: true, message: '请输入项目名称' }],
                    })(<Input style={{ width: 350 }} placeholder="请输入项目名称" />)
                  }
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span={24}>
                <FormItem
                  label="项目描述"
                  className={styles.formItem}>
                  {getFieldDecorator('appdesc', {
                    rules: [{ required: true, message: '请输入项目描述' }],
                  })(<Input style={{ width: 350 }} placeholder="请输入项目描述" />)}
                </FormItem>
              </Col>
            </Row>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddProjectModal);
