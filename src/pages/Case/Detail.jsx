import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Card, Row, Tooltip, Skeleton } from 'antd';
import Path from '@/components/Common/Path';
import ListHeader from '@/components/Common/ListHeader';
import CaseDetail from './components/CaseDetail';

@observer
class DetailCase extends Component {
  componentDidMount() {
    this.props.stores.case.loadDetail(this.props.match.params.id);
  }

  // 请求参数
  caseParam = (k, v) => [
    {
      label: 'Key',
      el: <span>{k}</span>,
    },
    {
      label: 'Value',
      el: <span>{v}</span>,
    },
  ]

  // 表单项
  caseInfo = () => [
    {
      label: '用例描述',
      el: <span>{this.props.stores.case.rowData.casename}</span>,
    },
    {
      label: '所属项目',
      el: <span>{this.props.stores.case.rowData.casename}</span>,
    },
    {
      label: '服务器名称或IP',
      el: <span>{this.props.stores.case.rowData.host}</span>,
    },
    {
      label: '端口号',
      el: <span>{this.props.stores.case.rowData.port}</span>,
    },
    {
      label: '路径',
      el: <span>{this.props.stores.case.rowData.path}</span>,
    },
    {
      label: '请求协议',
      el: <span>{this.props.stores.case.rowData.protocol}</span>,
    },
    {
      label: '请求方法',
      el: <span>{this.props.stores.case.rowData.method}</span>,
    },
    {
      label: '响应断言',
      el: <span>{this.props.stores.case.rowData.assertcontent}</span>,
    },
    {
      label: 'Cookie',
      el:
  <Tooltip title={this.props.stores.case.rowData.cookie} placement="bottomLeft">
    <span style={{
      cursor: 'pointer',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }}>
      {this.props.stores.case.rowData.cookie}
    </span>
  </Tooltip>,
    },
  ];

  render() {
    const { case: { rowData, detailLoading } } = this.props.stores;
    return (
      <div>
        <Path data={[{ name: '用例管理', path: '/Case' }, { name: '用例详情' }]} />
        <Card>
          <ListHeader title="用例详情" />
          <Row gutter={24} type="flex" justify="space-between" className="page-header">
            <Card title="1.用例信息" style={{ width: '100%' }}>
              <Skeleton loading={detailLoading} active>
                <CaseDetail
                  fromData={this.caseInfo()}
            />
              </Skeleton>
            </Card>
          </Row>
          <Row gutter={24} type="flex" justify="space-between" className="page-header">
            <Card title="2.请求参数" style={{ width: '100%' }}>

              {
              rowData.params
              && Object.entries(rowData.params).map(([k, v]) => v.dataset_key ? (
                <Skeleton loading={detailLoading} active key={k}>
                  <CaseDetail
                    key={k}
                    index={k}
                    fromData={this.caseParam(k, v.dataset_key)}
                />
                </Skeleton>
              ) : (
                <Skeleton loading={detailLoading} active key={k}>
                  <CaseDetail
                    key={k}
                    index={k}
                    fromData={this.caseParam(k, v.value)}
              />
                </Skeleton>
              ))
            }
            </Card>
          </Row>
        </Card>
      </div>
    );
  }
}

export default DetailCase;
