import React from 'react'
import { connect } from 'dva'
import { Table } from 'antd'
import styles from './nodes.less'
import _ from 'lodash'

class NodesComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
    this.props.getNodes()
  }

  render () {
    var nodesData = this.props.dashboard.NodesData
    var resultData = []
    if (!_.isUndefined(nodesData) && nodesData != null && nodesData.length > 0) {      
      for(var i=0;i<nodesData.length;i++) {
        var nodeItem = {
          index: i + 1,
          nodename: nodesData[i].nodename,
          coinbase: nodesData[i].coinbase,
          shardid: nodesData[i].shardid,
        }
        resultData.push(nodeItem)
      }
    }    
    const columns = [
      {
        title: 'INDEX',
        dataIndex: 'index',
      }, {
        title: 'NAME',
        dataIndex: 'nodename',
      }, {
        title: 'COINBASE',
        dataIndex: 'coinbase',
      },
    ]
    return (
      <div className={styles.nodes}>
        <b>Nodes List:</b>      
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
    getNodes (payload) {
      dispatch({ type: 'dashboard/getNodes', payload })
    },
  }
}

export default connect(mapStateProps, mapDispatchToProps)(NodesComponent)
