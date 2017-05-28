import React, { Component } from 'react'
import 'whatwg-fetch'
import 'fetch-ie8/fetch.js'
import './app.less'

require('console-polyfill')
require('es6-promise')

class AppComponent extends Component {
  render () {
    return (
      <div className="App">
        {this.props.children}
      </div>
    )
  }
}

export default AppComponent
