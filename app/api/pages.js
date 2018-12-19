
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
    /** 用户主页 */
    async userIndex(ctx, next) {
        await ctx.render('user/index', ctx.state)
    }
}