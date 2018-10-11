module.exports = {
    "extends": "airbnb",
    "globals": {
        "document": true,
        "window": true
    },
    "rules": {
        "indent": ["error", 4, { "SwitchCase": 1 }],
        // 单引号还是双引号
        "quotes": ["error", "double"],

        // JSX 标签的空格
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],
        // JSX 里不能使用bind, 可以使用箭头函数
        "react/jsx-no-bind": [2, {"allowArrowFunctions": true}],
        // 禁止使用html保留字标签
        "react/no-unknown-property": 2,
        // 禁止重复的props
        "react/jsx-no-duplicate-props": 2,
        // 在JSX中关闭括号之前验证间距
        "react/jsx-tag-spacing": [2, {"beforeSelfClosing": "always"}],
        // 在JSX属性中强制或禁止花括号中的空格
        "react/jsx-curly-spacing": [2, "never"],
        // 不能直接修改this.state
        "react/no-direct-mutation-state": 2,
    }
};