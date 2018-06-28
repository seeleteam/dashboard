import React from 'react'
import { connect } from 'dva'
import ReactHighstock from 'react-highcharts/ReactHighstock.src'
import { METRICS_PATH, METRICS_PARAM_NAMESPACE, METRICS_NAMESPACE } from './const'
import _ from 'lodash'

class MetricsComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }
 
  componentDidMount () {
    let {statTimeRange} = eval('this.props.' + METRICS_PARAM_NAMESPACE)
    let pMetricsName = `${this.props.dashboard.metricsName}`
    let pMetricsTag = pMetricsName.substring(pMetricsName.lastIndexOf(".") + 1)
    let pMetricsSelectName = "value"
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
    let params = {
      precision: 'ms',
      sql:`SELECT last("${pMetricsSelectName}") FROM "${pMetricsName}" WHERE time >= now() - (${statTimeRange}) GROUP BY time(10s), "coinbase", "networkid", "nodename" fill(null)`,
    }
    this.props.getMetricsData(params)
  }

  getOption () {
    var SeriesArray = [] 
    var ResultData = eval('this.props.' + METRICS_NAMESPACE + '.MetricsData')
    if (!_.isUndefined(ResultData) && ResultData != null && ResultData.length > 0) {
      var ResultDataMeasureMent = ResultData[0]
      if (!_.isUndefined(ResultDataMeasureMent) && ResultDataMeasureMent != null) {
        if (!_.isUndefined(ResultDataMeasureMent.Series) && ResultDataMeasureMent.Series != null) {
          for (var i=0; i<ResultDataMeasureMent.Series.length; i++) {
            var TagName = ResultDataMeasureMent.Series[i].tags.nodename
            var SeriesData = ResultDataMeasureMent.Series[i].values
            var SeriesDict = {
              name: TagName,
              data: SeriesData,
              tooltip: {
                valueDecimals: 2,
                shared: true,
              },   
            }
            SeriesArray.push(SeriesDict)
          }
        }
      }
    }

    const option = {
      rangeSelector: {
        selected: 1,
      },
      chart: {
        height: 1000,
        type: 'line',
      },
      title: {
        text: 'Stat The Metrics of ' + this.props.dashboard.metricsName,
      },
      exporting: {
        enabled: true,
      },
      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom',
      },
      xAxis:{
        type: 'datetime',
        dateTimeLabelFormats: {
          millisecond: '%H:%M:%S.%L',
          second: '%H:%M:%S',
          minute: '%H:%M',
          hour: '%H:%M',
          day: '%m-%d',
          week: '%m-%d',
          month: '%Y-%m',
          year: '%Y',
        },
      },
      series: SeriesArray,
    }
    return option
  }

  render () {
    return (
      <div className="examples">
        <div className="parent">
          <ReactHighstock
            ref={(e) => {
              this.echarts_react = e
            }} 
            config={this.getOption()}
            style={{ height: 400 }}
          />
        </div>
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
    getMetricsData (payload) {
      dispatch({ type: METRICS_PATH, payload })
    },
  }
}

export default connect(mapStateProps, mapDispatchToProps)(MetricsComponent)