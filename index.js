'use strict' /* eslint-disable */

// Todo: if one argument is 'string' or 'number' or the like, check whether 
//       the other contains "typeof", warn if not.

const assert = require('assert').strict

const callConstraints = context => node => {

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
            context.report(node, `assert module does not define "${name}".`)
        }
    }
}

const importConstraints = context => node => {

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
        context.report(node, 'Non-strict assert is not allowed. Use: "import {strict as assert} from \'assert\'"')
    }
}

module.exports = {
    rules: {
        "strict-import-only": {
            meta: {
                type: 'problems',
                docs: {
                    description: 'enforces use of strict assert',
                    category: "Possible Errors",
                    recommended: true,
                    url: ''
                }
            },
            create: context => ({
                ImportDeclaration: importConstraints(context)
            })
        },
        "no-optional-arguments": {
            "meta": {
                type: "problem",
                docs: {
                    description: 'forbids optional parameters in assertions',
                    category: "Possible Errors",
                    recommended: true,
                    url: ''
                }
            },
            create: context => ({
                CallExpression: callConstraints(context)
            })
        }
    }
}