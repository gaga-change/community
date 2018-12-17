const router = require('koa-router')()
const pages = require('./pages')
const tools = require('./tools')
const auth = require('./auth')
const post = require('./post')

// page
router.use(tools.state)
router.get('/', pages.home)
router.get('/user/reg', pages.userReg)
router.get('/user/login', pages.userLogin)
router.get('/user/logout', pages.logout)
router.get('/post/add',tools.auth, pages.addPost)

// tools
router.get('/captcha', tools.captcha)

// --- auth ---
// 注册
router.post('/api/user/reg', auth.register)
// 退出登录
router.get('/api/user/logout', auth.logout)
// 登录
router.post('/api/user/login', auth.login)

// --- post ---
router.post('/api/posts', post.add)

module.exports = router.routes()