const router = require('koa-router')()
const pages = require('./pages')
const tools = require('./tools')

router.get('/', pages.home)
router.get('/user/reg', pages.userReg)
router.get('/user/login', pages.userLogin)

router.get('/captcha', tools.captcha)
router.get('/test', tools.test)

module.exports = router.routes()