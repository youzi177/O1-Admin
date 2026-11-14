import { definePrompt } from 'cz-git'

export default definePrompt({
  alias: {
    fd: 'docs: fix typos', // 快速输入 fd 即可提交文档拼写修复
  },
  messages: {
    type: '选择你要提交的类型:',
    scope: '选择一个提交范围（可选）:',
    customScope: '请输入自定义的提交范围:',
    subject: '填写简短精炼的变更描述:\n',
    body: '填写更详细的变更描述 (可选)。使用 "|" 换行:\n',
    breaking: '列举非兼容性重大变更 (可选):\n',
    footerPrefixesSelect: '选择关联的 issue 类型 (可选):',
    customFooterPrefix: '输入 issue 前缀:',
    footer: '填写关联的 issue，例如: #31, #34:\n',
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
    { value: 'revert', name: 'revert:   回退', emoji: ':rewind:' },
  ],
  useEmoji: true, // 启用 emoji
  allowCustomScopes: true,
  allowEmptyScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'footer'], // 跳过详细描述和 issue 关联，加快提交
  issuePrefixes: [
    { value: 'closed', name: 'closed:   已关闭' },
    { value: 'fix', name: 'fix:      关联修复' },
  ],
})
