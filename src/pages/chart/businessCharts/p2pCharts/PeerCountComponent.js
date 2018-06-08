import React from 'react'
import { connect } from 'dva'
import ReactHighstock from 'react-highcharts/ReactHighstock.src'
import _ from 'lodash'

class PeerCountComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
    let {statTimeRange} = this.props.p2pCharts
    let params = {
      precision: 'ms',
      sql:`SELECT last("value") FROM "p2p.peercount.gauge" WHERE time >= now() - (${statTimeRange}) GROUP BY time(10s), "coinbase", "networkid", "nodename" fill(null)`,
    }
    this.props.getPeerCount(params)
  }

  getOption () { 
    var SeriesArray = [] 
    var ResultData = this.props.p2p.PeerCountData

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
      title: {
        text: 'Stat The Metrics of PeerCount',
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
    getPeerCount (payload) {
      dispatch({ type: 'p2p/getPeerCount', payload })
    },
  }
}
export default connect(mapStateProps, mapDispatchToProps)(PeerCountComponent)