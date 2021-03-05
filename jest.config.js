/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // A list of paths to directories that Jest should use to search for files in
    roots: ['./src'],

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/__spec__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['/node_modules/'],

    // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
    transformIgnorePatterns: ['/node_modules/'],
};
