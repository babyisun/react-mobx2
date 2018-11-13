import React from 'react';
import { observer } from 'mobx-react';
import { Form, Row, Col } from 'antd';
import styles from './FilterList.scss';

const FormItem = Form.Item;

@observer class FilterList extends React.Component {
  render() {
    const {
      form: { getFieldDecorator },
      fromData } = this.props;
    return (
      <div className={styles.FilterForm}>
        <Row gutter={24} justify="flex-start">
          {fromData && fromData.length && fromData.map((item, index) => (
            !item.postfix ? (
              <Col span={11} key={index}>
                <FormItem label={item.label}>
                  {
                  getFieldDecorator(item.value, { ...item.option })(item.el)
                }
                </FormItem>
              </Col>
            )
              : (
                <Col span={11} key={index}>
                  <Col span={20} key={index}>
                    <FormItem label={item.label}>
                      {
                        getFieldDecorator(item.value, { ...item.option })(item.el)
                        }
                    </FormItem>
                  </Col>
                  <Col span={2}>{item.postfix}</Col>
                </Col>
              )
          ))}
        </Row>
      </div>
    );
  }
}

export default FilterList;
