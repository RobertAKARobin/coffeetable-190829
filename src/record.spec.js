o.spec('Record', ()=>{
	const _ = {}
	o.spec('.create', ()=>{
		o('()', ()=>{
			const record = Record.create()
			o(record.constructor).equals(Record)
		})
		o('(@number)', ()=>{

		})
		o('(@record)', ()=>{
			
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
	o.spec('@record', ()=>{
		o.beforeEach(()=>{
			_.record = Record.create()
		})
		o.spec('.addToCollection', ()=>{
			o.beforeEach(()=>{
				_.collection = Collection.create()
			})
			o('()', ()=>{
				o(_.record.addToCollection()).equals(_.record)
				o(_.record.getCollection()).equals(undefined)
				o(_.collection.getRecords().includes(_.record)).equals(false)
			})
			o('(@collection)', ()=>{
				o(_.record.addToCollection(_.collection)).equals(_.record)
				o(_.record.getCollection()).equals(_.collection)
				o(_.collection.getRecords().includes(_.record)).equals(true)
			})
		})
	})
})
