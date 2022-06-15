module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es2021": true, // 添加所有 ECMAScript 2021 全局变量并自动将 ecmaVersion 解析器选项设置为 12
        "node": true,
    },
    "parser": 'vue-eslint-parser',
    "extends": [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        "eslint:recommended",
        "plugin:prettier/recommended"
    ],
    "parserOptions": {
        "parser": '@typescript-eslint/parser',
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        '@typescript-eslint'
    ],
    "rules": {
        // 禁止出现未使用过的变量
        'no-unused-vars': 'error',
        // 缩进使用 4 个空格，并且 switch 语句中的 Case 需要缩进
        'indent': ['warn', 4, {
            'SwitchCase': 1,
            'flatTernaryExpressions': true
        }],
        // 只有一个参数时，箭头函数体可以省略圆括号
        'arrow-parens': 'off',
        // vue componentName
        'vue/multi-word-component-names': 0,
        "no-unused-vars": 0,
        "no-undef": 0,
    }
}
