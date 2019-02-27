o.spec('Record', ()=>{
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
			const firstRecord = Record.create({foo: 'bar'})
			const secondRecord = Record.create(firstRecord)
			o(secondRecord.getData()).equals(firstRecord)
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
		let record
		o.beforeEach(()=>{
			record = Record.create()
		})
		o.spec('.setCollection', ()=>{
			o('()', ()=>{
				o(record.setCollection()).equals(record)
				o(record.getCollection()).equals(undefined)
			})
			o('(@collection)', ()=>{
				const collection = Collection.create()
				o(record.setCollection(collection).getCollection()).equals(collection)
				o(collection.getRecords().includes(record)).equals(true)
			})
			o('(@number)', ()=>{
				o(()=>record.setCollection('ayy')).throws(Error)
				o(record.getCollection()).equals(undefined)
			})
			o.spec('when has existing collection', ()=>{
				let firstCollection
				o.beforeEach(()=>{
					firstCollection = Collection.create()
				})
				o('()', ()=>{
					record.setCollection(firstCollection)
					o(record.setCollection(firstCollection).setCollection()).equals(record)
				})
				o('(@otherCollection)', ()=>{
					const secondCollection = Collection.create()
					o(record.setCollection(firstCollection).setCollection(secondCollection)).equals(record)
					o(record.getCollection()).equals(secondCollection)
					o(firstCollection.getRecords().includes(record)).equals(false)
					o(secondCollection.getRecords().includes(record)).equals(true)
				})
			})
		})
	})
})
