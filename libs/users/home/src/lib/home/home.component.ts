import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
// @ts-ignore
import Highcharts from 'highcharts'
import { HighchartsChartModule } from "highcharts-angular";

@Component({
  selector: 'users-home',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    HighchartsChartModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: "spline"
    },
    credits: {
      enabled: false
    },
    title: {
      text: "Осваивание нового функционала в Angular"
    },
    subtitle: {
      text: "Основные и новые технологии"
    },
    xAxis:{
      categories:["first week", "sec week", "third week", "4 week", "5 week", "6 week",
        "7 week", "8 week", "9 week", "10 week", "11 week", "12 week"]
    },
    yAxis: {
      title:{
        text:"Hard skills"
      }
    },
    tooltip: {
      valueSuffix:""
    },
    series: [{
      name: 'Intern',
      data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 25.5, 25.6, 25.8, 26.1, 26.4]
    },
      {
      name: 'Junior',
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 25.5, 25.7, 25.8, 26.3, 26.4]
    },
      {
        name: 'Middle',
        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 25.5, 25.6, 25.8, 26.2, 26.4]
      },
      {
        name: 'Middle+',
        data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 25.5, 25.5, 25.8, 26, 26.4]
      }]
  }

  pieChartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    credits: {
      enabled: false
    },
    title: {
      text: 'Уровень наших студентов на момент начало обучения'
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Level',
      colorByPoint: true,
      data: [{
        name: 'Intern',
        y: 4.67
      }, {
        name: 'Junior',
        y: 61.41
      }, {
        name: 'Middle',
        y: 11.84
      }, {
        name: 'Middle+',
        y: 10.85
      }]
    }]
  }

}
