
module.exports = {
    /** 主页(列表页) */
    async home(ctx, next) {
        ctx.state.user = ctx.session.user
        await ctx.render('index', ctx.state)
    },
    /** 登入 */
    async userLogin(ctx, next) {
        await ctx.render('user/login', {})
    },
    /** 注册 */
    async userReg(ctx, next) {
        await ctx.render('user/reg', {})
    },
    /** 退出登录 */
    async logout(ctx, next) {
        ctx.session.user = null
        ctx.response.redirect('/user/login')
    },
    /** 发表帖子 */
    async addPost(ctx, next) {
        await ctx.render('post/add')
    }
}