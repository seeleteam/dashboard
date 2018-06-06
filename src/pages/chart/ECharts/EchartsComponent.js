import React from 'react'
import PropTypes from 'prop-types'

import SimpleChartComponent from './SimpleChartComponent'

const EchartsComponent = ({ type }) => {
  if (type === 'simple') return (<SimpleChartComponent />)
  else {
    return (
      <SimpleChartComponent />
    )
  }
}

EchartsComponent.propTypes = {
  type: PropTypes.string,
}

// The return value is set according to type
export default EchartsComponent
