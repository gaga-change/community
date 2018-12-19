const Post = require('../models/post_schema')
const only = require('only')
const code = require('../code')


module.exports = {
    async add(ctx) {
        const {
            body
        } = ctx.request
        ctx.assert(ctx.session.captcha == body.captcha, code.Unauthorized, '验证码错误')
        const post = new Post(body)
        post.author = ctx.session.user
        await post.save()
        ctx.body = post
    },
    async list(ctx) {
        const {
            page,
            pageSize
        } = ctx.query
        console.log(page, pageSize)
        const userId = ctx.params.userId
        ctx.body = await Post.findAll({
            criteria: {
                author: userId,
            },
            page,
            pageSize
        })
    }
}