import React, { Component } from 'react'
import LineChart from './Line'
import { applyCurrencySign, calculatePercentage } from '../../../actions/zyFunc'
import moment from 'moment'
import Button from '../../../components/shared/Button';

export default class MonthlyLineOrderPanel extends Component {
  constructor(props) {
    super(props)
    this.year = (new Date()).getFullYear()
    this.month = (new Date()).getMonth() + 1
    this.state = {
      activeOrderTab: 0,
      activeOptionTab: 0,
      monthTab: {
        currentMonth: `${this.year} ${this.month}`
      }
    }


  }

  optionSwitch = async (tab) => {
    await this.setState({ ...this.state, activeTab: tab })
    if (tab === 1) {
      this.props.getMonthlyData(this.state.monthTab.currentMonth)
    } else if ((tab === 2)) {
      //TODO: Switch Tag
    }
    else if ((tab === 3)) {
      //TODO: Switch Tag
    }
    else {
      this.props.getLastThirtyData()
    }
  }

  monthSwitch = async (tab) => {
    await this.setState({ ...this.state, activeTab: tab })
    if (tab === 1) {
      //TODO: Selection Month
    } else {

    }
  }

  readCompare = (current_data = 0, past_data = 0) => {
    const { isIncreased, percentage } = calculatePercentage(current_data, past_data)
    return isIncreased >= 0
      ? <span style={styles.green}> + {Number(current_data) === 0 ? 0 : percentage} % ↑</span>
      : <span style={styles.red}> - {Number(current_data) === 0 ? 0 : percentage} % ↓</span>
  }

  changeMonth = async (e) => {
    e.preventDefault()
    const currentMonth = e.target.value;
    await this.setState({ ...this.state, monthTab: { currentMonth: currentMonth } });
    this.props.changeMonth(currentMonth)
  }

  render() {
    const utcDate = moment().utc().set({ h: 0, m: 0, s: 0 })
    const localClearingDate = moment(utcDate).local().format('HH:mm:ss')
    return (
      <div style={styles.shadow} className="bg-white shadow-sm">
        <div className={'container-fluid'}>
          <section className="row p-3 border-bottom">
            <div className="d-flex col-12  flex-sm-row flex-column mb-sm-0 justify-content-sm-between  mb-5 ">
              <div className="d-flex flex-row m-0 col-12 p-0 col-sm-9" >
                <div className="mr-3">{this.state.activeOrderTab === 0 ? '本月总订单 : ' : '前30天订单 : '}<span>{this.props.monthly_order_data.total_count}</span> {applyCurrencySign('笔')}</div>
                {this.state.activeOrderTab === 0 && <div className="ml-3">与上月相比 : {this.readCompare(this.props.monthly_order_data.total_count, this.props.past_data.monthly_total_count)}</div>}
              </div>
              <div className="d-flex input-group col-sm-3 col-12 p-0 ">
                {this.state.activeOrderTab === 0 && <select onChange={(e) => this.changeMonth(e)} className="form-control" value={this.state.monthTab.currentMonth}>
                  <option value={`${this.year} 1`}>一月</option>
                  <option value={`${this.year} 2`}>二月</option>
                  <option value={`${this.year} 3`}>三月</option>
                  <option value={`${this.year} 4`}>四月</option>
                  <option value={`${this.year} 5`}>五月</option>
                  <option value={`${this.year} 6`}>六月</option>
                  <option value={`${this.year} 7`}>七月</option>
                  <option value={`${this.year} 8`}>八月</option>
                  <option value={`${this.year} 9`}>九月</option>
                  <option value={`${this.year} 10`}>十月</option>
                  <option value={`${this.year} 11`}>十一月</option>
                  <option value={`${this.year} 12`}>十二月</option>
                </select>}
              </div>
            </div>

            <div className="col-md-12 col-sm-12 d-flex flex-column flex-sm-row justify-content-between  ">
              <div>
                <Button label="全部" className={this.state.activeOrderTab === 0 ? 'mr-bg-green text-white' : 'mr-button-purple mr-purple-text'} onClick={() => this.optionSwitch(0)} />
                <Button label="微信支付" className={this.state.activeOrderTab === 1 ? 'mr-bg-green text-white' : 'mr-button-purple mr-purple-text'} onClick={() => this.optionSwitch(1)} />
                <Button label="支付宝" className={this.state.activeOrderTab === 2 ? 'mr-bg-green text-white' : 'mr-button-purple mr-purple-text'} onClick={() => this.optionSwitch(2)} />
                <Button label="QQ钱包" className={this.state.activeOrderTab === 3 ? 'mr-bg-green text-white' : 'mr-button-purple mr-purple-text'} onClick={() => this.optionSwitch(3)} />
              </div>
              <div>
                <Button label="当月" className={this.state.activeOptionTab === 0 ? 'mr-bg-green text-white' : 'mr-button-purple mr-purple-text'} onClick={() => this.monthSwitch(0)} />
                <Button label="前30天" className={this.state.activeOptionTab === 1 ? 'mr-bg-green text-white' : 'mr-button-purple mr-purple-text'} onClick={() => this.monthSwitch(1)} />
              </div>
            </div>
          </section>
        </div>
        <section className="row p-1">
          <div className="col-12 order-3">
            <LineChart notAmount={true} monthlyData={this.props.monthly_order_data} xLabel={`日期(格林威治时间)  每日本地结算时间为 ${localClearingDate}`} yLabel={`订单数 (${applyCurrencySign('笔')})`} />
          </div>
        </section>
      </div>
    )
  }
}

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  select: {
    marginLeft: '10px'
  },
  green: {
    color: '#33ad00'
  },
  red: {
    color: '#d0021b'
  }

}