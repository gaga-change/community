
module.exports = {
    /** 主页(列表页) */
    async home(ctx, next) {
        await ctx.render('index', {})
    }
}