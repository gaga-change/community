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
        // for (var i = 0 ; i < 100; i ++) {
        //     const post = new Post(body)
        //     post.author = ctx.session.user
        //     post.title += i
        //     await post.save()
        // }
        await post.save()
        ctx.body = post
    },
    async list(ctx) {
        const {
            page,
            pageSize
        } = ctx.query
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