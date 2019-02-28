o.spec('Collection', ()=>{
	o.spec('.create', ()=>{
		o('()', ()=>{
			const collection = Collection.create()
			o(collection.constructor).equals(Collection)
			o(collection.getRecords()).deepEquals([])
		})
	})
	o.spec('@collection', ()=>{
		let collection, initialRecords, initialData
		o.beforeEach(()=>{
			collection = Collection.create()
			collection.createRecord()
			initialRecords = collection.getRecords()
			initialData = initialRecords.map(r=>r.getData())
		})
		o.spec('.addRecord', ()=>{
			o('() - error', ()=>{
				o(() => collection.addRecord()).throws(Error)
				o(() => collection.addRecord('ayy')).throws(Error)
			})
			o('(@object) - error', ()=>{

			})
			o('(@record) - adds record', ()=>{

			})
			o('(@collection) - adds all records in collection', ()=>{

			})
			o('(@array[]) - adds no records', ()=>{

			})
			o('(@array[@collection]) - adds all records in all collections', ()=>{

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
			o('() - creates empty record', ()=>{
				const returnValue = collection.createRecord()
				o(returnValue.constructor).equals(Record)
				o(collection.getRecords()).deepEquals(initialRecords.concat(returnValue))
			})
			o('(@number) - creates record with number as data', ()=>{
				const input = 3
				const returnValue = collection.createRecord(input)
				o(returnValue.constructor).equals(Record)
				o(collection.getRecords().length).equals(1)
				o(collection.getRecords().last().getData()).equals(input)
			})
			o('(@object) - creates record with object as data', ()=>{
				const input = {}
				const returnValue = collection.createRecord(input)
				o(returnValue.constructor).equals(Record)
				o(returnValue.getData()).deepEquals(input)
				o(collection.getRecords().last()).equals(returnValue)
			})
			o('(@array[]) - creates no records', ()=>{
				const input = []
				const returnValue = collection.createRecord(input)
				o(returnValue.constructor).equals(Array)
				o(returnValue).deepEquals(input)
				o(collection.getRecords().map(r=>r.getData())).deepEquals(initialData.concat(input))
			})
			o('(@array[@number]) - creates records for each number in array, where data is number', ()=>{
				const input = [1, 2, 3]
				const returnValue = collection.createRecord(input)
				o(returnValue.constructor).equals(Array)
				o(returnValue.map(r=>r.getData())).deepEquals(input)
				o(collection.getRecords().map(r=>r.getData())).deepEquals(initialData.concat(input))
			})
			o('(@record) - creates record that shares original records data', ()=>{
				const inputData = {foo: 'bar'}
				const input = Record.create(inputData)
				const returnValue = collection.createRecord(input)
				o(returnValue).notEquals(input)
				o(returnValue.constructor).equals(Record)
			})
			o('(@collection) - creates record for each record in collection', ()=>{
				const inputData = [1, 2, 3]
				const secondCollection = Collection.create(inputData)
				const returnValue = collection.createRecord(secondCollection)
				o(returnValue.constructor).equals(Array)
				o(returnValue.map(r=>r.getData())).deepEquals(secondCollection.getRecords().map(r=>r.getData()))
				o(collection.getRecords().map(r=>r.getData())).deepEquals(initialData.concat(inputData))
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
