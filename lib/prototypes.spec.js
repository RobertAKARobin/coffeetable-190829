o.spec('@array', ()=>{
	'use strict'

	o('.flat()', ()=>{
		const a = [['a', 'b'], 'c', ['d', 'e'], 'f']
		o(a.flat()).deepEquals(['a', 'b', 'c', 'd', 'e', 'f'])
	})
	o('.insert()', ()=>{
		o(['a', 'b', 'c', 'd'].insert('x')).deepEquals(['a', 'b', 'c', 'd', 'x'])
		o(['a', 'b', 'c', 'd'].insert('x', 0)).deepEquals(['x', 'a', 'b', 'c', 'd'])
		o(['a', 'b', 'c', 'd'].insert('x', 2)).deepEquals(['a', 'b', 'x', 'c', 'd'])
		o(['a', 'b', 'c', 'd'].insert('x', 200)).deepEquals(['a', 'b', 'c', 'd', 'x'])
		o(['a', 'b', 'c', 'd'].insert('x', -1)).deepEquals(['a', 'b', 'c', 'x', 'd'])
		o(['a', 'b', 'c', 'd'].insert('x', Infinity)).deepEquals(['a', 'b', 'c', 'd', 'x'])
		o(n=>['a', 'b', 'c', 'd'].place('x', 'x')).throws(TypeError)
	})
	o('.place()', ()=>{
		o(['a', 'b', 'c', 'd'].place('x', 0)).deepEquals(['x', 'a', 'b', 'c', 'd'])
		o(['a', 'b', 'c', 'd'].place('a', 2)).deepEquals(['b', 'c', 'a', 'd'])
		o(['a', 'b', 'c', 'd'].place('c', 200)).deepEquals(['a', 'b', 'd', 'c'])
		o(['a', 'b', 'c', 'd'].place('x')).deepEquals(['a', 'b', 'c', 'd', 'x'])
		o(['a', 'b', 'c', 'd'].insert('x', -1)).deepEquals(['a', 'b', 'c', 'x', 'd'])
		o(n=>['a', 'b', 'c', 'd'].place('x', 'x')).throws(TypeError)
	})
	o('.remove()', ()=>{
		const target = {v: 'a'}
		const a = ['a', 'b', target, 'd']
		o(a.remove(target)).equals(target)
		o(a).deepEquals(['a', 'b', 'd'])
	})
	o(`.sortOn()`, ()=>{
		const a = [{v: 'f'}, {v: 'c'}, {v: 'a'}, {v: '3'}, {v: 2}]
		o(a.sortOn(i=>i.v).map(i=>i.v)).deepEquals([2,'3','a','c','f'])
	})
	o('.without()', ()=>{
		const a = [1, 2, 'a', 'b', 5]
		o(a.without(2)).deepEquals([1, 'a', 'b', 5])
	})
})
o.spec('@number', ()=>{
	'use strict'

	o('.map($callback)', ()=>{
		o((5).map(i=>i*2)).deepEquals([0,2,4,6,8])
	})
	o.spec('.times', ()=>{
		o('.times($callback)', ()=>{
			let val = 0;
			(5).times(()=>val+=1)
			o(val).equals(5)
		})
		o('.times($number)', ()=>{
			o((5).times(3)).equals(15)
		})
	})
})
