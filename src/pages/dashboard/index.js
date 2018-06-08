import React from 'react'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { Page } from 'components'
import { NumberCardComponent, DataBaseComponent, NodesComponent, MetricsComponent } from './components'
import styles from './index.less'

class DashboardComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }
 
  render () {
    const bodyStyle = {
      numberBodyStyle: {
        height: 432,
        background: '#fff',
      },
      nodesBodyStyle: {
        height: 432,
        background: '#fff',
      },
      measureMentBodyStyle: {
        height: 432,
        background: '#fff',
      },    
    }
  
    return (
      <Page className={styles.dashboard}>
        <Row gutter={24}>
          <Col lg={16} md={5}>            
              <NumberCardComponent /> 
          </Col> 
          <Col lg={16} md={5}>
            <Card bordered={false} {...bodyStyle.numberBodyStyle}>
              <DataBaseComponent />
            </Card>
          </Col>        
          <Col lg={16} md={24}>
            <Card bordered={false} {...bodyStyle.nodesBodyStyle}>
              <NodesComponent />
            </Card>
          </Col>
          <Col lg={16} md={24}>
            <Card bordered={false} {...bodyStyle.measureMentBodyStyle}>
              <MetricsComponent />
            </Card>
          </Col>        
        </Row>
      </Page>
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
    getNodes (payload) {
      dispatch({ type: 'dashboard/getNodes', payload })
    },  
    getMetrics (payload) {
      dispatch({ type: 'dashboard/getMetrics', payload })
    },    
  }
} 

export default connect(mapStateProps, mapDispatchToProps)(DashboardComponent)
