Object.defineProperties(Table, {
	proto: {
		value: Object.defineProperties({}, {
			class: {
				value: Table
			},

			getColumnAt: {
				value: function(index){
					return this.getRows().map(row=>{
						return row.getCells()[index]
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
						rows: this.getRows()
					}
				}
			}
		})
	},

	create: {
		value: (input = {})=>{
			const pvt = {
				rows: [],
				width: 0
			}
			const table = Object.create(Table.proto, {
				createColumn: {
					value: function(place){
						pvt.width += 1
						pvt.rows = pvt.rows.map(row=>{
							const data = row.toJSON()
							data.cells.insert('', place)
							return Row.create(data)
						})
						return this
					}
				},
				createRow: {
					value: function(rowInput = {}, place){
						const row = Row.create(rowInput)
						pvt.rows.place(row, place)
						pvt.width = Math.max(0, pvt.width, (rowInput.cells ? rowInput.cells.length : 0))
						return row
					}
				},
				getRows: {
					value: function(){
						return Array.from(pvt.rows)
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
							pvt.rows = pvt.rows.map(row=>{
								const data = row.toJSON()
								data.cells.splice(place, 1)
								return Row.create(data)
							})
						}
						return this
					}
				},
				removeRow: {
					value: function(place){
						pvt.rows.splice(place, 1)
						return this
					}
				}
			})
			if(input.rows instanceof Array){
				input.rows.forEach(table.createRow.bind(table))
			}
			return table
		}
	}
})
