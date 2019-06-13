/* eslint-disable */
import React from 'react'
const REACT_APP_CURRENCY_TOKEN = process.env.REACT_APP_CURRENCY_TOKEN
export default function HistoryDisplay(props) {

  return (
    <main className="row ml-md-4">
      <section className="col-12 p-4 ">
        <div className="pb-2">历史总存款： </div>
        <h1 className="mt-2"> {REACT_APP_CURRENCY_TOKEN === '91ed6e70b744744b83b19337b9bc55b3' ? '¥' : '$'} {props.total_deposit}</h1>
      </section>

      <section className="col-12 p-4 ">
        <div className="pb-2">历史总下发： </div>
        <h1 className="mt-2"> {REACT_APP_CURRENCY_TOKEN === '91ed6e70b744744b83b19337b9bc55b3' ? '¥' : '$'} {props.total_withdraw}</h1>
      </section>

      <section className="col-12 p-4 ">
        <div className="pb-2">历史总订单： </div>
        <h1 className="mt-2">{props.total_order}</h1>
      </section>
    </main>
  )
}