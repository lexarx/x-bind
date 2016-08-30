/**
 * Executes the callback function with the values of the observables and
 * does this every time when any observable is changed.
 * @param {Observable|Array<Observable>} observables
 * @param {Function} callback
 * @param {*} [context]
 * @returns {Binding}
 */
function bind(observables, callback, context) {
	const binding = new Binding(observables, callback, context);
	binding.start();
	return binding;
}

/**
 * @class Binding
 * @param {Observable|Array<Observable>} observables
 * @param {Function} callback
 * @param {*} [context]
 */
function Binding(observables, callback, context) {
	this.observables = observables instanceof Array ? observables : [observables];
	this.callback = callback;
	this.context = context;
}

Binding.prototype = {
	start: function() {
		this.values = [];
		this.contexts = [];
		for (var i = 0; i < this.observables.length; i++) {
			var observable = this.observables[i];
			this.values.push(observable.getValue());
			var context = {
				binding: this,
				index: i,
			};
			this.contexts.push(context);
			observable.changed.addListener(this.onValueChanged, context);
		}
		this.executeCallback();
	},

	onValueChanged: function(value) {
		this.binding.values[this.index] = value;
		this.binding.executeCallback();
	},

	executeCallback: function() {
		this.callback.apply(this.context, this.values);
	},

	stop: function() {
		for (var i = 0; i < this.observables.length; i++) {
			this.observables.changed.removeListener(this.onValueChanged, this.contexts[i]);
		}
		this.values = null;
		this.contexts = null;
	}
};

module.exports = bind;