import React from 'react'

import PeerCountComponent from './PeerCountComponent'
import AddPeerComponent from './AddPeerComponent'
import DeletePeerComponent from './DeletePeerComponent'

const P2pChartsComponent = ({ type }) => {
  let Comp = ['PeerCount', 'AddPeer', 'DeletePeer' ]
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
          if (/AddPeer/.test(i)){
            return (<AddPeerComponent key={n} />)
          } else if (/DeletePeer/.test(i)){ 
            return (<DeletePeerComponent key={n} />)
          } else {
            return (<PeerCountComponent key={n} />)
          }
        })
      }
    </div>
  )
}

export default P2pChartsComponent
