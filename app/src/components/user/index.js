import React, { Component } from 'react'
import Logo from './content/lineText/index'
import Header from './content/header/index'
import Footer from './content/footer/index'

class Index extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className="user-index">
        <Header/>
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
export default Index