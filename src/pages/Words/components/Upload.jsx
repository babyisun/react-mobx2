// 上传图片组件
// 入参
/*
onChange: func,返回选中的图片标签
name：str,显示在上传框里的名称
fileSize：int, 文件大小约束
*/
import React, { Component } from 'react';
import { Upload, message, Icon } from 'antd';

const { Dragger } = Upload;

export default class UpLoad extends Component {
  state = {
    fileList: [],
  }

  params = {
    name: 'file',
    action: '/sfanalyzer/dataset/upload',
    headers: {
      authorization: 'authorization-text',
    },
    // showUploadList: false,
    beforeUpload: this.beforeUpload,
    onChange: (info) => {
      let { fileList } = info;
      fileList = fileList.slice(-1);
      if (info.file.status === 'done' || fileList.length === 0) {
        const { file: { response: { data: { url } } } } = info;
        this.props.onChange(fileList.length === 0 ? '' : url);
      }
      this.setState({ fileList });
    },
  }

  // 上传文件前做下校验
  beforeUpload = ({ size = 0 } = {}) => {
    const { fileSize } = this.props;
    if (fileSize && size) {
      // 若限制字段存在，判断文件大小是否大于limit，是则做相应处理
      if (size / 1024 / 1024 > fileSize) {
        message.error(`上传文件大小不超过${fileSize}MB!`);
        return false;
      }
    }
    return true;
  };

  render() {
    const { name } = this.props;
    return (
      <Dragger {...this.params} fileList={this.state.fileList}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">{name || '上传文件'}</p>
        <p className="ant-upload-hint">点击选择或拖拽(cvs)文件到此区域进行上传</p>
      </Dragger>
    );
  }
}
