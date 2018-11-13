/*
入参：
1.projects：arr，项目列表
2.editObj，编辑操作时为对象，非编辑操作时为null
*/


import React from 'react';
import { observer } from 'mobx-react';
import { Input, Modal, Form, Row, Col, Select } from 'antd';
import styles from './WordsModal.scss';
import Upload from './Upload';

const FormItem = Form.Item;
const { Option } = Select;

@observer class AddWordsModal extends React.Component {
  state = {
    fileUrl: '',
  }

  onOk() {
    const { form: { validateFields }, onSubmit, editObj } = this.props;
    validateFields((err, values) => {
      if (!err && (this.state.fileUrl || editObj)) {
        onSubmit && onSubmit({ ...editObj, ...values,
          file_path: this.state.fileUrl || editObj.file_path });
        this.setState({
          fileUrl: '',
        });
      }
    });
  }

  render() {
    const { fileUrl } = this.state;
    const { form: { getFieldDecorator }, visible,
      setModalVisible, editObj = null, projects = [], tempUrl } = this.props;
    return (
      <Modal className={styles.modalForm}
        title={!editObj ? '新增词表' : '编辑词表'}
        width={560}
        visible={visible}
        onOk={() => this.onOk()}
        okText="提交"
        onCancel={() => {
          setModalVisible(false);
          this.setState({
            fileUrl: '',
          });
        }}
        destroyOnClose
        >
        <Form layout="inline">
          <div className={styles.formBox}>
            <Row type="flex" justify="start">
              <Col span={24}>
                <FormItem
                  label="词表名称"
                  className={styles.formItem}>
                  {
                    getFieldDecorator('dataset_name', {
                      initialValue: editObj ? editObj.dataset_name : '',
                      rules: [{ required: true, message: '请输入词表名称' }],
                    })(<Input style={{ width: 350 }} placeholder="请输入词表名称" />)
                  }
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span={24}>
                <FormItem
                  label="keys值"
                  className={styles.formItem}>
                  {getFieldDecorator('dataset_keys', {
                    initialValue: editObj ? editObj.dataset_keys.join(',') : '',
                    rules: [{ required: true, message: '请输入词表keys值' }],
                  })(<Input style={{ width: 350 }} placeholder="请输入词表keys值" />)}
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span={24}>
                <FormItem
                  label="选择项目"
                  className={styles.formItem}>
                  {getFieldDecorator('app_id', {
                    rules: [{ required: true, message: '请选择归属项目' }],
                    initialValue: editObj ? editObj.app_id : '',
                  })(
                    <Select key="project" onChange={this.handlePrin}
                      style={{ width: 350 }}
                      >
                      <Option key={0} value="">请选择项目</Option>
                      {
                        projects && projects.map((item) => (
                          <Option key={item.appid} value={item.appid}>{item.appname}</Option>
                        ))
                      }
                    </Select>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span={4} />
              <Col span={17} style={{ marginLeft: 40 }}>
                <Upload
                  key={editObj ? editObj.id : ''}
                  // name={fileUrl || editObj ? '替换词表文件' : '上传词表文件'}
                  name="上传词表文件"
                  fileSize={3}
                  onChange={(url) => this.setState({
                    fileUrl: url,
                  })}
                />
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span={4} />
              {!fileUrl && (
                <Col span={17} className="temp">
                  <a href={!editObj ? tempUrl : editObj.file_path} target="_blank" rel="noopener noreferrer">
                    <i className="iconfont icon-txt" />
                    {editObj ? '点这里下载之前上传的词表文件' : '不知道文件格式？下载模板看看。'}
                  </a>
                </Col>
              )}
            </Row>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddWordsModal);
