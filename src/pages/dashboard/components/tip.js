import React from 'react'
import { connect } from 'dva'
import { color } from '../../../utils/theme'
import { Col } from 'antd'
import NumberCard from './numberCard'

class NumberCardComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
    this.props.getDataBases()
    this.props.getNodes()  
    this.props.getMetrics()
  }

  render () {
    var numbers = [
      {
        icon: 'team',
        color: color.blue,
        title: 'Nodes Count',
        number: this.props.dashboard.NodeCount,
      }, {
        icon: 'message',
        color: color.purple,
        title: 'Metrics Count',
        number: this.props.dashboard.MetricsCount,      
      }, 
    ]

    return (
      numbers.map((item, key) => (<Col key={key} lg={8} md={18}>
        <NumberCard {...item} />
      </Col>))
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
    getDataBases () {
      dispatch({ type: 'dashboard/getDataBases' })
    },
    getNodes (payload) {
      dispatch({ type: 'dashboard/getNodes', payload })
    },
    getMetrics (payload) {
      dispatch({ type: 'dashboard/getMetrics', payload })
    },        
  }
}

export default connect(mapStateProps, mapDispatchToProps)(NumberCardComponent)
