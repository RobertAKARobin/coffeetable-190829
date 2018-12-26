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
				const table = Table.create({rows: [
					{cells: [
						{data: 'a'},
						{data: 'b'},
						{data: 'c'}
					]},
					{cells: [
						{data: 'd'},
						{data: 'e'},
						{data: 'f'}
					]},
					{cells: [
						{data: 'g'},
						{data: 'h'},
						{data: 'i'}
					]}
				]})
				o(table.getColumnAt(0).map(c=>c.data)).deepEquals(['a', 'd', 'g'])
				o(table.getColumnAt(1).map(c=>c.data)).deepEquals(['b', 'e', 'h'])
				o(table.getColumnAt(2).map(c=>c.data)).deepEquals(['c', 'f', 'i'])
			})
		})
		o('.toJSON()', ()=>{
			o(JSON.stringify(Table.create())).equals('{\"rows\":[]}')
			o(JSON.stringify(Table.create({rows: [{},{},{}]}))).equals('{\"rows\":[{\"cells\":[]},{\"cells\":[]},{\"cells\":[]}]}')
		})
	})
})();
