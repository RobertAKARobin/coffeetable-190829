function Record(input, collection){
	if(input instanceof Record){
		const originalRecord = input
		return new Record(originalRecord.getData(), collection)
	}else if(input instanceof Collection){
		const inputCollection = input
		return new Record(inputCollection.getRecords(), collection)
	}else if(input instanceof Array){
		const array = input
		return array.map(item => new Record(item, collection)).flat()
	}else if(input && input.records instanceof Array){
		const array = input.records
		return array.map(item => new Record(item, collection)).flat()
	}else{
		Record.definePrivateScopeAccessors.call(this)
		this.setData(input)
		this.setCollection(collection)
		return this
	}
}
Record.definePrivateScopeAccessors = function(){
	const pvt = {
		collection: undefined,
		data: {}
	}
	Object.defineProperties(this, {
		getCollection: {
			value: function(){
				return pvt.collection
			}
		},
		setCollection: {
			value: function(input){
				if(input === undefined || input === null || input === false){
					const collection = pvt.collection
					pvt.collection = undefined
					if(collection instanceof Collection){
						collection.removeRecord(this)
					}
				}else if(input instanceof Collection){
					const collection = input
					if(pvt.collection){
						pvt.collection.removeRecord(this)
					}
					pvt.collection = collection
					collection.addRecord(this)
				}else{
					throw Coffeetable.rejectInputError('@record.setCollection', input)
				}
				return this
			}
		},
		getData: {
			value: function(){
				return pvt.data
			}
		},
		setData: {
			value: function(input){
				pvt.data = input
			}
		}
	})
}
Object.defineProperties(Record, {
	create: {
		value: function(){
			return new Record(...arguments)
		}
	}
})
Object.defineProperties(Record.prototype, {
	getColumns: {
		value: function(input){
			if(arguments.length === 0){
				input = this.getCollection()
			}
			const data = this.getData()
			if(data === undefined || data === null){
				return data
			}else{
				let columnNames
				if(input instanceof Collection){
					const collection = input
					columnNames = collection.getColumnNames()
				}else if(input instanceof Array){
					columnNames = input
				}else{
					columnNames = [input]
				}
				return columnNames.extractFrom(data)
			}
		}
	},
	toJSON: {
		value: function(){
			return {
				data: this.getData()
			}
		}
	}
})
