Object.defineProperties(Row, {
	child: {
		value: Cell
	},
	name: {
		value: 'Row'
	},
	pluralName: {
		value: 'rows'
	},

	proto: {
		value: Object.defineProperties({}, {
			class: {
				value: Row
			},

			toJSON: {
				value: function(){
					return {
						cells: this.getChildren()
					}
				}
			}
		})
	},

	create: {
		value: function(input = {}){
			const pvt = {
				children: []
			}
			const row = Object.create(Row.proto, {
				getChildren: {
					value: ()=>{
						return Array.from(pvt.children)
					}
				}
			})
			if(input.cells instanceof Array){
				pvt.children = input.cells.map(Cell.create)
			}
			return row
		}
	}
})
