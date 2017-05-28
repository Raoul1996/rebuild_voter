import React from 'react'
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router'

import AppComponent from './components/app'
import UserPage from './pages/index/index'
import UserLogin from './pages/index/login'
import UserRegister from './pages/index/register'
import UserPassword from './pages/index/password'
import UserForget from './pages/index/forget'
import UserList from './pages/index/list'
import UserChangeMsg from './pages/index/changeMsg'
import UserChangeMobile from './pages/index/changeMobile'
import Joined from './pages/index/joined'
import Vote from './components/user/voting'
import AdminPage from './components/admin/index'
import AdminLogin from './components/admin/login'
import CreateActivity from './components/admin/list/filterList/create'
import EditActivity from './components/admin/list/filterList/activityList/operation/edit'
import VoteRes from './components/admin/list/filterStatistics/statisticList/voteRes'
import ScoreRes from './components/admin/list/filterStatistics/statisticList/scoreRes'
import API from 'api'
import * as Request from 'utils/request'
import AdminLogout from 'utils/adminLoginout'
import UserLogout from 'utils/userLogout'
const requireAdminLogin = async () => {
  console.log('安全')
  const data = await Request.tpost(API.findLike)
  if (data.code === 20002 || data.code === 20001) {
    AdminLogout()
  }
}
const requireUserLogin = async () => {
  console.log('安全')
  const data = await Request.verify(API.haveVote)
  if (data.code === 20002 || data.code === 20001) {
    UserLogout()
  }
}
function RouterApp () {
  return (
    <Router history={hashHistory}>
      <Redirect from="/" to="/users/list" />
      <Route path="/" component={AppComponent}>
        <IndexRoute component={UserPage} />
        <Route path="users" components={UserPage}>
          <Route path="login" components={UserLogin} />
          <Route path="register" components={UserRegister} />
          <Route path="password" components={UserPassword} onEnter={requireUserLogin} />
          <Route path="forget" components={UserForget} onEnter={requireUserLogin} />
          <Route path="vote" component={Vote} />
          <Route path="list" component={UserList} />
          <Route path="joined" component={Joined} onEnter={requireUserLogin} />
          <Route path="change" components={UserChangeMsg} onEnter={requireUserLogin} />
          <Route path="change-mobile" components={UserChangeMobile} onEnter={requireUserLogin} />
        </Route>
        <Route path="login" components={AdminLogin} />
        <Route path="register" components={UserRegister} />
        <Route path="admin" components={AdminPage} />
        <Route path="create" components={CreateActivity} onEnter={requireAdminLogin} />
        <Route path="edit" components={EditActivity} onEnter={requireAdminLogin} />
        <Route path="vote-res" components={VoteRes} onEnter={requireAdminLogin} />
        <Route path="score-res" components={ScoreRes} onEnter={requireAdminLogin} />
      </Route>
    </Router>
  )
}

export default RouterApp
