// User
// const __APIUSER__ = 'http://192.168.1.217:8080/user'
// const __APIUSER__ = 'http://192.168.1.219:8080/user'
const __APIUSER__ = 'http://192.168.1.219:1111/user'
// const __APIUSER__ = 'http://api.raoul1996.cn/api'
// const __APIUSER__ = 'http://localhost:3000/api'



// Vote
const __APIVOTE__ = 'http://192.168.1.217:1111/vote'
// const __APIVOTE__ = 'http://192.168.1.217:8080/vote'
// Admin
const __APIADMIN__ = 'http://192.168.1.219:1111/admin'
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
  info: voteApiMaker('info'),
    // admin
  changeVisibility: adminApiMaker('changeVisibility'),
  create: adminApiMaker('create'),
  delete: adminApiMaker(':voteid/delete'),
  singleInfo: adminApiMaker(':voteid/info'),
  voteStatistics: adminApiMaker(':voteid/record'),
  pageInfo: adminApiMaker('info?page=pnum&rows=rnum'),
  beforeUpdate: adminApiMaker(':voteid/beforeUpdate'),
  voteUpdate: adminApiMaker('updateVote'),
  downLoad: adminApiMaker(':voteid/download'),
  adminLogin: adminApiMaker('login'),
  findLike: adminApiMaker('findLike'),
  findLikePage:adminApiMaker('findLike?page=pnum&rows=rnum')
}
