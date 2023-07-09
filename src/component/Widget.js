import React from 'react'
import WidgetOptions from './WidgetOptions'
import "../css/Widget.css"
import WidgetContent from './WidgetContent'
import { LinkOffOutlined, LinkOutlined } from '@mui/icons-material'



function Widget() {
  return (
    <div className="widget">
      <div className="widget__header">
        <h5>Important Links.</h5>
        <LinkOutlined/>
      </div>
      
      <div className="widget__contents">
        <WidgetContent />
      </div>
    </div>
  )
}

export default Widget