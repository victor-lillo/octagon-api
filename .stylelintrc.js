/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-html'],
  rules: {
    'at-rule-empty-line-before': 'always',
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'after-single-line-comment'],
      },
    ],
  },
}
