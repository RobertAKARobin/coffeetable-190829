o.spec('Collection', ()=>{
	const _ = {}
	o.spec('.create', ()=>{
		o('()', ()=>{
			const collection = Collection.create()
			o(collection.constructor).equals(Collection)
		})
		o('(@number)', ()=>{

		})
		o('(@collection)', ()=>{

		})
		o('(@array[])', ()=>{

		})
		o('(@array[@number])', ()=>{

		})
		o('(@array[@collection])', ()=>{

		})
		o('(@array[self])', ()=>{

		})
		o('(@object{})', ()=>{

		})
		o('(@object{data})', ()=>{

		})
		o('(@object{a: {b: self}})', ()=>{

		})
	})
	o.spec('@collection', ()=>{
		o.beforeEach(()=>{
			_.collection = Collection.create()
		})
		o.spec('.addRecord', ()=>{
			o.beforeEach(()=>{
				_.initialRecords = _.collection.getRecords()
			})
			o('(@record)', ()=>{
				const record = Record.create()
				o(_.collection.addRecord(record)).equals(_.collection)
				o(_.collection.getRecords()).deepEquals([record])
			})
			o('(@notRecord)', ()=>{
				o(()=>_.collection.addRecord()).throws(Error)
				o(()=>_.collection.addRecord('ayy')).throws(Error)
				o(_.collection.getRecords()).deepEquals(_.initialRecords)
			})
		})
		o.spec('.createRecord', ()=>{
			o('()', ()=>{
				const record = _.collection.createRecord()
				o(record.getCollection()).equals(_.collection)
				o(_.collection.getRecords().includes(record)).equals(true)
				o(_.collection.getRecords().indexOf(record)).equals(_.initialRecords.length)
				o(_.collection.getRecords().length).equals(_.initialRecords.length + 1)
			})
		})
	})
})
