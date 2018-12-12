const router = require('koa-router')()
const pages = require('./pages')

router.get('/', pages.home)
router.get('/user/reg', pages.userReg)
router.get('/user/login', pages.userLogin)

module.exports = router.routes()