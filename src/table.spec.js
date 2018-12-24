;(function(){
	const oo = Coffeetable.spec(Table)

	o.spec('Table', ()=>{	
		oo.create()
	})
	o.spec('@table', ()=>{
		const _ = {}

		oo.class()

		oo.getChildren()
		o('.toJSON()', ()=>{
			o(JSON.stringify(Table.create())).equals('{\"rows\":[]}')
			o(JSON.stringify(Table.create({rows: [{},{},{}]}))).equals('{\"rows\":[{\"cells\":[]},{\"cells\":[]},{\"cells\":[]}]}')
		})
	})
})();
