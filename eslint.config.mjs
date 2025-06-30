import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import nxEslintPlugin from '@nx/eslint-plugin';
import eslintPluginImport from 'eslint-plugin-import';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

export default [
  {
    ignores: ['**/dist'],
  },
  {
    plugins: {
      '@nx': nxEslintPlugin,
      import: eslintPluginImport,
    },
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: 'tsconfig.base.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: false,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  ...compat
    .config({
      plugins: ['@stylistic', '@typescript-eslint', 'import', 'sort-class-members'],
      extends: [
        'eslint:recommended',
        'plugin:@nx/typescript',
        'plugin:@angular-eslint/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
      ],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
      rules: {
        ...config.rules,
        '@stylistic/semi': 'error',
        'import/no-unresolved': ['off'],
        'import/order': [
          'error',
          {
            'newlines-between': 'always',
            groups: [['external', 'builtin'], ['internal'], ['parent', 'sibling', 'index']],
            alphabetize: {
              order: 'asc',
            },
          },
        ],
        'import/no-duplicates': ['error'],
        'import/no-mutable-exports': ['error'],
        '@angular-eslint/sort-lifecycle-methods': ['error'],
        'sort-class-members/sort-class-members': [
          2,
          {
            order: [
              '[static-properties]',
              '[static-methods]',
              '[ng-inputs]',
              '[conventional-private-properties]',
              '[private-readonly-properties]',
              '[private-properties]',
              '[properties]',
              '[ng-outputs]',
              'constructor',
              '[ng-on-changes]',
              '[ng-on-init]',
              '[ng-do-check]',
              '[ng-after-content-init]',
              '[ng-after-content-checked]',
              '[ng-after-view-init]',
              '[ng-after-view-checked]',
              '[ng-on-destroy]',
              '[conventional-private-methods]',
              '[methods]',
              '[private-methods]',
            ],
            accessorPairPositioning: 'setThenGet',
            groups: {
              'ng-inputs': [
                {
                  type: 'property',
                  groupByDecorator: 'Input',
                },
              ],
              'ng-outputs': [
                {
                  type: 'property',
                  groupByDecorator: 'Output',
                },
              ],
              'private-readonly-properties': [
                {
                  type: 'property',
                  accessibility: 'private',
                  readonly: true,
                },
              ],
              'private-properties': [
                {
                  type: 'property',
                  accessibility: 'private',
                  readonly: false,
                  static: false,
                },
              ],
              'private-methods': [
                {
                  type: 'method',
                  accessibility: 'private',
                  static: false,
                },
              ],
              'ng-on-changes': [
                {
                  name: 'ngOnChanges',
                  type: 'method',
                },
              ],
              'ng-on-init': [
                {
                  name: 'ngOnInit',
                  type: 'method',
                },
              ],
              'ng-do-check': [
                {
                  name: 'ngDoCheck',
                  type: 'method',
                },
              ],
              'ng-after-content-init': [
                {
                  name: 'ngAfterContentInit',
                  type: 'method',
                },
              ],
              'ng-after-content-checked': [
                {
                  name: 'ngAfterContentChecked',
                  type: 'method',
                },
              ],
              'ng-after-view-init': [
                {
                  name: 'ngAfterViewInit',
                  type: 'method',
                },
              ],
              'ng-after-view-checked': [
                {
                  name: 'ngAfterViewChecked',
                  type: 'method',
                },
              ],
              'ng-on-destroy': [
                {
                  name: 'ngOnDestroy',
                  type: 'method',
                },
              ],
            },
          },
        ],
      },
      languageOptions: {
        parserOptions: {
          project: ['tsconfig.base.json'],
          createDefaultProgram: true,
        },
      },
    })),
  ...compat
    .config({
      env: {
        jest: true,
      },
    })
    .map((config) => ({
      ...config,
      files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
      rules: {
        ...config.rules,
      },
    })),
  {
    ignores: ['libs/**/*.spec.ts'],
  },
];
