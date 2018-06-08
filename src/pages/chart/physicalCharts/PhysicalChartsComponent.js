import React from 'react'

import MemPausesComponent from './MemPausesComponent'
import MemAllocsComponent from './MemAllocsComponent'

const PhysicalChartsComponent = ({ type }) => {
  let Comp = ['MemPauses', 'MemAllocs' ]
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
          if (/MemPauses/.test(i)){
            return (<MemPausesComponent key={n} />)
          } else {
            return (<MemAllocsComponent key={n} />)
          }
        })
      }
    </div>
  )
}

export default PhysicalChartsComponent
