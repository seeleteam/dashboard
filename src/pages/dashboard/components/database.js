import React from 'react'
import { connect } from 'dva'
import { Table } from 'antd'
import styles from './database.less'
import _ from 'lodash'

class DataBaseComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
    this.props.getDataBases()
  }

  render () {
    var databaseData = this.props.dashboard.DatabaseData
    var resultData = []
    if (!_.isUndefined(databaseData) && databaseData != null && databaseData.length > 0) {
      var resultDatabaseData = databaseData[0]
      if (!_.isUndefined(resultDatabaseData) && resultDatabaseData != null) {
        if (!_.isUndefined(resultDatabaseData.Series) && resultDatabaseData.Series != null) {
          for(var i=0;i<resultDatabaseData.Series[0].values.length;i++) {
            var databaseItem = {
              name: resultDatabaseData.Series[0].values[i],
            }
            resultData.push(databaseItem)
          }
        }
      }
    }     
    const columns = [
      {
        title: 'DatabaseName',
        dataIndex: 'name',
      },
    ] 
    return (
      <div className={styles.database}>
        <b>Database Info:</b>
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
    getDataBases (payload) {
      dispatch({ type: 'dashboard/getDataBases', payload })
    },
  }
}

export default connect(mapStateProps, mapDispatchToProps)(DataBaseComponent)
