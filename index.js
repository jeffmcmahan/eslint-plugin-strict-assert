'use strict' /* eslint-disable */

const validTypeofComparisons = require('./rules/valid-typeof-comparisons.js')
const strictImportOnly = require('./rules/strict-import-only.js')
const noOptionalArguments = require('./rules/no-optional-arguments.js')

const rules = {
    'valid-typeof-comparisons': {
        meta: validTypeofComparisons.meta,
        create: context => ({
            CallExpression: validTypeofComparisons(context)
        })
    },
    'strict-import-only': {
        meta: strictImportOnly.meta,
        create: context => ({
            ImportDeclaration: strictImportOnly(context)
        })
    },
    'no-optional-arguments': {
        meta: noOptionalArguments.meta,
        create: context => ({
            CallExpression: noOptionalArguments(context)
        })
    }
}

module.exports = {rules}