var svgCaptcha = require('svg-captcha')
svgCaptcha.options.height = 38
module.exports = {
    /** 发送验证码图片，文本保存在session中 */
    async captcha(ctx, next) {
        var captch = svgCaptcha.create({color: true})
        ctx.session.captcha = captch.text.toLocaleLowerCase()
        ctx.type = 'svg'
        ctx.body = captch.data
    },
    /** 页面登入校验。未登录跳转到登录页面 */
    async auth(ctx, next) {
        if (ctx.session.user) {
            return next()
        } else {
           return ctx.response.redirect('/user/login')
        }
    },
    /** 将相关参数绑定到 state 上 */
    async state(ctx, next) {
        ctx.state.user = ctx.session.user
        return next()
    }
}