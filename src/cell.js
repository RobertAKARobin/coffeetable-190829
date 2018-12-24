Object.defineProperties(Cell, {
	name: {
		value: 'Cell'
	},
	pluralName: {
		value: 'cells'
	},

	proto: {
		value: Object.defineProperties({}, {

		})
	},

	create: {
		value: function(input = {}){
			const cell = Object.create(Cell.proto)
			cell.data = input.data
			return cell
		}
	}
})
