import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Card, Table, Input, Icon, Tooltip } from 'antd';
import { Launcher } from '@/components/Common/Launcher';
import ListHeader from '@/components/Common/ListHeader';
import Filter from '@/components/Common/Filter';
import WordsModal from './components/WordsModal';

@observer
class Words extends Component {
  componentDidMount() {
    // 加载数据
    this.props.stores.words.load();
    // 获取项目列表
    this.props.stores.words.loadProjects();

    this.props.stores.words.laodTemplete();
  }

  // 查询项
  fields = () => [
    {
      label: '词表名称',
      value: 'dataset_name',
      el: <Input placeholder="请输入词表名称" />,
    },
  ];

  columns = () => [{
    title: 'No.',
    dataIndex: 'id',
  }, {
    title: '词表名称',
    dataIndex: 'dataset_name',
  }, {
    title: '词表key值',
    dataIndex: 'dataset_keys',
    render: (text, row) => row.dataset_keys.map((val, key) => (
      <span key={key}>
        {val}
        {' '}
      </span>
    )),
  }, {
    title: '项目名称',
    dataIndex: 'app_name',
  }, {
    title: '操作',
    width: '10%',
    render: (text, row) => (
      <div>
        <Tooltip title="编辑">
          <Icon type="edit" onClick={() => this.props.stores.words.onEdit(row)} />
        </Tooltip>
      </div>
    ),
  }];

  render() {
    const { words: {
      onSearch,
      params,
      data,
      loadLoading,
      rowData,
      total,
      pagination,
      onPageChange,
      visible,
      setModalVisible,
      onSubmitCreate,
      projects,
      onSubmitEdit,
      url,
    } } = this.props.stores;
    console.log('url', url);
    return (
      <Card>
        <ListHeader title="词表管理" btnName="新增词表" onCreate={() => { setModalVisible(true); }} />
        <Filter
          fields={this.fields()}
          params={params}
          onSearch={onSearch} // 查询
        />
        <Table
          bordered
          columns={this.columns()}
          dataSource={data}
          loading={{ spinning: loadLoading, indicator: <Launcher small /> }}
          rowKey={row => row.id}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
            onChange: onPageChange,
            onShowSizeChange: onPageChange,
            current: pagination.page,
            pageSize: pagination.page_size,
            total,
          }}
        />
        <WordsModal
          editObj={rowData}
          visible={visible}
          tempUrl={url}
          setModalVisible={setModalVisible}
          projects={projects}
          onSubmit={rowData ? onSubmitEdit : onSubmitCreate}
        />
      </Card>
    );
  }
}

export default Words;
