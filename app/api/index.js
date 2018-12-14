const router = require('koa-router')()
const pages = require('./pages')
const tools = require('./tools')
const auth = require('./auth')

// page
router.get('/', pages.home)
router.get('/user/reg', pages.userReg)
router.get('/user/login', pages.userLogin)
router.get('/user/logout', pages.logout)

// tools
router.get('/captcha', tools.captcha)

// auth
router.post('/api/user/reg', auth.register)
router.get('/api/user/logout', auth.logout)

module.exports = router.routes()