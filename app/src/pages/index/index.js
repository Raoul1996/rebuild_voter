import React, { Component } from 'react'
import Logo from '../../components/user/content/lineText/index'
import Header from '../../components/user/content/header/index'
import Footer from '../../components/user/content/footer/index'
import eventProxy from '../../utils/eventProxy'

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flag: '',
      loginStatus: false
    }
  }

  componentDidMount () {
    eventProxy.on('flag', (msg) => {
      this.state.flag = msg
    })
    eventProxy.on('loginStatus', (loginStatus) => {
        this.state.loginStatus = loginStatus
    })
    console.log(this.state)
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