// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended', // Reglas base de ESLint
    'plugin:@typescript-eslint/recommended', // Reglas recomendadas para TypeScript
    'plugin:react/recommended', // Reglas recomendadas para React
    'plugin:react/jsx-runtime', // Para el nuevo JSX Transform
    'prettier', // IMPORTANTE: Debe ser el último para desactivar reglas de formato de ESLint
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'], // Solo el tsconfig principal para simplificar
  },
  plugins: [
    '@typescript-eslint',
    'react',
    // No añadimos 'prettier' como plugin aquí para simplificar; 'eslint-config-prettier' ya hace lo principal.
    // Si quieres que los errores de Prettier se muestren como errores de ESLint, añade 'eslint-plugin-prettier'
    // y 'prettier' a plugins, y la regla 'prettier/prettier': 'warn'. Pero para simple, lo omitimos.
  ],
  rules: {
    // Desactivar reglas que TypeScript ya maneja o no son cruciales para una config simple
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn', // Mantener como warning
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],

    // Puedes añadir reglas muy específicas si las necesitas, pero mantenlo simple
    // 'no-console': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.eslintrc.cjs',
    'vite.config.ts', // Opcional, pero a veces útil
  ],
};