import React from 'react'

import HighstockComponent from './HighstockComponent'
import HighstockComponent1 from './HighstockComponent1'
import HighstockComponent2 from './HighstockComponent2'
import MemAllocsComponent from './MemAllocsComponent'


const HighChartsComponent = ({ type }) => {
  let Comp = ['Highstock', 'Highstock1', 'Highstock2', 'MemAllocs' ]
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
          if (/Highstock/.test(i)){
            return (<HighstockComponent key={n} />)
          } else if (/Highstock1/.test(i)){
            return (<HighstockComponent1 key={n} />)
          } else if (/Highstock2/.test(i)){
            return (<HighstockComponent2 key={n} />)
          } else {
            return (<MemAllocsComponent key={n} />)
          }
        })
      }
    </div>
  )
}

export default HighChartsComponent
