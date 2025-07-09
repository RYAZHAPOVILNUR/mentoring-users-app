import { Chart } from 'chart.js';

export const CHART_DATA: Chart['config']['data'] = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
    },
  ],
};
