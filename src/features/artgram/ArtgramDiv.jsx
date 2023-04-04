import React from 'react'
import {ArtgramImg} from '../../components/ImageTag'
import InnerText from './InnerText'
import Info from './Info'

function ArtgramDiv() {
  return (
    <div>
      <ArtgramImg as="div" width="364px" height="189px"/>
      <div style={{ borderRadius: "0 0 5px 5px", backgroundColor:"lightgray", width:"364px",  height:"237px"}}>
      <InnerText/>
      <Info/>
      </div>
    </div>
  )
}

export default ArtgramDiv