/* eslint-disable */
import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'
import { applyCurrencySign } from '../../../actions/zyFunc'
export default class PieChart extends Component {
  // constructor(props){
  //   super(props)
  // }

  getColor = (pos) => {
    const colorBank = ['#F34436', '#E81E64', '#9C26B7', '#5E29B8', '#3F51B4', '#04A9F3', '#009688', '#CCDB39', '#FEC007', '#795548']
    return colorBank[pos]
  }

  getGroupColor = (size) => {
    const tempArr = []
    for (let i = 0; i < size; i++) {
      tempArr.push(this.getColor(i))
    }
    return tempArr;
  }

  render() {
    const backgroundColorArr = this.getGroupColor(this.props.data.length)
    const data = {
      labels: this.props.labels,
      datasets: [{
        data: this.props.data,
        backgroundColor: backgroundColorArr,
        hoverBackgroundColor: backgroundColorArr
      }
      ],
      options: {
        legend: {
          position: 'left'
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              let total = 0;
              const index = tooltipItem.index
              const label = data.labels[index]
              const dataArr = data.datasets[0].data
              const currentVal = data.datasets[0].data[index]
              const currentOrder = this.props.order_count[index]
              for (let item of dataArr) {
                total += Number(item);
              }
              return `${label}: 金额:${applyCurrencySign()}${currentVal} / 订单数: ${currentOrder} (${((currentVal / total) * 100).toFixed(2)} %)`
            }

          }
        }
      }
    };

    return (
      <main style={{ width: '100%' }}>
        <Pie data={data} options={data.options} />
      </main>
    )
  }

}