
module.exports = {
    /** 主页(列表页) */
    async home(ctx, next) {
        await ctx.render('index', {})
    },
    /** 登入 */
    async userLogin(ctx, next) {
        await ctx.render('user/login', {})
    },
     /** 注册 */
     async userReg(ctx, next) {
        await ctx.render('user/reg', {})
    }
}