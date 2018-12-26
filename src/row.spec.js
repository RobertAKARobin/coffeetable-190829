;(function(){
	const oo = Coffeetable.spec(Row)

	o.spec('Row', ()=>{
		oo.create()
	})
	o.spec('@row', ()=>{
		const _ = {}

		oo.class()
		
		oo.getChildren()
		o('.getWidth()', ()=>{
			o(Row.create({cells: [{},{},{}]}).getWidth()).equals(3)
		})
		o('.toJSON()', ()=>{
			o(JSON.stringify(Row.create())).equals('{\"cells\":[]}')
			o(JSON.stringify(Row.create({cells: [{},{},{}]}))).equals('{\"cells\":[{},{},{}]}')
		})
	})
})();
