const User = require('../models/user_schema')
const only = require('only')
const code = require('../code')

module.exports = {

    /**
     * 注册
     * @param {Object} ctx context
     * @returns {void} 返回用户对象
     */
    async register(ctx) {
        const { body } = ctx.request
        ctx.assert(ctx.session.captcha == body.captcha, code.Unauthorized, '验证码错误')
        let user = only(body, 'username password name')
        const findUser = await User.findOne({ username: user.username })

        ctx.assert(!findUser, code.BadRequest, '用户已存在')
        user = new User(user)
        ctx.session.user = user
        ctx.body = await user.save()
    },

    /**
     * 查询用户并绑定到 state
     * @param {Object} ctx context
     * @param {Object} next 后续
     * @returns {void}
     */
    async bind(ctx, next) {
        const { id } = ctx.params
        const user = await User.findById(id)

        ctx.state.user = user
        ctx.assert(ctx.state.user, code.BadRequest, '用户不存在')
        await next()
    },

    /**
     * 查看当前登入用户
     * @param {Object} ctx context
     * @returns {void} 返回用户对象 或 返回空
     */
    async current(ctx) {
        ctx.body = ctx.session.user
    },

    /**
     * 登入
     * @param {Object} ctx context
     * @returns {void} 返回用户对象
     */
    async login(ctx) {
        const { body } = ctx.request
        ctx.assert(ctx.session.captcha == body.captcha, code.Unauthorized, '验证码错误')
        const user = only(body, 'username password')
        const findUser = await User.findOne({ username: user.username })

        ctx.assert(findUser, code.Unauthorized, '邮箱不存在')
        ctx.assert(
            findUser.authenticate(user.password),
            code.Unauthorized, '密码错误'
        )
        ctx.session.user = findUser
        ctx.body = findUser
    },

    /**
     * 退出登入
     * @param {Object} ctx context
     * @returns {void}
     */
    async logout(ctx) {
        ctx.session.user = null
        ctx.body = ''
    },

    /**
     * 修改用户
     * @param {Object} ctx context
     * @returns {void} 返回用户对象
     */
    async put(ctx) {
        const { body } = ctx.request
        const user = only(body, 'username password name')

        // 修改参数
        for (const key in user) {
            if (Reflect.apply(Object.prototype.hasOwnProperty, user, [key])) {
                ctx.state.user[key] = user[key]
            }
        }
        ctx.body = await ctx.state.user.save()
    }
}