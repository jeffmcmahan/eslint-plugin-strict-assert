'use strict' /* eslint-disable */

const typeofTypes = 'boolean function number string symbol undefined object'

module.exports = context => node => {

	// Here we ensure the if typeof operator is used, that it appears with
	// a string that it can actually produce (above).
	// => undefined

	const {callee} = node
	if (callee.type !== 'MemberExpression') {
		return
	}
	if (callee.property.name === 'equal') {
		
		const hasTypeofLiteral = callee.parent.arguments.some(n => (
			(n.type === 'Literal') &&
			(typeofTypes.includes(n.value))
		))
		const typeofs = callee.parent.arguments.filter(n => (
			(n.type === 'UnaryExpression') &&
			(n.operator === 'typeof')
		))

		// Forgot: "typeof"
		// AS in: assert.equal(value, 'string')
		if (hasTypeofLiteral && (typeofs.length === 0)) {
			context.report(node, 'Missing "typeof".')
		}

		// Mispelled or omitted the string literal naming the type.
		// As in: assert.equal(typeof value, 'str')
		if (!hasTypeofLiteral && (typeofs.length === 1)) {
			context.report(node, 'Missing string literal type ("string", "number", &c.)')
		}
	}

	// Todo: Add a check for the following style:
	// 		 assert(typeof foo === 'string')
	//		 complain that it should use assert.equal() instead.

}

exports.meta = {
	type: 'problems',
	docs: {
		description: 'ensures that typeof comparisons make sense',
		category: 'Possible Errors',
		recommended: true,
		url: ''
	}
}