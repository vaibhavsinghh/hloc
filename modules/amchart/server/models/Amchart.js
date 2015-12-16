var mongoose = require('mongoose');

module.exports = mongoose.model('Amchart', {
	date: {
		type: Date,
		default: Date.now
	},
	open: {
		type: Number,
		default: '',
		trim: true,
		required: 'Open tab cannot be blank'
	},
	high: {
		type: Number
	},
	low: {
		type: Number
	},
	close: {
		type: Number,
		default: '',
		trim: true
	}
});
