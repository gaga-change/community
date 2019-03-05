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
router.get('/user/index', tools.auth, pages.userIndex)
router.get('/user/home', tools.auth, pages.userHome)
router.get('/user/set', tools.auth, pages.userSet)
router.get('/user/message', tools.auth, pages.userMessage)
router.get('/post/add', tools.auth, pages.addPost)
router.get('/post/:postId', pages.postDetail)

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
router.get('/api/users/:userId/posts', post.list)

module.exports = router.routes()