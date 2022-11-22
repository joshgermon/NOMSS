import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.ts?$': 'ts-jest'
	},
	globals: {
		'ts-jest': {
			useESM: true
		}
	},
	moduleNameMapper: {
		'(.+)\\.js': '$1'
	},
	extensionsToTreatAsEsm: ['.ts'],
	transformIgnorePatterns: ['<rootDir>/node_modules/']
};

export default config;
