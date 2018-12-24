Object.defineProperties(Table, {
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
			}
		})
	},

	create: {
		value: (input = {})=>{
			const pvt = {
				children: []
			}
			const table = pvt.instance = Object.create(Table.proto, {
				getChildren: {
					value: ()=>{
						return Array.from(pvt.children)
					}
				}
			})
			if(input.rows instanceof Array){
				pvt.children = input.rows
			}
			return table
		}
	}
})
