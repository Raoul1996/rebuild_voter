import React, { Component } from 'react'
import { Link } from 'react-router'
import 'whatwg-fetch'
import 'fetch-ie8/fetch.js'

require('console-polyfill')
require('es6-promise')

import './app.less'
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
