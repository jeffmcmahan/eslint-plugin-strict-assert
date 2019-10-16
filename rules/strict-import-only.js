'use strict' /* eslint-disable */

module.exports = context => node => {

    // Force import to be exactly: import {strict as assert} from 'assert'
    // Note: This discourages aliasing the assertion calls, which makes it 
    // possible to validate those calls throughout the code.
    // => undefined

    // Todo: Examine all assignments and make sure they don't contain 'assert' 
    // on the right side; that would lock down the above, and effectively make
    // assert() static.

    if (node.source.value !== 'assert') {
        return
    }
    const spec = node.specifiers[0]
    if ((!spec)
        || (spec.type !== 'ImportSpecifier') 
        || (spec.imported.name !== 'strict')
        || (spec.local.name !== 'assert')
        || (node.specifiers.length !== 1)
    ) {
        context.report(node, 'Non-strict assert is not allowed. Use: \'import {strict as assert} from \'assert\'')
    }
}

exports.meta = {
	type: 'problems',
	docs: {
		description: 'enforces use of strict assert',
		category: 'Possible Errors',
		recommended: true,
		url: ''
	}
}