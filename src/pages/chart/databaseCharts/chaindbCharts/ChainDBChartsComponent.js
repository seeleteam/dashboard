import React from 'react'

import CompactInputComponent from './CompactInputComponent'
import CompactOutputComponent from './CompactOutputComponent'
import CompactTimeComponent from './CompactTimeComponent'
import WritedelayCounterComponent from './WritedelayCounterComponent'
import WritedelayDurationComponent from './WritedelayDurationComponent'

const ChainDBChartsComponent = ({ type }) => {
  let Comp = ['CompactInput', 'CompactOutput', 'CompactTime', 'WritedelayCounter', 'WritedelayDuration' ]
  Comp = Comp.filter(i => {
    if(type.indexOf(i) < 0) {
      return false
    }else {
      return true
    }
  })
  return (
    <div>
      {
        Comp.map((i, n) => {
          if (/CompactOutput/.test(i)){
            return (<CompactOutputComponent key={n} />)
          } else if (/CompactTime/.test(i)){ 
            return (<CompactTimeComponent key={n} />)
          } else if (/WritedelayCounter/.test(i)){ 
            return (<WritedelayCounterComponent key={n} />)
          } else if (/WritedelayDuration/.test(i)){ 
            return (<WritedelayDurationComponent key={n} />)                        
          } else {
            return (<CompactInputComponent key={n} />)
          }
        })
      }
    </div>
  )
}

export default ChainDBChartsComponent
