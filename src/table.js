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
						const row = Row.create(rowInput)
						pvt.children.place(row, place)
						pvt.width = Math.max(0, pvt.width, (rowInput.cells ? rowInput.cells.length : 0))
						return row
					}
				},
				createColumn: {
					value: function(place){
						pvt.width += 1
						pvt.children = pvt.children.map(row=>{
							const data = row.toJSON()
							data.cells.insert('', place)
							return Row.create(data)
						})
						return this
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
				},
				removeColumn: {
					value: function(place){
						if(pvt.width !== 0){
							pvt.width -= 1
							pvt.children = pvt.children.map(row=>{
								const data = row.toJSON()
								data.cells.splice(place, 1)
								return Row.create(data)
							})
						}
						return this
					}
				},
				removeChild: {
					value: function(place){
						pvt.children.splice(place, 1)
						return this
					}
				}
			})
			if(input.rows instanceof Array){
				input.rows.forEach(table.createChild.bind(table))
			}
			return table
		}
	}
})
