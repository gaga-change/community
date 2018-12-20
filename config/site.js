
/**
 * 该配置会注入到 全局 state 中
 */

const config = {
    // 产品
    project: process.env.PROJECT || '测试版',
    // 版本
    version: process.env.version || '0.0.0',
    theme: '前端面经'
}

module.exports = config