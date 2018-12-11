const router = require('koa-router')()
const pages = require('./pages')

router.get('/', pages.home)

module.exports = router.routes()