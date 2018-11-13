import React from 'react';
import { Layout, Menu } from 'antd';
import { withRouter, NavLink } from 'react-router-dom';
import router from '../router';
import styles from './Sider.scss';

const { SubMenu, Item } = Menu;

class Sider extends React.Component {
  render() {
    const { collapsed, onCollapse/* , location: { pathname }  */ } = this.props;
    // const path = pathname.split('/');
    // const defaultOpen = path.length > 1 ? path[1] : '';
    return (
      <Layout.Sider className={styles.sider} width={210} collapsible
        collapsed={collapsed} onCollapse={onCollapse}>
        <Menu theme="dark" mode="inline">
          {
            router.map(item => !item.children || !item.showChildren
              ? (
                <Item key={item.path} className={item.path.slice(1)}>
                  <div>
                    <span>
                      <NavLink to={item.path} activeClassName="active">
                        {/* <Icon type={item.icon} /> */}
                        <i className={`iconfont icon-${item.icon}`} />
                        <span>{item.name}</span>
                      </NavLink>
                    </span>
                  </div>
                </Item>
              )
              : (
                <SubMenu key={item.path} className={item.path.slice(1)}
                  title={(
                    <span>
                      {/* <Icon type={item.icon} /> */}
                      <i className={`iconfont icon-${item.icon}`} />
                      <span>
                        {item.name}
                      </span>
                    </span>)}>
                  {
                    item.children.map(e => (
                      <Item key={e.path}>
                        <NavLink to={e.path} activeClassName="active">
                          {e.name}
                        </NavLink>
                      </Item>
                    ))
                  }
                </SubMenu>
              ))
          }
        </Menu>
      </Layout.Sider>
    );
  }
}

export default withRouter(Sider);
