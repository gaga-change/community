const Post = require('../models/post_schema')

module.exports = {
    /** 主页(列表页) */
    async home(ctx, next) {
        ctx.state.user = ctx.session.user
        await ctx.render('index', ctx.state)
    },
    /** 登入 */
    async userLogin(ctx, next) {
        await ctx.render('user/login', ctx.state)
    },
    /** 注册 */
    async userReg(ctx, next) {
        await ctx.render('user/reg', ctx.state)
    },
    /** 退出登录 */
    async logout(ctx, next) {
        ctx.session.user = null
        ctx.redirect('/user/login', ctx.state)
    },
    /** 发表帖子 */
    async addPost(ctx, next) {
        await ctx.render('post/add', ctx.state)
    },
    /** 帖子主页 */
    async postIndex(ctx, next) {
        await ctx.render('post/index', ctx.state)
    },
    /** 用户中心 */
    async userIndex(ctx, next) {
        await ctx.render('user/index', ctx.state)
    },
    /** 用户主页 */
    async userHome(ctx, next) {
        await ctx.render('user/home', ctx.state)
    },
    /** 用户设置 */
    async userSet(ctx, next) {
        await ctx.render('user/set', ctx.state)
    },
    /** 用户消息 */
    async userMessage(ctx, next) {
        await ctx.render('user/message', ctx.state)
    },
    /** 帖子详情 */
    async postDetail(ctx, next) {
        const postId = ctx.params.postId
        ctx.state.post = await Post.findById(postId).populate('author')
        
        console.log(ctx.state.post, postId)
        await ctx.render('post/detail', ctx.state)
    }
}