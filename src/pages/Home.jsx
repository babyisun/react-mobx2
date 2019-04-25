import React from 'react';
// import { Filter } from 'ant-forest';
// import af from 'ant-forest';

import styles from './Home.scss';

const Home = () => (
  <div className={styles.home}>
    <div className={styles.welcome}>
      <header>
        <h2 key="title">这是一个主页</h2>
        <p key="desc">主页是一个无状态组件</p>
      </header>
      {/* <Filter
        options={[
          { label: '分类1', value: '1' },
          { label: '分类2', value: '2' },
          { label: '分类3', value: '3' },
        ]}
      />
      <Filter
        options={[
          { label: '分类1', value: '1' },
          { label: '分类2', value: '2' },
          { label: '分类3', value: '3' },
        ]}
        defaultValue={['2', '3']}
        multiple
      /> */}
      <div className={styles.img} />
    </div>
  </div>
);

export default Home;
