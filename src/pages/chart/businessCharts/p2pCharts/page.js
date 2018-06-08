import React from 'react'
import { Checkbox, Select } from 'antd'
import { connect } from 'dva'
import { Page } from 'components'
import P2pChartsComponent from './P2pChartsComponent'
import styles from './page.less'

const CheckboxGroup = Checkbox.Group
const Option = Select.Option

const chartList = [
  {
    label: 'PeerCount',
    value: 'PeerCount',
  },
  {
    label: 'AddPeer',
    value: 'AddPeer',
  },
  {
    label: 'DeletePeer',
    value: 'DeletePeer',
  },  
]

class Chart extends React.Component {
  constructor () {
    super()
    this.state = {
      type: 'PeerCount',
    }
    this.handleCheckGroupChange = this.handleCheckGroupChange.bind(this)
  }
  handleCheckGroupChange (e) {
    this.setState({
      type: e,
    })
  }
  changeStatTimeRange (key) {
    this.props.getPeerCount({
      precision: 'ms',
      sql: `SELECT last("value") FROM "p2p.peercount.meter" WHERE time >= now() - (${key}) GROUP BY time(10s), "coinbase", "networkid", "nodename" fill(null)`,
    })    
    this.props.getAddPeer({
      precision: 'ms',
      sql: `SELECT last("value") FROM "p2p.addpeer.meter" WHERE time >= now() - (${key}) GROUP BY time(10s), "coinbase", "networkid", "nodename" fill(null)`,
    })
    this.props.getDeletePer({
      precision: 'ms',
      sql: `SELECT last("value") FROM "p2p.deletepeer.gauge" WHERE time >= now() - (${key}) GROUP BY time(10s), "coinbase", "networkid", "nodename" fill(null)`,
    })       
  }
  render () {
    return (<Page inner>
      <CheckboxGroup options={chartList} defaultValue={['PeerCount']} onChange={this.handleCheckGroupChange} />
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
        <P2pChartsComponent type={this.state.type} />
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
    getPeerCount (payload) {
      dispatch({ type: 'p2p/getPeerCount', payload })
    },
    getAddPeer (payload) {
      dispatch({ type: 'p2p/getAddPeer', payload })
    }, 
    getDeletePer (payload) {
      dispatch({ type: 'p2p/getDeletePer', payload })
    },       
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
