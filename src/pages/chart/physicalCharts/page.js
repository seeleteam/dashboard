import React from 'react'
import { Checkbox, Select } from 'antd'
import { connect } from 'dva'
import { Page } from 'components'
import PhysicalChartsComponent from './PhysicalChartsComponent'
import styles from './page.less'

const CheckboxGroup = Checkbox.Group
const Option = Select.Option

const chartList = [
  {
    label: 'MemAllocs',
    value: 'MemAllocs',
  },  
  {
    label: 'MemPauses',
    value: 'MemPauses',
  },
]

class Chart extends React.Component {
  constructor () {
    super()
    this.state = {
      type: 'MemAllocs',
    }
    this.handleCheckGroupChange = this.handleCheckGroupChange.bind(this)
  }
  handleCheckGroupChange (e) {
    this.setState({
      type: e,
    })
  }
  changeStatTimeRange (key) {
    this.props.getMemAllocs({
      precision: 'ms',
      sql: `SELECT last("value") FROM "runtime.memory.alloc.gauge" WHERE time >= now() - (${key}) GROUP BY time(10s), "coinbase", "networkid", "nodename" fill(null)`,
    })
    this.props.getMemPauses({
      precision: 'ms',
      sql: `SELECT last("value") FROM "runtime.memory.pauses.gauge" WHERE time >= now() - (${key}) GROUP BY time(10s), "coinbase", "networkid", "nodename" fill(null)`,
    })       
  }
  render () {
    return (<Page inner>
      <CheckboxGroup options={chartList} defaultValue={['MemAllocs']} onChange={this.handleCheckGroupChange} />
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
        <PhysicalChartsComponent type={this.state.type} />
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
    getMemAllocs (payload) {
      dispatch({ type: 'memory/getMemAllocs', payload })
    },
    getMemPauses (payload) {
      dispatch({ type: 'memory/getMemPauses', payload })
    },    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
