import React, { Component } from 'react';
import HeaderBar from '../HeaderBar';
import DailyLineAmountPanel from './DailyLineAmountPanel'
import DailyLineOrderPanel from './DailyLineOrderPanel'
import MonthlyLineAmountPanel from './MonthlyLineAmountPanel'
import MonthlyLineOrderPanel from './MonthlyLineOrderPanel'
import PieChart from './Pie';
import HistoryDisplay from './HistoryDisplay';
import { HeaderTitle, Loader } from '../../reusables/index';
import moment from 'moment';
import { connect } from 'react-redux';
import { getPieData, getDailyData, getMonthlyData, getLastThirtyData, getDailyOrderData, getMonthlyOrderData, getLastThirtyOrderData } from '../../actions/dataAnalysis.action';
import { convertIntegerToString } from '../../actions/zyFunc';
import Radium from 'radium'

class DataAnalysis extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  getMonthlyData = async (currentMonth) => {
    try {
      await this.setState({ loading: true })
      await this.props.dispatch(getMonthlyData(currentMonth))
    } catch (err) {
      alert(err.message || err)
    }
    this.setState({ loading: false })
  }

  getLastThirtyData = async () => {
    try {
      await this.setState({ loading: true })
      await this.props.dispatch(getLastThirtyData())
    } catch (err) {
      alert(err.message || err)
    }
    this.setState({ loading: false })
  }

  getMonthlyOrderData = async (currentMonth) => {
    try {
      await this.setState({ loading: true })
      await this.props.dispatch(getMonthlyOrderData(currentMonth))
    } catch (err) {
      alert(err.message || err)
    }
    this.setState({ loading: false })
  }

  getLastThirtyOrderData = async () => {
    try {
      await this.setState({ loading: true })
      await this.props.dispatch(getLastThirtyOrderData())
    } catch (err) {
      alert(err.message || err)
    }
    this.setState({ loading: false })
  }

  changeAmountMonth = async (currentMonth) => {
    try {
      await this.setState({ loading: true })
      await this.props.dispatch(getMonthlyData(currentMonth))
    } catch (err) {
      alert(err.message || err)
    }
    this.setState({ loading: false })
  }

  changeOrderMonth = async (currentMonth) => {
    try {
      await this.setState({ loading: true })
      await this.props.dispatch(getMonthlyOrderData(currentMonth))
    } catch (err) {
      alert(err.message || err)
    }
    this.setState({ loading: false })
  }

  handleDateChange = async (date) => {
    const currentDate = moment(date || Date.now()).format('YYYY-MM-DD')
    try {
      await this.setState({ loading: true })
      await this.props.dispatch(getDailyData(currentDate))
    } catch (err) {
      console.log(err)
      alert(err.message || err)
    }
    this.setState({ loading: false })
  }

  handleOrderDateChange = async (date) => {
    const currentDate = moment(date || Date.now()).format('YYYY-MM-DD')
    try {
      await this.setState({ loading: true })
      await this.props.dispatch(getDailyOrderData(currentDate))
    } catch (err) {
      console.log(err)
      alert(err.message || err)
    }
    await this.setState({ loading: false })
  }

  async componentDidMount() {
    try {
      await this.setState({ loading: true })
      await Promise.all([
        this.props.dispatch(getPieData()),
        this.props.dispatch(getDailyData()),
        this.props.dispatch(getMonthlyData()),
        this.props.dispatch(getDailyOrderData()),
        this.props.dispatch(getMonthlyOrderData())
      ])
    } catch (err) {
      alert(err)
    }
    this.setState({ loading: false })
  }

  render() {
    const pie_total_count = this.props.pie_data.total_count.reduce((acc, curr) => {
      acc += curr
      return acc
    }, 0)
    //some change

    return (
      <main>
        <HeaderBar />
        {this.state.loading && <Loader location={window.location} />}
        {/*  ===================================    总汇总 =========================== */}
        <section className="container-fluid mt-4">

          <section className="row m-1" style={styles.shadow}>
            <div className="col-12 p-0">
              <HeaderTitle headerTitle={'总存款'} />
            </div>
            {/* ============   Pie container */}
            <div className="col-sm-12 col-md-6 p-2 d-flex align-items-center justify-content-center">
              <PieChart
                labels={this.props.pie_data.labels}
                data={this.props.pie_data.total_deposits}
                order_count={this.props.pie_data.total_count}
              />
            </div>
            {/* =============   Display history data */}
            <div className="col-sm-12 col-md-6  p-1 pl-4">
              <HistoryDisplay total_deposit={this.props.total_deposit} total_withdraw={this.props.total_withdraw} total_order={pie_total_count} />
            </div>
          </section>

          <div className="row p-2">
            {/*  ===================================    日汇总 =========================== */}
            <div className="col-sm-12 col-lg-6 mt-4 pr-3">
              <DailyLineAmountPanel
                daily_data={this.props.daily_data}
                past_data={this.props.past_data}
                handleDateChange={this.handleDateChange}
              />
            </div>
            {/*  ===================================    月汇总 =========================== */}
            <div className="col-sm-12 col-lg-6 mt-4 pl-3" >
              <MonthlyLineAmountPanel
                monthly_data={this.props.monthly_data}
                past_data={this.props.past_data}
                getMonthlyData={this.getMonthlyData}
                getLastThirtyData={this.getLastThirtyData}
                changeMonth={this.changeAmountMonth}
              />
            </div>
          </div>

          <div className="row p-2">
            {/*  ===================================    日订单汇总 =========================== */}
            <div className="col-sm-12 col-lg-6 mt-4 pr-3">
              <DailyLineOrderPanel
                daily_order_data={this.props.daily_order_data}
                past_data={this.props.past_data}
                handleOrderDateChange={this.handleOrderDateChange}
              />
            </div>
            {/*  ===================================    月订单汇总 =========================== */}
            <div className="col-sm-12 col-lg-6 mt-4 pl-3" >
              <MonthlyLineOrderPanel
                monthly_order_data={this.props.monthly_order_data}
                past_data={this.props.past_data}
                getMonthlyData={this.getMonthlyOrderData}
                getLastThirtyData={this.getLastThirtyOrderData}
                changeMonth={this.changeOrderMonth}
              />
            </div>
          </div>
        </section>
      </main >
    )
  }
}

const mapStateToProps = state => {
  const { balance_info } = state.captainReducer
  const total_deposit = convertIntegerToString(balance_info.total_deposit)
  const total_withdraw = convertIntegerToString(balance_info.total_withdraw)
  return {
    pie_data: state.dataAnalysisReducer.pie_data,
    daily_data: state.dataAnalysisReducer.daily_data,
    monthly_data: state.dataAnalysisReducer.monthly_data,
    daily_total: state.dataAnalysisReducer.daily_data.total,
    monthly_total: state.dataAnalysisReducer.monthly_data.total,
    past_data: state.dataAnalysisReducer.past_data,
    daily_order_data: state.dataAnalysisReducer.daily_order_data,
    daily_total_count: state.dataAnalysisReducer.daily_order_data.total_count,
    monthly_order_data: state.dataAnalysisReducer.monthly_order_data,
    monthly_total_count: state.dataAnalysisReducer.monthly_order_data.total_count,
    total_deposit,
    total_withdraw
  }
}

export default Radium(connect(mapStateToProps)(DataAnalysis))

const styles = {
  shadow: {
    boxShadow: '0 1px 1px 0 grey'
  },
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

