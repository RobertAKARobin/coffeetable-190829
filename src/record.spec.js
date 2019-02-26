o.spec('Record', ()=>{
	o.spec('.create', ()=>{
		o('()', ()=>{

		})
		o('(@number)', ()=>{

		})
		o('(@record)', ()=>{
			const originalRecord = Record.create()
			const newRecord = Record.create(originalRecord)
		})
		o('(@array[])', ()=>{

		})
		o('(@array[@number])', ()=>{

		})
		o('(@array[@record])', ()=>{

		})
		o('(@array[@self])', ()=>{

		})
		o('(@object)', ()=>{

		})
		o('(@object{data})', ()=>{

		})
		o('(@object{a: {b: self}})', ()=>{

		})
	})
})
o.spec('@record', ()=>{
})
