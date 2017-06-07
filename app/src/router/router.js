import React from 'react'
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router'

import AppComponent from '../components/app'
import UserPage from '../components/user/index'
import UserLogin from '../components/user/login/index'
import UserRegister from '../components/user/register/index'
import UserPassword from '../components/user/forgetPasssword/index'
import UserForget from '../components/user/forgetPasssword/index'
import UserList from '../components/user/list/index'
import UserChangeMsg from '../components/user/changeMsg/index'
import UserChangeMobile from '../components/user/changeMobile/index'
import Joined from '../components/user/joined/index'
import Vote from '../components/user/voting/index'
import AdminPage from '../components/admin/index'
import AdminLogin from '../components/admin/login/index'
import CreateActivity from '../components/admin/list/filterList/create'
import EditActivity from '../components/admin/list/filterList/activityList/operation/edit/index'
import VoteRes from '../components/admin/list/filterStatistics/statisticList/voteRes/index'
import ScoreRes from '../components/admin/list/filterStatistics/statisticList/scoreRes/index'
import FilterList from '../components/admin/list/filterList/index'
import FilterStatistics from '../components/admin/list/filterStatistics/index'
import API from '../api/index'
import * as Request from '../utils/request'
import AdminLogout from '../utils/adminLoginout'
import UserLogout from '../utils/userLogout'

const requireAdminLogin = async () => {
  if (window.localStorage.getItem('is_login') === '1') {
    const data = await Request.tpost(API.findLike)
    if (data.code === 20002 || data.code === 20001) {
      AdminLogout()
    }
  }
}

const requireUserLogin = async () => {
  if (window.localStorage.getItem('is_login') === '1') {
    let params = {
      page: 1,
      rows: 6
    }
    const data = await Request.verify(API.haveVote.replace(/pnum/, params.page).replace(/rnum/, params.rows))
    if (data.code === 20002 || data.code === 20001) {
      UserLogout()
    }
  }
}

const buttonOnLeave = () => {
  if (window.localStorage.getItem('is_login') === '1') {
    window.localStorage.setItem('is_vote', 0)
  }
}

const buttonOnEnter = () => {
  if (window.localStorage.getItem('is_login') === '1') {
    window.localStorage.setItem('is_vote', 1)
  }
}
function RouterApp () {
  return (
    <Router history={hashHistory}>
      <Redirect from="/" to="users/list" />
      <Route path="/" component={AppComponent}>
        {/*<IndexRoute component={UserPage} />*/}
        <Route path="users" component={UserPage}>
          <IndexRoute component={UserList}/>
          <Route path="login" component={UserLogin} />
          <Route path="register" component={UserRegister} />
          <Route path="password" component={UserPassword} onEnter={requireUserLogin} />
          <Route path="forget" component={UserForget} onEnter={requireUserLogin} />
          <Route path="vote" component={Vote} onEnter={buttonOnEnter} onLeave={buttonOnLeave} />
          <Route path="list" component={UserList} />
          <Route path="joined" component={Joined} onEnter={requireUserLogin} />
          <Route path="change" component={UserChangeMsg} onEnter={requireUserLogin} />
          <Route path="change-mobile" component={UserChangeMobile} onEnter={requireUserLogin} />
        </Route>
        <Route path="admin" component={AdminPage}>
          <Route path="filter-list" component={FilterList} onEnter={requireAdminLogin} />
          <Route path="filter-statistics" component={FilterStatistics} onEnter={requireAdminLogin} />
        </Route>
        <Route path="login" component={AdminLogin} />
        <Route path="register" component={UserRegister} />
        <Route path="admin" component={AdminPage} />
        {/*<Route path="create" getcomponent={CreateActivity} onEnter={requireAdminLogin} />*/}
        <Route path="create" component={CreateActivity} onEnter={requireAdminLogin} />
        <Route path="edit" component={EditActivity} onEnter={requireAdminLogin} />
        <Route path="vote-res" component={VoteRes} onEnter={requireAdminLogin} />
        <Route path="score-res" component={ScoreRes} onEnter={requireAdminLogin} />
      </Route>
    </Router>
  )
}

export default RouterApp
