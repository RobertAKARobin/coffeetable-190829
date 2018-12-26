;(function(){
	const oo = Coffeetable.spec(Table)

	o.spec('Table', ()=>{	
		oo.create()
	})
	o.spec('@table', ()=>{
		const _ = {}

		oo.class()

		oo.getChildren()
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
		o('.getWidth()', ()=>{
			const table = Table.create(Data)
			o(table.getWidth()).equals(5)
		})
		o('.toJSON()', ()=>{
			o(JSON.stringify(Table.create())).equals('{\"rows\":[]}')
			o(JSON.stringify(Table.create({rows: [{},{},{}]}))).equals('{\"rows\":[{\"cells\":[]},{\"cells\":[]},{\"cells\":[]}]}')
		})
	})
})();
