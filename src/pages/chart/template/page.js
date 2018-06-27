import React from 'react'
import { Select, Row, Col } from 'antd'
import { connect } from 'dva'
import { Page } from 'components'
import MetricsComponent from './MetricsComponent'
import styles from './page.less'
import { METRICS_PATH } from './const'
import { metricsName } from '../../../utils/metricsName'

const Option = Select.Option

class Chart extends React.Component {
  constructor () {
    super()
    this.state = {
      optionsArray: [],
    }
  }
  componentDidMount () {
    var pMetricsName = `${this.props.dashboard.metricsName}`
    console.log(this.props.dashboard.metricsSelectName, 'metricsSelectName')
    console.log(this.props.dashboard.metricsSelectTime, 'metricsSelectTime')
    var pMetricsTag = pMetricsName.substring(pMetricsName.lastIndexOf(".") + 1)
    switch (pMetricsTag) {
      case "count":
        this.setState({
          optionsArray: metricsName.count,
        })
        break
      case "gauge":
        this.setState({
          optionsArray: metricsName.gauge,
        })
        break
      case "histogram":
        this.setState({
          optionsArray: metricsName.histogram,
        })
        break
      case "meter":
        this.setState({
          optionsArray: metricsName.meter,
        })
        break
      case "timer":
        this.setState({
          optionsArray: metricsName.timer,
        })
        break
      default:
    }
  }
  changeStatTimeRange (key) {
    this.props.getMetricsSelectTime(key)
    var pMetricsName = `${this.props.dashboard.metricsName}`
    var pMetricsSelectName = `${this.props.dashboard.metricsSelectName}`
    this.props.getMetricsData({
      precision: 'ms',
      sql: `SELECT last("${pMetricsSelectName}") FROM "${pMetricsName}" WHERE time >= now() - (${key}) GROUP BY time(10s), "coinbase", "networkid", "nodename" fill(null)`,
    })
  }
  changeMetricsName (key) {
    this.props.getMetricsSelectName(key)
    var pMetricsName = `${this.props.dashboard.metricsName}`
    var pmetricsSelectTime = `${this.props.dashboard.metricsSelectTime}`
    this.props.getMetricsData({
      precision: 'ms',
      sql: `SELECT last("${key}") FROM "${pMetricsName}" WHERE time >= now() - (${pmetricsSelectTime}) GROUP BY time(10s), "coinbase", "networkid", "nodename" fill(null)`,
    })
  }
  render () {
    return (<Page inner>
      <Row gutter={24}>
        <Col lg={4} md={24}>
          <Col style={{ marginTop: 10 }}>
            <span style={{ fontWeight: 500 }}>Last Time: </span>
            <Select
              style={{ width: 120 }} 
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
          </Col>
        </Col> 
        <Col lg={4} md={24}>
          <Col style={{ marginTop: 10 }}>
            <span style={{ fontWeight: 500 }}>Metrics Item: </span>
            <Select
              style={{ width: 120 }} 
              onChange={this.changeMetricsName.bind(this)}
              defaultValue={[this.props.dashboard.metricsSelectName]}
            >
              {
                this.state.optionsArray.map( item => {
                  return  <Option key={item.lable}>{item.value}</Option> 
                })
              }                   
            </Select>
          </Col>        
        </Col>        
      </Row>
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
    getMetricsSelectTime (payload) {
      dispatch({ type: 'dashboard/getMetricsSelectTime', payload })
    },
    getMetricsSelectName (payload) {
      dispatch({ type: 'dashboard/getMetricsSelectName', payload })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
