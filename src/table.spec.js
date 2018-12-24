o.spec('Table', ()=>{
	o('.name', ()=>{
		o(Table.name).equals('Table')
	})
	o('.pluralName', ()=>{
		o(Table.pluralName).equals('tables')
	})

	o.spec('.create', ()=>{
		o('.create()', ()=>{
			const table = Table.create()
			o(table.class).equals(Table)
			o(table.getChildren()).deepEquals([])
		})
		o('.create({$rows})', ()=>{
			const rows = [
				{}, {}, {}
			]
			const table = Table.create({rows})
			o(table.class).equals(Table)
			o(table.getChildren()).deepEquals(rows)
		})
	})
})
o.spec('@table', ()=>{
	const _ = {}
	o('.class', ()=>{
		o(Table.create().class).equals(Table)
	})

	o('.getChildren()', ()=>{
		o(Table.create().getChildren()).deepEquals([])

		const rows = [
			{}, {}, {}
		]
		const table = Table.create({rows})
		o(table.getChildren()).deepEquals(rows)
		o(table.getChildren()).notEquals(rows)
	})
})
