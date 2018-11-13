import React, { Component } from 'react';
import { Button, Form, Row, Col } from 'antd';
import styles from './Filter.scss';

/*
* Form
* @param {object} form - Form.create() 注入的 `form` 对象
* @param {array} fields - 表单组件集合
* @param {object} formParams - 格式化表单数据
* @param {function} onSearch - 根据筛选项查询
* @param {function} onExport - 根据筛选项导出
*
*/
const FormItem = Form.Item;

class Filter extends Component {
  // 表单提交
  onSubmit = (e) => {
    e.preventDefault();
    const { form: { validateFields }, onSearch } = this.props;

    validateFields((err, values) => {
      if (!err) {
        onSearch(values);
      }
    });
  }

  render() {
    const {
      fields,
      form,
    } = this.props;

    const { getFieldDecorator } = form;
    return (
      <div>
        <Form
          className={styles.FilterForm}
          onSubmit={(e) => this.onSubmit(e, 'onSearch')}
        >
          <Row gutter={24} justify="center">
            {fields && fields.length && fields.map((item, index) => (
              <Col span={6} key={index}>
                <FormItem label={item.label}>
                  {
                    getFieldDecorator(item.value, { ...item.option })(item.el)
                  }
                </FormItem>
              </Col>
            ))}
            <Col className="FilterFormBtn">
              <FormItem>
                <Button type="primary" htmlType="submit" icon="search" label="&nbsp;">
                  搜索
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
        {/* <Divider /> */}
      </div>
    );
  }
}

export default Form.create()(Filter);
