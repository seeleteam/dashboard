import React from 'react'
import { connect } from 'dva'
import ReactHighstock from 'react-highcharts/ReactHighstock.src'

class MemAllocsComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }
  // /api/query/sqls?
  // sql=SELECT count("value") FROM "runtime.memory.allocs.gauge" WHERE time >= now() - 5m 
  // GROUP BY time(10s), "coinbase", "networkid", "nodename" fill(null)

  componentDidMount () {
    let {selectType} = this.props.highCharts
    let params = {
      sql:`SELECT count("value") FROM "runtime.memory.allocs.gauge" WHERE time >= now() - 5m GROUP BY time(${selectType}), "coinbase", "networkid", "nodename" fill(null)`,
    }
    this.props.getMemAllocs(params)
  }

  getOption () {
    const option = {
      rangeSelector: {
        selected: 1,
      },
      title: {
        text: 'AAPL Stock Price',
      },
      series: [{
        name: 'AAPL',
        data: this.props.MemAllocs.MemAllocsData ? this.props.MemAllocs.MemAllocsData : [],
        tooltip: {
          valueDecimals: 2,
        },
      }],
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
    getMemAllocs (payload) {
      dispatch({ type: 'MemAllocs/getMemAllocs', payload })
    },
  }
}
export default connect(mapStateProps, mapDispatchToProps)(MemAllocsComponent)