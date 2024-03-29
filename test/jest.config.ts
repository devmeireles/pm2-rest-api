import { resolve } from 'path';
const root = resolve(__dirname, `..`);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rootConfig = require(`${root}/jest.config.js`);

module.exports = {
  ...rootConfig,
  ...{
    rootDir: root,
    displayName: `end2end-tests`,
    setupFilesAfterEnv: [`./test/jest.setup.ts`],
    testMatch: [`<rootDir>/test/**/*.test.ts`],
    coverageDirectory: `<rootDir>/test/coverage`,
    coverageReporters: [`text`, `html`],
  },
};
