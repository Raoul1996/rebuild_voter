import React from 'react'
import { Router, Route, IndexRoute, hashHistory,Redirect } from 'react-router'

import AppComponent from './components/app'
import UserPage from './pages/index/index'
import UserLogin from './pages/index/login'
import UserRegister from './pages/index/register'
import UserList from './pages/index/list'
import UserChangeMsg from './pages/index/changeMsg'
import UserChangeMobile from './pages/index/changeMobile'
import Vote from './pages/user/voting'
import AdminPage from './pages/admin/index/index'
import AdminLogin from './pages/admin/login'
import CreateActivity from './pages/admin/create'
import EditActivity from './pages/admin/edit'
import VoteRes from './pages/admin/voteRes'
import ScoreRes from './pages/admin/scoreRes'
const RouterApp = (
  <Router history={hashHistory}>
    {/*<Redirect from="/" to="/users/login"/>*/}
    <Redirect from="/" to="/users/change-massage"/>
    <Route path="/" component={AppComponent}>
      <IndexRoute component={UserPage}/>
      <Route path="users" components={UserPage}>
        <Route path="login" components={UserLogin}/>
        <Route path="register" components={UserRegister}/>
        <Route path="vote" component={Vote}/>
        <Route path="list" component={UserList}/>
        <Route path="change-massage" components={UserChangeMsg}/>
        <Route path="change-mobile" components={UserChangeMobile}/>
      </Route>
      {/*TODO:这里我想配置成二级路由，可是暂时失败了*/}
      <Route path="login" components={AdminLogin}/>
      <Route path="register" components={UserRegister}/>
      <Route path="admin" components={AdminPage} />
      <Route path="create" components={CreateActivity}/>
      <Route path="edit-activity" components={EditActivity}/>
      <Route path="vote-res" components={VoteRes} />
      <Route path="score-res" components={ScoreRes} />
    </Route>
  </Router>
)

export default RouterApp
