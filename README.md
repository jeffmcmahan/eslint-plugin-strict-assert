# Strict Assert

## strict-import-only

The assert module must imported exactly as follows: 

```js
import {strict as assert} from 'assert'
```

First, this means you won't use the non-strict version by accident (which you shouldn't). Second, it makes it possible to validate all uses of the module by finding `assert()` calls and `assert.methodName` lookup expressions.

## no-optional-arguments

You are permitted to pass *only* the required arguments to the functions provided by the assert module. Optional arguments, no matter how helpful or pleasing you find them, are absolutely forbidden. If only required arguments are passed, it's trivial to spot errant invocations, like the following:

```js
assert.equal(typeof value === 'string')
```

## valid-typeof-comparisons

A call to `assert.equal()` which contains a string literal type name (*e.g.,* `'string'`) must also contain a `typeof` operator. Likewise, if it contains a `typeof` operator and a string literal, that string literal must be the name of a type.