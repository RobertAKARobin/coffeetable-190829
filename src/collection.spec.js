o.spec('Collection', ()=>{
	o.spec('.create', ()=>{
		o('()', ()=>{
			const collection = Collection.create()
			o(collection.constructor).equals(Collection)
			o(collection.getRecords()).deepEquals([])
		})
	})
	o.spec('@collection', ()=>{
		let collection, initialRecords, initialData, secondCollection, secondCollectionInitialRecords, secondCollectionInitialData
		o.beforeEach(()=>{
			collection = Collection.create()
			collection.createRecord({foo: 'bar'})
			initialRecords = collection.getRecords()
			initialData = initialRecords.map(r=>r.getData())
			secondCollection = Collection.create()
			secondCollection.createRecord({foo: 'bar'})
			secondCollectionInitialRecords = secondCollection.getRecords()
			secondCollectionInitialData = secondCollectionInitialRecords.map(r=>r.getData())
		})
		o.spec('.addRecord', ()=>{
			let record
			o.beforeEach(()=>{
				record = Record.create()
			})
			o('() - error', ()=>{
				o(()=>collection.addRecord()).throws(Error)
			})
			o('(@object) - error', ()=>{
				const input = {}
				o(()=>collection.addRecord(input)).throws(Error)
			})
			o('(@record) - adds record', ()=>{
				const returnValue = collection.addRecord(record)
				o(returnValue).equals(collection)
				o(collection.getRecords()).deepEquals(initialRecords.concat(record))
				o(collection.getRecords().length).equals(initialRecords.length + 1)
			})
			o('(@recordThatBelongsToOtherCollection) - adds to this, removes from that', ()=>{
				collection.addRecord(record)
				secondCollection.addRecord(record)
				o(collection.getRecords()).deepEquals(initialRecords)
				o(record.getCollection()).notEquals(collection)
				o(secondCollection.getRecords()).deepEquals(secondCollectionInitialRecords.concat(record))
				o(record.getCollection()).equals(secondCollection)
			})
			o('(@recordThatBelongsToSameCollection) - no change', ()=>{
				collection.addRecord(record)
				collection.addRecord(record)
				o(collection.getRecords()).deepEquals(initialRecords.concat(record))
				o(record.getCollection()).equals(collection)
			})
			o('(@collection) - adds all records in collection', ()=>{
				collection.addRecord(secondCollection)
				o(collection.getRecords().map(r=>r.getData())).deepEquals(secondCollectionInitialData)
				o(secondCollectionInitialRecords.map(r=>r.getCollection())).deepEquals(secondCollectionInitialRecords.length.times(collection))
			})
			o('(@array[]) - adds no records', ()=>{
				const input = []
				collection.addRecord(input)
				o(collection.getRecords()).deepEquals(initialRecords)
			})
			o('(@array[@record])', ()=>{
				const input = [record]
				collection.addRecord(input)
				o(collection.getRecords()).deepEquals(initialRecords.concat(record))
			})
			o('(@array[@collection]) - adds all records in all collections', ()=>{

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
				o(collection.getRecords().length).equals(initialRecords.length + 1)
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
