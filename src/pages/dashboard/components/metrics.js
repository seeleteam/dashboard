import React from 'react'
import { connect } from 'dva'
import { Table } from 'antd'
// import { Link } from 'react-router-dom'
import styles from './metrics.less'
import _ from 'lodash'
import { metricsName } from '../../../utils/metricsName'

class MetricsComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
    this.props.getMetrics()
  } 
  handName (record) {
    this.props.getMetricsName(record)
    var pMetricsTag = record[0].substring(record[0].lastIndexOf(".") + 1)
    switch (pMetricsTag) {
      case "count":
        this.props.getMetricsSelectName(metricsName.count[0].lable)
        break
      case "gauge":
        this.props.getMetricsSelectName(metricsName.gauge[0].lable)
        break
      case "histogram":
        this.props.getMetricsSelectName(metricsName.histogram[0].lable)
        break
      case "meter":
        this.props.getMetricsSelectName(metricsName.meter[0].lable)
        break
      case "timer":
        this.props.getMetricsSelectName(metricsName.timer[0].lable)
        break
      default:
    }
    this.props.getMetricsSelectTime ('15m')
  }
  render () {
    var metricsData = this.props.dashboard.MetricsData
    var resultData = []
    if (!_.isUndefined(metricsData) && metricsData != null && metricsData.length > 0) {
      var resultMetricsData = metricsData[0]
      if (!_.isUndefined(resultMetricsData) && resultMetricsData != null) {
        if (!_.isUndefined(resultMetricsData.Series) && resultMetricsData.Series != null) {
          for(var i=0;i<resultMetricsData.Series[0].values.length;i++) {
            var metricsItem = {
              index: i + 1,
              name: resultMetricsData.Series[0].values[i],
            }
            resultData.push(metricsItem)
          }
        }
      }
    }
    const columns = [
      {
        title: 'Index',
        dataIndex: 'index',
        key: 'index',      
      }, {
        title: 'NAME',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          return (
            <a onClick={this.handName.bind(this, text, record)}>{text}</a>
          )
        },
      },
    ]    
    return (
      <div className={styles.measureMents}>
        <b>Metrics List:</b>
        <Table pagination={true} columns={columns} rowKey={(record, key) => key} dataSource={resultData} />
      </div>
    )
  }  
}

const mapStateProps = (state) => {
  return {
    ...state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMetrics (payload) {
      dispatch({ type: 'dashboard/getMetrics', payload })
    },
    getMetricsName (payload) {
      dispatch({ type: 'dashboard/getMetricsName', payload })
    },
    getMetricsSelectTime (payload) {
      dispatch({ type: 'dashboard/getMetricsSelectTime', payload })
    },
    getMetricsSelectName (payload) {
      dispatch({ type: 'dashboard/getMetricsSelectName', payload })
    },
  }
}

export default connect(mapStateProps, mapDispatchToProps)(MetricsComponent)
