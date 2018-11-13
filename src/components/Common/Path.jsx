import React from 'react';
import { NavLink } from 'react-router-dom';
// import { router } from '@/router';
import { Breadcrumb } from 'antd';
import styles from './Path.scss';

/**
 * Path - 面包屑导航组件
 * @param {object} data - 导航数据源 e.g. [{ name: '首页', path: '/'}, { name: '关于'}]
 */
const Path = ({ data }) => data.length > 0 && (
<Breadcrumb className={styles.path}>
  {
        data.map(({ name, path }, i) => (
          <Breadcrumb.Item key={i}>
            {path === undefined ? name : <NavLink to={path}>{name}</NavLink>}
          </Breadcrumb.Item>
        ))
      }
</Breadcrumb>
);

export default Path;
