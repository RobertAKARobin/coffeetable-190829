;(function(){
	const oo = Coffeetable.spec(Row, 'cells')

	o.spec('Row', ()=>{
		oo.create()
	})
	o.spec('@row', ()=>{
		const _ = {}

		oo.class()
		
		oo.getChildren()
		// o('.toJSON()', ()=>{
		// 	o(JSON.stringify(Table.create())).equals('{\"rows\":[]}')
		// 	o(JSON.stringify(Table.create({rows: [{},{},{}]}))).equals('{\"rows\":[{},{},{}]}')
		// })
	})
})();
