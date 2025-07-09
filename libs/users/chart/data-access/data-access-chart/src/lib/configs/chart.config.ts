import { Chart } from 'chart.js';

import { CHART_DATA } from '../constants/chart-data.constant';

export const CHART_CONFIG: Chart['config'] = {
  type: 'bar',
  data: CHART_DATA,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
