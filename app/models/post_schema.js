const mongoose = require('mongoose')
const only = require('only')

const Schema = mongoose.Schema

/**
 * Post Schema
 */
const PostSchema = new Schema({
    // 创建者
    author: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    class: {
        type: String,
        default: 1,
    }, // 类别
    title: {
        type: String,
        default: '',
        trim: true
    }, // 标题
    content: {
        type: String,
        default: '',
        trim: true
    }, // 主要内容
    project: {
        type: String,
        default: '',
        trim: true
    }, // 产品名称
    version: {
        type: String,
        default: '',
        trim: true
    }, // 社区版本
    browser: {
        type: String,
        default: '',
        trim: true
    } // 浏览器
}, {
    timestamps: true
})

// 验证是否存在
const validatePresenceOf = value => value && value.length

/** 参数验证 */
PostSchema.path('title').validate(v => validatePresenceOf(v), '标题不能为空')
PostSchema.path('content').validate(v => validatePresenceOf(v), '内容不能为空')

/** 实例方法 */
PostSchema.methods = {

}

/** 存储钩子 */
PostSchema.pre('save', function (next) {
    // 待用
    next()
})


/** 静态方法 */
PostSchema.statics = {
    _findOne(opt) {
        return this._findOne(opt.query).select('-markdown')
    },
    _findAll({
        page = 1,
        pageSize = 20,
        select = '-content -markdown',
        criteria = {}
    } = {}) {
        pageSize = Math.min(30, pageSize)
        return this.find(criteria)
            .select(select)
            .sort({
                date: -1
            })
            .limit(pageSize)
            .skip((page - 1) * pageSize)
    },
}

module.exports = mongoose.model('Post', PostSchema)