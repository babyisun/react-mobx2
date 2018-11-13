import React from 'react';
import { observer } from 'mobx-react';
import { Form, Row, Col } from 'antd';
import styles from './CaseFilter.scss';

const FormItem = Form.Item;

@observer class AddCaseModal extends React.Component {
  render() {
    const {
      form: { getFieldDecorator },
      fromData } = this.props;
    return (
      <div className={styles.FilterForm}>
        <Row gutter={24} justify="flex-start">
          {fromData && fromData.length && fromData.map((item, index) => (
            <Col span={11} key={index}>
              <FormItem label={item.label}>
                {
                  getFieldDecorator(item.value, { ...item.option })(item.el)
                }
              </FormItem>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default AddCaseModal;
