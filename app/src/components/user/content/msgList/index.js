import React, { Component } from 'react'
import './index.less'
class MsgListComponet extends Component {
  render () {
    return (
      <div className="msg-list">
        <div className="msg-list-label">{this.props.label || 'Raoul'}</div>
        <div className="msg-list-text">{this.props.text || 'Raoul'}</div>
      </div>
    )
  }
}
export default MsgListComponet
