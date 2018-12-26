o.spec('Table', ()=>{	
	o.spec('.create', ()=>{
		o('.create()', ()=>{
			const table = Table.create()
			o(table.class).equals(Table)
			o(table.getRows()).deepEquals([])
		})
		o('.create({$rows})', ()=>{
			const rows = [{}, {}, {}]
			const table = Table.create({rows: rows})
			o(table.class).equals(Table)
			// o(instance.getChildren()).deepEquals(children)
		})
	})
})
o.spec('@table', ()=>{
	o.spec('.getColumnAt', ()=>{
		o('.getColumnAt($index)', ()=>{
			const table = Table.create(Data)
			o(table.getColumnAt(0).map(c=>c.data)).deepEquals(['ColA', 'aaa', 'fff'])
			o(table.getColumnAt(1).map(c=>c.data)).deepEquals(['ColB', 'bbb', 'ggg'])
			o(table.getColumnAt(2).map(c=>c.data)).deepEquals(['ColC', 'ccc', 'hhh'])
		})
	})
	o('.getColumns()', ()=>{
		const columns = Table.create(Data).getColumns()
		o(columns[0].map(c=>c.data)).deepEquals(['ColA', 'aaa', 'fff'])
		o(columns[1].map(c=>c.data)).deepEquals(['ColB', 'bbb', 'ggg'])
		o(columns[2].map(c=>c.data)).deepEquals(['ColC', 'ccc', 'hhh'])
	})
	o('.getRows()', ()=>{
		o(Table.create().getRows()).deepEquals([])

		const rows = [{}, {}, {}]
		const table = Table.create({rows: rows})
		// o(instance.getChildren()).deepEquals(children)
		o(table.getRows()).notEquals(rows)
	})
	o('.getWidth()', ()=>{
		o(Table.create(Data).getWidth()).equals(5)
		o(Table.create().getWidth()).equals(0)
	})
	o('.toJSON()', ()=>{
		o(JSON.stringify(Table.create())).equals('{\"rows\":[]}')
		o(JSON.stringify(Table.create({rows: [{},{},{}]}))).equals('{\"rows\":[{\"cells\":[]},{\"cells\":[]},{\"cells\":[]}]}')
	})
})
