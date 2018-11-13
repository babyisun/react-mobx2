import React from 'react';
import { Row, Col, Button } from 'antd';
import styles from './Description.scss';

const responsive = {
  1: { xs: 24 },
  2: { xs: 24, sm: 12 },
  3: { xs: 24, sm: 12, md: 8 },
  4: { xs: 24, sm: 12, md: 6 },
};
const styleTitle = {
  style: { display: 'flex', justifyContent: 'space-between' },
};
const Description = ({
  term,
  column,
  children,
  ...restProps
}) => (
  <Col {...responsive[column]} {...restProps}>
    {term && <div className={styles.term}>{term}</div>}
    {children !== null
        && children !== undefined && <div className={styles.detail}>{children}</div>}
  </Col>
);

const DescriptionList = ({
  children,
  col = 3,
  title,
  gutter = 32,
  handleCloseWork,
  hasBtn,
  ...restProps
}) => {
  const column = col > 4 ? 4 : col;
  return (
    <div className={styles.descriptionList} {...restProps}>
      {title ? (
        <h2 className={styles.title} {...styleTitle}>
          {title}
          {hasBtn && <Button type="primary" onClick={handleCloseWork}>停止任务</Button>}
        </h2>
      ) : null}
      <Row gutter={gutter}>
        {React.Children.map(
          children,
          child => (child ? React.cloneElement(child, { column }) : child),
        )}
      </Row>
    </div>
  );
};

DescriptionList.Description = Description;
export default DescriptionList;
