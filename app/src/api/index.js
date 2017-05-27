// User
// const __APIUSER__ = 'http://192.168.1.217:8080/user'
// const __APIUSER__ = 'http://192.168.1.219:8080/user'
const __APIUSER__ = 'http://123.207.171.244:8080/voter/user'
// const __APIUSER__ = 'http://api.raoul1996.cn/api'
// const __APIUSER__ = 'http://localhost:3000/api'



// Vote
const __APIVOTE__ = 'http://123.207.171.244:8080/voter/vote'
// const __APIVOTE__ = 'http://192.168.1.217:8080/vote'
// Admin
const __APIADMIN__ = 'http://123.207.171.244:8080/voter/admin'
// const __APIADMIN__ = 'http://192.168.1.219:8080/admin'

const userApiMaker = (path) => {
  return `${__APIUSER__}/${path}`
}
const voteApiMaker = (path) => {
  return `${__APIVOTE__}/${path}`
}
const adminApiMaker = (path) => {
  return `${__APIADMIN__}/${path}`
}

export default {
  // user
  register: userApiMaker('register'),
  login: userApiMaker('login'),
  verify: userApiMaker('verify'),
  logout: userApiMaker('logout'),
  forget: userApiMaker('forget'),
  password:userApiMaker('password'),
  changeMobile: userApiMaker('changeMobile'),
  changeSex: userApiMaker('changeSex'),
    // vote
  info: voteApiMaker('all?page=pnum&rows=rnum'),
  haveVote: voteApiMaker('haveVoted'),
  voteInfo:voteApiMaker('info?voteId=voteid'),

  // admin
  changeVisibility: adminApiMaker(':voteId/changeVisibility'),
  create: adminApiMaker('create'),
  delete: adminApiMaker(':voteId/delete'),
  singleInfo: adminApiMaker(':voteId/info'),
  pageInfo: adminApiMaker('info?page=pnum&rows=rnum'),
  record: adminApiMaker(':voteId/record'),
  beforeUpdate: adminApiMaker(':voteId/beforeUpdate'),
  updateVote: adminApiMaker('updateVote'),
  adminLogin: adminApiMaker('login'),
  findLike: adminApiMaker('findLike'),
  findLikePage:adminApiMaker('findLike?page=pnum&rows=rnum')
}
