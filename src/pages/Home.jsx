import React from 'react';
import styles from './Home.scss';
// import heart from '@/assets/common/heart_dark.gif';

const Home = () => (
  <div className={styles.home}>
    <div className={styles.welcome}>
      <header>
        <h2 key="title">
          <i className={`iconfont icon-perf ${styles.heart}`} />
          {' '}
Performance
        </h2>
        <p key="desc">
          性能测试，从
          <span className="red">心</span>
开始
        </p>
      </header>
      {/* <div>
        <img className={styles.heart} src={heart} alt="heart" />

      </div> */}
      <div className={styles.img} />
    </div>
  </div>
);

export default Home;
