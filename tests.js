'use strict' /* eslint-disable */

const rules = require('./index.js')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2019
	}
})

ruleTester.run('valid-typeof-comparisons', rules['valid-typeof-comparisons'], {
    valid: [
		{code: `assert.equal(typeof value, 'string')`},
    ],
    invalid: [
		{
			code: `assert.equal(value, 'string')`,
			errors: [{message: /^missing "typeof"/i}]
		},
		{
			code: `assert.equal(typeof value, 'strng')`,
			errors: [{message: /^missing string literal type/i}]
		}
    ]
})

ruleTester.run('strict-import-only', module.exports.rules['strict-import-only'], {
    valid: [
        {
            code: `import {strict as assert} from 'assert'`,
            options: []
        }
    ],
    invalid: [
        {
            code: "import * as assert from 'assert'",
            errors: [{message: /^Non-strict assert is not allowed/}]
        },
        {
            code: "import {strict as asserter} from 'assert'",
            errors: [{message: /^Non-strict assert is not allowed/}]
        }
    ]
})

ruleTester.run('no-optional-arguments', module.exports.rules['no-optional-arguments'], {
    valid: [
        {code: `assert(any == single === statement)`},
		{code: `assert.equal(anyTwo, args)`},
    ],
    invalid: [
        {
            code: "assert(1, 2)",
            errors: [{message: /^assert\(\) must take exactly 1 argument/}]
        }
    ]
})