Object.defineProperties(Row, {
	proto: {
		value: Object.defineProperties({}, {
			class: {
				value: Row
			},

			getWidth: {	
				value: function(){
					return this.getCells().length
				}
			},
			toJSON: {
				value: function(){
					return {
						cells: this.getCells()
					}
				}
			}
		})
	},

	create: {
		value: function(input = {}){
			const pvt = {
				cells: []
			}
			const row = Object.create(Row.proto, {
				getCells: {
					value: function(){
						return Array.from(pvt.cells)
					}
				}
			})
			if(input.cells instanceof Array){
				pvt.cells = input.cells.map(Cell.create)
			}
			return row
		}
	}
})
