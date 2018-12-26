Object.defineProperties(Cell, {
	proto: {
		value: Object.defineProperties({}, {
			class: {
				value: Cell
			}
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
