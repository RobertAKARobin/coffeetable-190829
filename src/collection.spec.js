o.spec('Collection', ()=>{
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
		let collection, initialRecords
		o.beforeEach(()=>{
			collection = Collection.create()
			initialRecords = collection.getRecords()
		})
		o.spec('.addRecord', ()=>{
			o('(@record)', ()=>{
				const record = Record.create()
				o(collection.addRecord(record)).equals(collection)
				o(collection.getRecords()).deepEquals([record])
				o(collection.getRecords().length).equals(initialRecords.length + 1)
			})
			o('(@notRecord)', ()=>{
				o(()=>collection.addRecord()).throws(Error)
				o(()=>collection.addRecord('ayy')).throws(Error)
				o(collection.getRecords()).deepEquals(initialRecords)
			})
		})
		o.spec('.createRecord', ()=>{
			o('()', ()=>{
				const record = collection.createRecord()
				o(record.getCollection()).equals(collection)
				o(collection.getRecords().includes(record)).equals(true)
				o(collection.getRecords().indexOf(record)).equals(initialRecords.length)
				o(collection.getRecords().length).equals(initialRecords.length + 1)
			})
		})
		o.spec('.removeRecord', ()=>{
			o('() when no existing records', ()=>{
				o(collection.removeRecord()).equals(collection)
				o(collection.getRecords()).deepEquals(initialRecords)
			})
			o.spec('when has existing records', ()=>{
				let record
				o.beforeEach(()=>{
					record = collection.createRecord()
					initialRecords = collection.getRecords()
				})
				o('()', ()=>{
					o(collection.removeRecord()).equals(collection)
					o(collection.getRecords()).deepEquals(initialRecords)
				})
				o('(@notRecord)', ()=>{
					o(collection.removeRecord('ayy')).equals(collection)
					o(collection.getRecords()).deepEquals(initialRecords)
				})
				o('(@record)', ()=>{
					o(collection.removeRecord(record)).equals(collection)
					o(collection.getRecords()).notDeepEquals(initialRecords)
					o(collection.getRecords().includes(record)).equals(false)
				})
			})
		})
	})
})
