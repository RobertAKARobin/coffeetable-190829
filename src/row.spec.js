o.spec('Row', ()=>{
	o.spec('.create', ()=>{
		o('.create()', ()=>{
			const row = Row.create()
			o(row.class).equals(Row)
			o(row.getCells()).deepEquals([])
		})
		o('.create({$cells})', ()=>{
			const cells = [{}, {}, {}]
			const row = Row.create({cells: cells})
			o(row.class).equals(Row)
			// o(instance.getChildren()).deepEquals(children)
		})
	})
})
o.spec('@row', ()=>{
	o('.getCells()', ()=>{
		o(Row.create().getCells()).deepEquals([])

		const cells = [{}, {}, {}]
		const row = Row.create({cells: cells})
		// o(row.getCells()).deepEquals(cells)
		o(row.getCells()).notEquals(cells)
	})
	o('.getWidth()', ()=>{
		o(Row.create({cells: [{},{},{}]}).getWidth()).equals(3)
	})
	o('.toJSON()', ()=>{
		o(JSON.stringify(Row.create())).equals('{\"cells\":[]}')
		o(JSON.stringify(Row.create({cells: [{},{},{}]}))).equals('{\"cells\":[{},{},{}]}')
	})
})
