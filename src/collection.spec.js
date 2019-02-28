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
			o('()', ()=>{
				o(() => collection.addRecord()).throws(Error)
				o(() => collection.addRecord('ayy')).throws(Error)
				o(collection.getRecords()).deepEquals(initialRecords)
			})
			o.spec('when record has no existing collection', ()=>{
				o('(@record)', ()=>{
					const record = Record.create()
					const returnValue = collection.addRecord(record)
					o(returnValue).equals(collection)
					o(collection.getRecords()).deepEquals([record])
					o(collection.getRecords().length).equals(initialRecords.length + 1)
				})
			})
			o.spec('when record has existing collection', ()=>{
				o('(@record)', ()=>{
					const firstCollection = collection
					const secondCollection = Collection.create()
					const record = Record.create()
					firstCollection.addRecord(record)
					secondCollection.addRecord(record)
					o(firstCollection.getRecords()).deepEquals([])
					o(record.getCollection()).notEquals(firstCollection)
					o(secondCollection.getRecords()).deepEquals([record])
					o(record.getCollection()).equals(secondCollection)
				})
				o('(@recordThatBelongsToCollection)', ()=>{
					const record = collection.createRecord()
					collection.addRecord(record)
					o(collection.getRecords()).deepEquals([record])
				})
			})
		})
		o.spec('.createRecord', ()=>{
			o('()', ()=>{
				const record = collection.createRecord()
				o(record.getCollection()).equals(collection)
				o(collection.getRecords()).deepEquals([record])
				o(collection.getRecords().indexOf(record)).equals(initialRecords.length)
				o(collection.getRecords().length).equals(initialRecords.length + 1)
			})
			o('(@object)', ()=>{
				const input = {foo: 'bar'}
				const record = collection.createRecord(input)
				o(collection.getRecords()).deepEquals([record])
				o(record.getData()).equals(input)
			})
			o('(@record)', () => {
				const firstRecord = Record.create()
				const secondRecord = collection.createRecord(firstRecord)
				o(secondRecord.getCollection()).equals(collection)
				o(secondRecord.getData()).equals(firstRecord)
				o(collection.getRecords()).deepEquals([secondRecord])
			})
			o('(@recordThatBelongsToCollection)', ()=>{
				const firstRecord = collection.createRecord()
				const secondRecord = collection.createRecord(firstRecord)
				o(secondRecord.getCollection()).equals(collection)
				o(secondRecord.getData()).equals(firstRecord)
				o(collection.getRecords()).deepEquals([firstRecord, secondRecord])
			})
		})
		o.spec('.removeRecord', ()=>{
			o.spec('when no existing records', ()=>{
				o('()', ()=>{
					const returnValue = collection.removeRecord()
					o(returnValue).equals(collection)
					o(collection.getRecords()).deepEquals(initialRecords)
				})
			})
			o.spec('when has existing records', ()=>{
				let record
				o.beforeEach(()=>{
					record = collection.createRecord()
					initialRecords = collection.getRecords()
				})
				o('()', ()=>{
					const returnValue = collection.removeRecord()
					o(returnValue).equals(collection)
					o(collection.getRecords()).deepEquals(initialRecords)
				})
				o('(@notRecord)', ()=>{
					collection.removeRecord('ayy')
					o(collection.getRecords()).deepEquals(initialRecords)
				})
				o('(@record)', ()=>{
					collection.removeRecord(record)
					o(collection.getRecords()).deepEquals([])
				})
			})
		})
	})
})
