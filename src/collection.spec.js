o.spec('Collection', ()=>{
	o.spec('.create', ()=>{
		o('()', ()=>{
			const collection = Collection.create()
			o(collection.constructor).equals(Collection)
			o(collection.getRecords()).deepEquals([])
		})
		o('(undefined)', ()=>{
			const input = undefined
			const collection = Collection.create(input)
			o(collection.getRecords()).deepEquals([])
		})
		o('(null)', ()=>{
			const input = null
			const collection = Collection.create(input)
			o(collection.getRecords().length).equals(1)
			o(collection.getRecords().first().getData()).equals(input)
		})
	})
	o.spec('@collection', ()=>{
		let collection, initialRecords, initialData
		o.beforeEach(()=>{
			collection = Collection.create()
			collection.createRecord({foo: 'bar'})
			initialRecords = collection.getRecords()
			initialData = initialRecords.map(r=>r.getData())
		})
		o.spec('.addRecord', ()=>{
			let record, secondCollection, secondCollectionInitialRecords
			o.beforeEach(()=>{
				record = Record.create()
				secondCollection = Collection.create()
				secondCollection.createRecord({foo: 'bar'})
				secondCollectionInitialRecords = secondCollection.getRecords()
			})
			o('()', ()=>{
				o(()=>collection.addRecord()).throws(Error)
			})
			o('(@object)', ()=>{
				const input = {}
				o(()=>collection.addRecord(input)).throws(Error)
			})
			o('(@record)', ()=>{
				const returnValue = collection.addRecord(record)
				o(returnValue).equals(collection)
				o(collection.getRecords()).deepEquals(initialRecords.concat(record))
				o(collection.getRecords().length).equals(initialRecords.length + 1)
			})
			o('(@recordThatBelongsToOtherCollection)', ()=>{
				collection.addRecord(record)
				secondCollection.addRecord(record)
				o(collection.getRecords()).deepEquals(initialRecords)
				o(record.getCollection()).notEquals(collection)
				o(secondCollection.getRecords()).deepEquals(secondCollectionInitialRecords.concat(record))
				o(record.getCollection()).equals(secondCollection)
			})
			o('(@recordThatBelongsToSameCollection)', ()=>{
				collection.addRecord(record)
				collection.addRecord(record)
				o(collection.getRecords()).deepEquals(initialRecords.concat(record))
				o(record.getCollection()).equals(collection)
			})
			o('(@collection)', ()=>{
				collection.addRecord(secondCollection)
				o(collection.getRecords()).deepEquals(initialRecords.concat(secondCollectionInitialRecords))

				const secondCollectionInitialRecordsCollections = secondCollectionInitialRecords.map(r=>r.getCollection())
				o(secondCollectionInitialRecordsCollections).deepEquals((secondCollectionInitialRecords.length).times(collection))
			})
			o('(@array[])', ()=>{
				const input = []
				collection.addRecord(input)
				o(collection.getRecords()).deepEquals(initialRecords)
			})
			o('(@array[@record])', ()=>{
				const input = [record]
				collection.addRecord(input)
				o(collection.getRecords()).deepEquals(initialRecords.concat(record))
			})
			o('(@array[@collection])', ()=>{
				const secondCollectionData = [1, 2, 3]
				const secondCollection = Collection.create(secondCollectionData)
	
				const thirdCollectionData = [4, 5, 6]
				const thirdCollection = Collection.create(thirdCollectionData)
	
				const returnValue = collection.addRecord([secondCollection, thirdCollection])
				o(returnValue).equals(collection)
				o(secondCollection.getRecords()).deepEquals([])
				o(thirdCollection.getRecords()).deepEquals([])
				o(collection.getData()).deepEquals(initialData.concat(secondCollectionData, thirdCollectionData))
			})
		})
		o.spec('.createRecord', ()=>{
			o('()', ()=>{
				const returnValue = collection.createRecord()
				o(returnValue.constructor).equals(Record)

				const record = returnValue
				o(record.getCollection()).equals(collection)
				o(collection.getRecords()).deepEquals(initialRecords.concat(record))
				o(collection.getRecords().indexOf(record)).equals(initialRecords.length)
				o(collection.getRecords()).deepEquals(initialRecords.concat(returnValue))
			})
			o('(@number)', ()=>{
				const input = 3
				const returnValue = collection.createRecord(input)
				o(returnValue.constructor).equals(Record)
				o(collection.getRecords().length).equals(initialRecords.length + 1)
				o(collection.getRecords().last().getData()).equals(input)
			})
			o('(@object)', ()=>{
				const input = {}
				const returnValue = collection.createRecord(input)
				o(returnValue.constructor).equals(Record)
				o(returnValue.getData()).deepEquals(input)
				o(collection.getRecords().last()).equals(returnValue)
			})
			o('(@array[])', ()=>{
				const input = []
				const returnValue = collection.createRecord(input)
				o(returnValue.constructor).equals(Array)
				o(returnValue).deepEquals(input)
				o(collection.getData()).deepEquals(initialData.concat(input))
			})
			o('(@array[@number])', ()=>{
				const input = [1, 2, 3]
				const returnValue = collection.createRecord(input)
				o(returnValue.constructor).equals(Array)
				o(returnValue.map(r=>r.getData())).deepEquals(input)
				o(collection.getData()).deepEquals(initialData.concat(input))
			})
			o('(@record)', ()=>{
				const inputData = {foo: 'bar'}
				const input = Record.create(inputData)
				const returnValue = collection.createRecord(input)
				o(returnValue).notEquals(input)
				o(returnValue.constructor).equals(Record)
			})
			o('(@collection)', ()=>{
				const secondCollectionInitialData = [1, 2, 3]
				const secondCollection = Collection.create(secondCollectionInitialData)
				const returnValue = collection.createRecord(secondCollection)
				o(returnValue.constructor).equals(Array)
				o(returnValue.map(r=>r.getData())).deepEquals(secondCollectionInitialData)
				o(secondCollection.getData()).deepEquals(secondCollectionInitialData)
				o(collection.getData()).deepEquals(initialData.concat(secondCollectionInitialData))
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
				let record, secondRecord
				o.beforeEach(()=>{
					record = collection.createRecord()
					secondRecord = collection.createRecord()
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
				o('(@array[@record])', ()=>{
					collection.removeRecord([secondRecord])
					o(collection.getRecords()).deepEquals(initialRecords.without(secondRecord))
				})
				o('(self)', ()=>{
					collection.removeRecord(collection)
					o(collection.getRecords()).deepEquals([])
				})
			})
		})
		o.spec('.setColumns', ()=>{
			o('()', ()=>{
				const returnValue = collection.setColumns()
				o(returnValue).equals(collection)
				o(collection.getColumns()).deepEquals([])
			})
			o('(@number)', ()=>{
				const input = 3
				o(()=>collection.setColumns(input)).throws(Error)
			})
			o('(@object)', ()=>{
				const input = {}
				o(()=>collection.setColumns(input)).throws(Error)
			})
			o('(@array[])', ()=>{
				const input = []
				collection.setColumns(input)
				o(collection.getColumns()).deepEquals(input)
				o(collection.getColumns()).notEquals(input)
			})
			o('(@array[@number])', ()=>{
				const input = [0, 1, 2]
				collection.setColumns(input)
				o(collection.getColumns()).deepEquals(input)
				o(collection.getColumns()).notEquals(input)
			})
		})
	})
})
