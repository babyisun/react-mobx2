import React from 'react';
import { observer } from 'mobx-react';
import { Form, Row, Col, Icon } from 'antd';
import styles from './CaseParam.scss';

const FormItem = Form.Item;

@observer class AddCaseModal extends React.Component {
  render() {
    const {
      form: { getFieldDecorator },
      fromData,
      deleteCaseRequest,
      index: i } = this.props;
    return (
      <div className={styles.FilterForm}>
        <Row gutter={24} justify="flex-start" className="param">
          {fromData && fromData.length && fromData.map((item, index) => (
            <Col span={5} key={index}>
              <FormItem label={item.label}>
                {
                    getFieldDecorator(`${item.value}${i}`, { ...item.option })(item.el)
                  }
              </FormItem>
            </Col>
          ))}
          <Col span={4}>
            <Icon type="close-circle" theme="filled"
              style={{ verticalAlign: '-0.9em', cursor: 'pointer' }} onClick={() => deleteCaseRequest(i)} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddCaseModal;
