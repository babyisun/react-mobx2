import React from 'react';
import { observer } from 'mobx-react';
import { Form, Row, Col } from 'antd';
// import styles from './DetailList.scss';

const FormItem = Form.Item;

@observer class AddCaseModal extends React.Component {
  render() {
    const {
      fromData } = this.props;
    return (
      <Form layout="inline">
        <div>
          <Row gutter={22} justify="center">
            {fromData && fromData.length && fromData.map((item, index) => (
              <Col span={6} key={index} offset={1}>
                <FormItem label={item.label}>
                  {
                    item.el
                  }
                </FormItem>
              </Col>
            ))}
          </Row>
        </div>
      </Form>
    );
  }
}

export default Form.create()(AddCaseModal);
