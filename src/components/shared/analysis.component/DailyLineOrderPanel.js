import React, { Component } from 'react'
import LineChart from './Line'
import { applyCurrencySign, calculatePercentage } from '../../../actions/zyFunc'
import moment from 'moment'
import Button from '../../../components/shared/Button';
export default class DailyLineOrderPanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0,
      dailyTab: {
        currentDate: moment().format('YYYY-MM-DD')
      },
    }
  }


  daySwitch = async (tab) => {
    await this.setState({ ...this.state, activeTab: tab })
    if (tab === 1) {
      this.setState({ activeOrderTab: tab })
    } else if ((tab === 2)) {
      this.setState({ activeOrderTab: tab })
    }
    else if ((tab === 3)) {
      this.setState({ activeOrderTab: tab })
    }
    else {
      this.setState({ activeOrderTab: tab })
    }
  }

  readCompare = (current_data = 0, past_data = 0) => {
    const { isIncreased, percentage } = calculatePercentage(current_data, past_data)
    return isIncreased >= 0
      ? <span style={styles.green}> + {Number(current_data) === 0 ? 0 : percentage} % ↑</span>
      : <span style={styles.red}> - {Number(current_data) === 0 ? 0 : percentage} % ↓</span>
  }


  handleDateChange = async (e) => {
    e.preventDefault()
    const currentDate = moment(e.target.value || Date.now()).format('YYYY-MM-DD')
    await this.setState({ dailyTab: { currentDate } })
    this.props.handleDailyDateChange(currentDate)
  }

  render() {
    return (
      <div style={styles.shadow} className="bg-white shadow-sm">
        <div className={'container-fluid'}>
          <section className="row p-3 border-bottom">
            <div className="d-flex col-12  flex-sm-row flex-column mb-sm-0 justify-content-sm-between  mb-5 ">
              <div className="d-flex flex-row m-0 col-12 p-0 col-sm-9" >
                <div className="mr-3">本日总订单 : <span>{this.props.daily_order_data.total_count}</span> {applyCurrencySign(' 笔')}</div>
                <div className="ml-3">与昨日相比 : {this.readCompare(this.props.daily_order_data.total_count, this.props.past_data.daily_total_count)}</div>
              </div>
              <div className="d-flex input-group col-sm-3 col-12 p-0 ">
                <input type="date" className="form-control" value={this.state.dailyTab.currentDate} onChange={this.handleDateChange} max={moment().format('YYYY-MM-DD')}></input>
              </div>
            </div>

            <div className="col-md-12 col-sm-12 d-flex justify-content-between ">
              <div>
                <Button label="全部" className={this.state.activeTab === 0 ? 'mr-bg-green text-white' : 'mr-button-purple mr-purple-text'} onClick={() => this.daySwitch(0)} />
                <Button label="微信支付" className={this.state.activeTab === 1 ? 'mr-bg-green text-white' : 'mr-button-purple mr-purple-text'} onClick={() => this.daySwitch(1)} />
                <Button label="支付宝" className={this.state.activeTab === 2 ? 'mr-bg-green text-white' : 'mr-button-purple mr-purple-text'} onClick={() => this.daySwitch(2)} />
                <Button label="QQ钱包" className={this.state.activeTab === 3 ? 'mr-bg-green text-white' : 'mr-button-purple mr-purple-text'} onClick={() => this.daySwitch(3)} />
              </div>
            </div>
          </section>
        </div>
        <section className="row p-1">
          <div className="col-12">
            <LineChart
              notAmount={true}
              dailyData={this.props.daily_order_data} xLabel={'时间（小时）'} yLabel={`订单数 (${applyCurrencySign()})`} />
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
