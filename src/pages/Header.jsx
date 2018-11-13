import React from 'react';
import { Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
// import ajax from '@/utils/ajax';
import styles from './Header.scss';

@inject('baseStore')
@observer
class Header extends React.Component {

    onExit = () => { 
      const url = "https://uuap.sftcwl.com/ucenter/userlogin?redirect_url=REPLACEHOST";
      const redirectUrl = url.replace('REPLACEHOST',
            encodeURIComponent(`${window.location.origin}/`));
         return window.location.replace(redirectUrl);
    };
    getLogoClass = (collapsed, { logo, dark, darkSmall }) => `${logo} ${!collapsed ? dark : darkSmall}`;


    render() {
      const { collapsed, baseStore } = this.props;
      return (
        <Layout.Header className={styles.header}>
          <h1 className={this.getLogoClass(collapsed, styles)}>
            <NavLink to="/">
                Perfomance
            </NavLink>
          </h1>
          <div className={styles.info}>

            <div className={styles.name}>
              <span>
欢迎你，
                {baseStore.user && baseStore.user.name}
              </span>
              <i className="iconfont icon-exit" onClick={this.onExit} title="重新登录" />
            </div>
          </div>
        </Layout.Header>
      );
    }
}

export default Header;
