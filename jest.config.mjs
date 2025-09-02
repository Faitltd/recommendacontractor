/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mjs', 'cjs', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: 'Bundler',
          esModuleInterop: true,
          isolatedModules: true
        }
      }
    ]
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^\\$lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@auth/sveltekit/client$': '<rootDir>/src/test/mocks/auth-sveltekit-client.ts'
  },
  setupFilesAfterEnv: [],
  collectCoverageFrom: ['src/lib/auth/client.ts']
};

export default config;

