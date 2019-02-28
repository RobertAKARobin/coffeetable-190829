o.spec('Collection', ()=>{
	o.spec('.create', ()=>{
		o('()', ()=>{
			const collection = Collection.create()
			o(collection.constructor).equals(Collection)
			o(collection.getRecords()).deepEquals([])
		})
		o('(@number)', ()=>{
			const input = 3
			const collection = Collection.create(input)
			o(collection.getRecords().length).equals(1)
			o(collection.getRecords().first().getData()).equals(input)
		})
		o('(@collection)', ()=>{
			const inputData = [1, 2, 3]
			const input = Collection.create(inputData)
			const collection = Collection.create(input)
			o(collection.getRecords().map(r=>r.getData())).deepEquals(inputData)
		})
		o('(@array[])', ()=>{
			const input = []
			const collection = Collection.create(input)
			o(collection.getRecords()).deepEquals([])
		})
		o('(@array[@number])', ()=>{
			const input = [1, 2, 3]
			const collection = Collection.create(input)
			o(collection.getRecords().map(r=>r.getData())).deepEquals(input)
		})
		o('(@array[@collection])', ()=>{
			const input = [Collection.create(), Collection.create(), Collection.create()]
			const collection = Collection.create(input)
			// ?
		})
		o('(@object{})', ()=>{
			const input = {}
			const collection = Collection.create(input)
			o(collection.getRecords().map(r=>r.getData())).deepEquals([input])
		})
	})
	o.spec('@collection', ()=>{
		let collection, initialRecords
		o.beforeEach(()=>{
			collection = Collection.create()
			collection.createRecord()
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
					o(collection.getRecords()).deepEquals(initialRecords.concat(record))
					o(collection.getRecords().length).equals(initialRecords.length + 1)
				})
			})
			o.spec('when record has existing collection', ()=>{
				o('(@record)', ()=>{
					const secondCollection = Collection.create()
					const secondCollectionInitialRecords = secondCollection.getRecords()
					const record = Record.create()
					collection.addRecord(record)
					secondCollection.addRecord(record)
					o(collection.getRecords()).deepEquals(initialRecords)
					o(record.getCollection()).notEquals(collection)
					o(secondCollection.getRecords()).deepEquals(secondCollectionInitialRecords.concat(record))
					o(record.getCollection()).equals(secondCollection)
				})
				o('(@recordThatBelongsToCollection)', ()=>{
					const record = collection.createRecord()
					collection.addRecord(record)
					o(collection.getRecords()).deepEquals(initialRecords.concat(record))
				})
			})
		})
		o.spec('.createRecord', ()=>{
			o('()', ()=>{
				const record = collection.createRecord()
				o(record.getCollection()).equals(collection)
				o(collection.getRecords()).deepEquals(initialRecords.concat(record))
				o(collection.getRecords().indexOf(record)).equals(initialRecords.length)
				o(collection.getRecords().length).equals(initialRecords.length + 1)
			})
			o('(@object)', ()=>{
				const input = {foo: 'bar'}
				const record = collection.createRecord(input)
				o(collection.getRecords()).deepEquals(initialRecords.concat(record))
				o(record.getData()).equals(input)
			})
			o('(@record)', () => {
				const existingRecord = Record.create()
				const record = collection.createRecord(existingRecord)
				o(record.getCollection()).equals(collection)
				o(record.getData()).equals(existingRecord)
				o(collection.getRecords()).deepEquals(initialRecords.concat(record))
			})
			o('(@recordThatBelongsToCollection)', ()=>{
				const firstRecord = collection.createRecord()
				const secondRecord = collection.createRecord(firstRecord)
				o(secondRecord.getCollection()).equals(collection)
				o(secondRecord.getData()).equals(firstRecord)
				o(collection.getRecords()).deepEquals(initialRecords.concat(firstRecord, secondRecord))
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
					o(collection.getRecords()).deepEquals(initialRecords.without(record))
				})
			})
		})
	})
})
