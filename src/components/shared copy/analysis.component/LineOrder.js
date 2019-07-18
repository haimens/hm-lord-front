/* eslint-disable */
import React from 'react';
import { Line } from 'react-chartjs-2';
import { getBalance } from '../../../actions/zyFunc'

export default class LineChart extends React.Component {

  getColor = (pos) => {
    const colorBank = ['#00B700', '#00AAEE', '#DB2529']
    return colorBank[pos]
  }

  formatLineData() {
    const mData = this.props.dailyData || this.props.monthlyData
    const datasets =
      [{
        data: mData.result_list,
        label: "Prime and Fibonacci",
        fill: false,
        lineTension: 0.0,
        backgroundColor: this.getColor(0),
        borderColor: this.getColor(1),
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: this.getColor(2),
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10
      }
      ]

    // are they display in utc date or local date
    return {
      labels: mData.hour || mData.day,
      datasets
    }
  }

  render() {

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: this.props.xLabel || 'time'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: this.props.yLabel || 'value'
          },

        }]
      },

      layout: {
        padding: {
          left: 50,
          right: 50,
          top: 0,
          bottom: 0
        }
      }

    }





    return (
      <div className='chartjs-render-monitor-change'>
        <Line data={this.formatLineData()} pointBorderWidth={'100px'} options={options} />
      </div>
    );
  }
}

