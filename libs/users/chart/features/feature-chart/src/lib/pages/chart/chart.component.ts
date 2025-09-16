import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Chart, registerables } from 'chart.js';

import { CHART_CONFIG } from '@users/chart/data-access-chart';

Chart.register(...registerables);

@Component({
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {
  ngOnInit(): void {
    new Chart('myChart', CHART_CONFIG);
  }
}
