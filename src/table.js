Object.defineProperties(Table, {
	child: {
		value: Row
	},
	name: {
		value: 'Table'
	},
	pluralName: {
		value: 'tables'
	},

	proto: {
		value: Object.defineProperties({}, {
			class: {
				value: Table
			},

			getColumnAt: {
				value: function(index){
					return this.getChildren().map(row=>{
						return row.getChildren()[index]
					})
				}
			},
			getColumns: {
				value: function(){
					return this.getWidth().map(this.getColumnAt.bind(this))
				}	
			},
			toJSON: {
				value: function(){
					return {
						rows: this.getChildren()
					}
				}
			}
		})
	},

	create: {
		value: (input = {})=>{
			const pvt = {
				children: [],
				width: 0
			}
			const table = Object.create(Table.proto, {
				createChild: {
					value: function(rowInput = {}, place){
						rowInput.cells = (rowInput.cells || []).pad({}, this.getWidth())
						const row = Row.create(rowInput)
						pvt.children.place(row, place)
						return row
					}
				},
				createChildren: {
					value: function(rowsInput = {}){
						if(rowsInput instanceof Array){
							pvt.width = Math.max(0, ...rowsInput.map(r=>r.cells ? r.cells.length : 0))
							rowsInput.forEach(row=>{
								row.cells = (row.cells || []).pad({}, this.getWidth())
							})
							pvt.children = rowsInput.map(Row.create)
						}
					}
				},
				getChildren: {
					value: function(){
						return Array.from(pvt.children)
					}
				},
				getWidth: {
					value: function(){
						return pvt.width
					}
				}
			})
			table.createChildren(input.rows)
			return table
		}
	}
})
