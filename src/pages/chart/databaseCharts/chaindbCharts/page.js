import React from 'react'
import { Checkbox, Select } from 'antd'
import { connect } from 'dva'
import { Page } from 'components'
import ChainDBChartsComponent from './ChainDBChartsComponent'
import styles from './page.less'

const CheckboxGroup = Checkbox.Group
const Option = Select.Option

const chartList = [
  {
    label: 'CompactInput',
    value: 'CompactInput',
  },
  {
    label: 'CompactOutput',
    value: 'CompactOutput',
  },
  {
    label: 'CompactTime',
    value: 'CompactTime',
  },
  {
    label: 'WritedelayCounter',
    value: 'WritedelayCounter',
  },  
  {
    label: 'WritedelayDuration',
    value: 'WritedelayDuration',
  },      
]

class Chart extends React.Component {
  constructor () {
    super()
    this.state = {
      type: 'CompactInput',
    }
    this.handleCheckGroupChange = this.handleCheckGroupChange.bind(this)
  }
  handleCheckGroupChange (e) {
    this.setState({
      type: e,
    })
  }
  changeStatTimeRange (key) {
    this.props.getCompactInput({
      precision: 'ms',
      sql: `SELECT last("value") FROM "chaindb.compact.input.meter" WHERE time >= now() - (${key}) GROUP BY time(10s), "coinbase", "networkid", "nodename" fill(null)`,
    })    
    this.props.getCompactOutput({
      precision: 'ms',
      sql: `SELECT last("value") FROM "chaindb.compact.output.meter" WHERE time >= now() - (${key}) GROUP BY time(10s), "coinbase", "networkid", "nodename" fill(null)`,
    })
    this.props.getCompactTime({
      precision: 'ms',
      sql: `SELECT last("value") FROM "chaindb.compact.time.meter" WHERE time >= now() - (${key}) GROUP BY time(10s), "coinbase", "networkid", "nodename" fill(null)`,
    })
    this.props.getWritedelayCounter({
      precision: 'ms',
      sql: `SELECT last("value") FROM "chaindb.writedelay.counter.meter" WHERE time >= now() - (${key}) GROUP BY time(10s), "coinbase", "networkid", "nodename" fill(null)`,
    })  
    this.props.getWritedelayDuration({
      precision: 'ms',
      sql: `SELECT last("value") FROM "chaindb.writedelay.duration.meter" WHERE time >= now() - (${key}) GROUP BY time(10s), "coinbase", "networkid", "nodename" fill(null)`,
    })           
  }
  render () {
    return (<Page inner>
      <CheckboxGroup options={chartList} defaultValue={['CompactInput']} onChange={this.handleCheckGroupChange} />
      <br/>
      <br/>      
      State TimeRange: <Select
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
        <ChainDBChartsComponent type={this.state.type} />
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
    getCompactInput (payload) {
      dispatch({ type: 'chaindb/getCompactInput', payload })
    },
    getCompactOutput (payload) {
      dispatch({ type: 'chaindb/getCompactOutput', payload })
    }, 
    getCompactTime (payload) {
      dispatch({ type: 'chaindb/getCompactTime', payload })
    },  
    getWritedelayCounter (payload) {
      dispatch({ type: 'chaindb/getWritedelayCounter', payload })
    },
    getWritedelayDuration (payload) {
      dispatch({ type: 'chaindb/getWritedelayDuration', payload })
    },       
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
