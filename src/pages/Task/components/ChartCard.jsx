import React, { PureComponent } from 'react';
import { Card } from 'antd';
import styles from './ChartCard.scss';

class ChartCard extends PureComponent {
  renderMain = () => {
    const { contentHeight, footer, children, loading } = this.props;
    if (loading) {
      return false;
    }
    return (
      <div className={styles.chartCard}>
        {children && (
          <div className={styles.content} style={{ height: contentHeight || 'auto' }}>
            <div className={contentHeight && styles.contentFixed}>{children}</div>
          </div>
        )}
        {footer && (
          <div className={styles.footer}>{footer}</div>
        )}
      </div>
    );
  }

  render() {
    const {
      loading = false,
      children,
      footer,
      contentHeight,
      ...rest
    } = this.props;
    return (
      <Card loading={loading} bodyStyle={{ padding: '20px 10px 0' }} {...rest}>
        {this.renderMain()}
      </Card>
    );
  }
}

export default ChartCard;
