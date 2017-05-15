import React from 'react'
import { Router, Route, IndexRoute, hashHistory,Redirect } from 'react-router'

import AppComponent from './components/app'
import DemoContainer from './containers/demo.container'
import UserPage from './pages/index/index'
import UserLogin from './pages/index/login'
import UserRegister from './pages/index/register'
import UserList from './pages/index/list'
import Vote from './pages/user/voting'
import AdminPage from './pages/admin/index/index'
import CreateActivity from './pages/admin/create'
import EditActivity from './pages/admin/edit'
import VoteRes from './pages/admin/voteRes'
import ScoreRes from './pages/admin/scoreRes'
const RouterApp = (
  <Router history={hashHistory}>
    {/*<Redirect from="/" to="/users/login"/>*/}
    <Redirect from="/" to="/users/list"/>
    <Route path="/" component={AppComponent}>
      <IndexRoute component={UserPage}/>
      <Route path="demo" component={DemoContainer} />
      <Route path="users" components={UserPage}>
        <Route path="login" components={UserLogin}/>
        <Route path="register" components={UserRegister}/>
        <Route path="vote" component={Vote}/>
        <Route path="list" component={UserList}/>
      </Route>
      {/*TODO:这里我想配置成二级路由，可是暂时失败了*/}
      <Route path="login" components={UserLogin}/>
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
