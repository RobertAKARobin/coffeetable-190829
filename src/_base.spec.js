Coffeetable.spec = function(Class, childrenPlural){
	const specs = {
		create: ()=>o.spec('.create', ()=>{
			o('.create()', ()=>{
				const instance = Class.create()
				o(instance.class).equals(Class)
				o(instance.getChildren()).deepEquals([])
			})
			o('.create({$rows})', ()=>{
				const children = [{}, {}, {}]
				const instance = Class.create({[childrenPlural]: children})
				o(instance.class).equals(Class)
				o(instance.getChildren()).deepEquals(children)
			})
		}),

		class: ()=>o('.class', ()=>{
			o(Class.create().class).equals(Class)
		}),
		getChildren: ()=>o('.getChildren()', ()=>{
			o(Class.create().getChildren()).deepEquals([])

			const children = [{}, {}, {}]
			const instance = Class.create({[childrenPlural]: children})
			o(instance.getChildren()).deepEquals(children)
			o(instance.getChildren()).notEquals(children)
		})
	}
	const output = {}
	for(let key in specs){
		output[key] = ()=>{
			specs[key].call(null)
			return output
		}
	}
	return output
}
