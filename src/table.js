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
			getWidth: {
				value: function(){
					const widths = this.getChildren().map(r=>r.getWidth())
					return Math.max(...widths)
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
				children: []
			}
			const table = Object.create(Table.proto, {
				createChild: {
					value: data=>{
						const row = Row.create(data)
						pvt.children.push(row)
						return row
					}
				},
				getChildren: {
					value: ()=>{
						return Array.from(pvt.children)
					}
				}
			})
			if(input.rows instanceof Array){
				pvt.children = input.rows.map(table.createChild)
			}
			return table
		}
	}
})
