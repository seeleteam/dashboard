import React from 'react'
import { connect } from 'dva'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import styles from './metrics.less'
import _ from 'lodash'

class MetricsComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
    this.props.getMetrics()
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
        render: text => <Link to={`chart/` + text}>{text}</Link>,        
      },
    ]
    return (
      <div className={styles.measureMents}>
        <b>Metrics List:</b>
        <Table pagination={false} columns={columns} rowKey={(record, key) => key} dataSource={resultData} />
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
  }
}

export default connect(mapStateProps, mapDispatchToProps)(MetricsComponent)
