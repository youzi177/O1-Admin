// commitlint.config.ts
import { defineConfig } from 'cz-git'

export default defineConfig({
  extends: ['@commitlint/config-conventional'],
  rules: {
    // commitlint 规则可放在这里，也可以单独配置
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
  },
  prompt: {
    messages: {
      type: '选择你要提交的类型:',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围:',
      subject: '填写简短精炼的变更描述:\n',
      body: '填写更详细的变更描述 (可选)。使用 "|" 换行:\n',
      breaking: '列举非兼容性重大变更 (可选):\n',
      footer: '关联关闭的 issue (可选)，例如: #31, #34:\n',
      confirmCommit: '确认提交?',
    },
    types: [
      { value: 'feat', name: 'feat:     新功能', emoji: ':sparkles:' },
      { value: 'fix', name: 'fix:      修复Bug', emoji: ':bug:' },
      { value: 'docs', name: 'docs:     文档变更', emoji: ':memo:' },
      { value: 'style', name: 'style:    代码格式（不影响功能）', emoji: ':lipstick:' },
      { value: 'refactor', name: 'refactor: 重构', emoji: ':recycle:' },
      { value: 'perf', name: 'perf:     性能优化', emoji: ':zap:' },
      { value: 'test', name: 'test:     增加测试', emoji: ':white_check_mark:' },
      { value: 'build', name: 'build:    构建系统或外部依赖变更', emoji: ':package:' },
      { value: 'ci', name: 'ci:       CI 配置文件和脚本变更', emoji: ':ferris_wheel:' },
      { value: 'chore', name: 'chore:    其他杂务', emoji: ':hammer:' },
      { value: 'revert', name: 'revert:   回退  ', emoji: ':rewind:' },
    ],
    useEmoji: true, // 让提交信息包含 emoji
    allowCustomScopes: true, //是否允许提交时 不填写 scope（即 scope 为空）
    allowEmptyScopes: true,
    allowBreakingChanges: ['feat', 'fix'], //交互流程会额外提问：“是否存在破坏性变更？”
    skipQuestions: ['body', 'footer'], // 可根据需要跳过一些不常用的问题
  },
})
