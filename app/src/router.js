import React from 'react'
import { Router, Route, IndexRoute, hashHistory,Redirect } from 'react-router'

import AppComponent from './components/app'
import UserPage from './pages/index/index'
import UserLogin from './pages/index/login'
import UserRegister from './pages/index/register'
import UserPassword from './pages/index/password'
import UserForget from './pages/index/forget'
import UserList from './pages/index/list'
import UserChangeMsg from './pages/index/changeMsg'
import UserChangeMobile from './pages/index/changeMobile'
import Vote from './components/user/voting'
import AdminPage from './components/admin/index'
import AdminLogin from './components/admin/login'
import CreateActivity from './components/admin/list/filterList/create'
import EditActivity from './components/admin/list/filterList/activityList/operation/edit'
import VoteRes from './components/admin/list/filterStatistics/statisticList/voteRes'
import ScoreRes from './components/admin/list/filterStatistics/statisticList/scoreRes'
import API from 'api'
import * as Request from 'utils/request'
import Goto from 'utils/goto'
const requireLogin = async( ) => {
  console.log('安全')
  const data = await Request.tpost(API.create)
  if(data.code === 20002){
    Goto('login')
  }
}
const RouterApp = (
  <Router history={hashHistory}>
    <Redirect from="/" to="/users/login"/>
    <Route path="/" component={AppComponent} >
      <IndexRoute component={UserPage}/>
      <Route path="users" components={UserPage}>
        <IndexRoute component={UserLogin}/>
        <Route path="login" components={UserLogin}/>
        <Route path="register" components={UserRegister}/>
        <Route path="password" components={UserPassword}/>
        <Route path="forget" components={UserForget}/>
        <Route path="vote" component={Vote}/>
        <Route path="list" component={UserList}/>
        <Route path="change" components={UserChangeMsg}/>
        <Route path="change-mobile" components={UserChangeMobile}/>
      </Route>
      <Route path="login" components={AdminLogin} onEnter={requireLogin}/>
      <Route path="register" components={UserRegister}/>
      <Route path="admin" components={AdminPage} onEnter={requireLogin}/>
      <Route path="create" components={CreateActivity} onEnter={requireLogin}/>
      <Route path="edit" components={EditActivity} onEnter={requireLogin}/>
      <Route path="vote-res" components={VoteRes} onEnter={requireLogin}/>
      <Route path="score-res" components={ScoreRes} onEnter={requireLogin}/>
    </Route>
  </Router>
)

export default RouterApp
