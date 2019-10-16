'use strict' /* eslint-disable */

const assert = require('assert').strict

module.exports = context => node => {

    // Here we ensure that assertions are made with a consistent signature --
    // namely with zero optional arguments and always the number required.
    // => undefined

    const {callee, arguments: args} = node
    if (callee.name === 'assert' && args.length !== 1) {
        context.report(node, 'assert() must take exactly 1 argument.')
    }

    else if (!callee.object || callee.object.name !== 'assert') {
        return
    }

    else if (callee.type === 'MemberExpression') {
        const {name} = callee.property
        if (name === 'equal' && args.length !== 2) {
			context.report(node, 'assert.equal() must take exactly 2 arguments.')
        }
        else if (name === 'notEqual' && args.length !== 2) {
            context.report(node, 'assert.notEqual() must take exactly 2 arguments.')
        }
        else if (name === 'deepEqual' && args.length !== 2) {
            context.report(node, 'assert.deepEqual() must take exactly 2 arguments.')
        }
        else if (name === 'notDeepEqual' && args.length !== 2) {
            context.report(node, 'assert.notDeepEqual() must take exactly 2 arguments.')
        }
        else if (name === 'ok' && args.length !== 1) {
            context.report(node, 'assert.ok() must take exactly 1 argument.')
        }
        else if (name === 'ifError' && args.length !== 1) {
            context.report(node, 'assert.ifError() must take exactly 1 argument.')
        }
        else if (name && !(name in assert)) {
            context.report(node, `assert module does not define '${name}'.`)
        }
    }
}

exports.meta = {
	type: 'problem',
	docs: {
		description: 'forbids optional parameters in assertions',
		category: 'Possible Errors',
		recommended: true,
		url: ''
	}
}