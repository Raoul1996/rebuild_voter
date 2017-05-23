import React, { Component } from 'react'
import './index.less'
class Logo extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="logo">
        <div className="logo-line"></div>
        <div className="logo-text">{this.props.text || ''}</div>
        <div className="logo-line"></div>
      </div>
    )
  }
}
export default Logo