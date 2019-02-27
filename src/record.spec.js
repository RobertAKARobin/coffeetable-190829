o.spec('Record', ()=>{
	const _ = {}
	o.spec('.create', ()=>{
		o('()', ()=>{
			const record = Record.create()
			o(record.constructor).equals(Record)
			o(record.getCollection()).equals(undefined)
			o(record.getData()).deepEquals(undefined)
		})
		o('(@number)', ()=>{
			const input = 3
			const record = Record.create(input)
			o(record.getData()).equals(input)
		})
		o('(@string)', ()=>{
			const input = 'ayy'
			const record = Record.create(input)
			o(record.getData()).equals(input)
		})
		o('(@record)', ()=>{
			const oldRecord = Record.create({foo: 'bar'})
			const newRecord = Record.create(oldRecord)
			o(newRecord.getData()).equals(oldRecord)
		})
		o('(@array)', ()=>{
			const input = []
			const record = Record.create(input)
			o(record.getData()).equals(input)
		})
		o('(@object)', ()=>{
			const input = {}
			const record = Record.create(input)
			o(record.getData()).equals(input)
		})
		o('(@object{data})', ()=>{
			const input = {foo: 'bar'}
			const record = Record.create(input)
			o(record.getData()).equals(input)
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
			o('(@collection)', ()=>{
				o(_.record.addToCollection(_.collection)).equals(_.record)
				o(_.record.getCollection()).equals(_.collection)
				o(_.collection.getRecords().includes(_.record)).equals(true)
			})
			o('(@notCollection)', ()=>{
				o(()=>_.record.addToCollection()).throws(Error)
				o(()=>_.record.addToCollection('ayy')).throws(Error)
				o(_.record.getCollection()).equals(undefined)
			})
		})
	})
})
