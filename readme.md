# Bind

Bind is a JavaScript library for data binding.

## Examples

```js
var Observable = require('x-observable');
var bind = require('x-bind');

var a = new Observable('a');
var b = new Observable('b');
bind([a, b], function(a, b) {
	console.log(a + b);
});
a.setValue('A');
b.setValue('B');

// Prints 'ab', 'Ab', 'AB'.
```

## Installation

```sh
npm install --save x-bind
```