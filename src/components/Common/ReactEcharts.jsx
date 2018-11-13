import React from 'react';
import echarts from 'echarts';
import EchartsForReact from 'echarts-for-react';

echarts.registerTheme('shine', {
  color: [
    '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
    '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
    '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
    '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089',
  ],
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, .6)',
    padding: [6, 12],
    textStyle: {
      fontSize: 12,
    },
    extraCssText: 'border-radius: 2px; line-height: 1.7;',
  },
});

const ReactEcharts = props => (
  <EchartsForReact
    {...props}
    theme="shine"
  />
);

export default ReactEcharts;
