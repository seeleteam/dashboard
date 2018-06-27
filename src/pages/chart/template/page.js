import React from 'react'
import { Select } from 'antd'
import { connect } from 'dva'
import { Page } from 'components'
import MetricsComponent from './MetricsComponent'
import styles from './page.less'
import { METRICS_PATH } from './const'

const Option = Select.Option

class Chart extends React.Component {
  constructor () {
    super()
    this.state = {
    }
  }
  changeStatTimeRange (key) {
    var pMetricsName = `${this.props.dashboard.metricsName}`
    var pMetricsTag = pMetricsName.substring(pMetricsName.lastIndexOf(".") + 1)
    var pMetricsSelectName = "value"
    switch (pMetricsTag) {
      case "count":
      case "gauge":
        pMetricsSelectName = "value"
        break
      case "histogram":
      case "meter":
      case "timer":
        pMetricsSelectName = "count"
        break
      default:
        pMetricsSelectName = "value"
    }
    this.props.getMetricsData({
      precision: 'ms',
      sql: `SELECT last("${pMetricsSelectName}") FROM "${pMetricsName}" WHERE time >= now() - (${key}) GROUP BY time(10s), "coinbase", "networkid", "nodename" fill(null)`,
    })
  }
  render () {
    return (<Page inner>
       <Select
        onChange={this.changeStatTimeRange.bind(this)}
        defaultValue={['15m']}
      >
        <Option key={'15m'}>15m</Option>
        <Option key={'30m'}>30m</Option>
        <Option key={'1h'}>1h</Option>
        <Option key={'1d'}>1d</Option>
        <Option key={'7d'}>7d</Option>    
        <Option key={'1y'}>1y</Option>                              
      </Select>
      <div className={styles.chart}>
        <MetricsComponent />
      </div>
    </Page>)
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMetricsData (payload) {
      dispatch({ type: METRICS_PATH, payload })
    },   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
