var svgCaptcha = require('svg-captcha')

module.exports = {
    /** 发送验证码图片，文本保存在session中 */
    async captcha(ctx, next) {
        var captch = svgCaptcha.create()
        ctx.session.captcha = captch.text.toLocaleLowerCase()
        ctx.type = 'svg'
        ctx.body = captch.data
    }
}