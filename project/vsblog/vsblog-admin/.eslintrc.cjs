/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    'prettier' // 一定要在最后
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // 声明element-plus自动导入，报错不提示
  globals: {
    ElMessage: 'readonly',
    ElMessageBox: 'readonly',
    ElLoading: 'readonly',
    ElNotification: 'readonly'
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        // 单引号，无分号，数组后无逗号，防止/>独占一行，换行符无限制
        singleQuote: true,
        semi: false,
        printWidth: 100,
        bracketSameLine: true,
        trailingComma: 'none',
        endOfLine: 'auto'
      }
    ],
    // vue组件忽略多单词名称
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index']
      }
    ],
    // 响应式数据解构不丢失响应式
    'vue/no-setup-props-destructure': ['off'],
    // 未定义变量错误提示
    'no-undef': 'error'
  }
}
