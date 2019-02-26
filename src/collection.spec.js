o.spec('Collection', ()=>{
	o.spec('.create', ()=>{
		o('()', ()=>{
			const collection = Collection.create()
			o(collection.class).equals(Collection)
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
})
o.spec('@collection', ()=>{
	const _ = {}
	o.beforeEach(()=>{
		_.collection = Collection.create()
	})
	o.spec('.createRecord', ()=>{
		o.beforeEach(()=>{
			_.initialNumberOfRecords = _.collection.getRecords().length
		})
		o('()', ()=>{
			const record = _.collection.createRecord()
			o(record.collection).equals(_.collection)
			o(_.collection.getRecords().includes(record)).equals(true)
			o(_.collection.getRecords().indexOf(record)).equals(_.initialNumberOfRecords)
			o(_.collection.getRecords().length).equals(_.initialNumberOfRecords + 1)
		})
		o('(self)', ()=>{
			
		})
		o('(@array[])', ()=>{

		})
		o('(@array[@record])', ()=>{

		})
		o('(@array[self.@record])', ()=>{

		})
	})
})
