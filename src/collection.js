function Collection(input){
	Collection.definePrivateScopeAccessors.call(this)
	if(input !== undefined){
		this.createRecord(input)
	}
}
Collection.definePrivateScopeAccessors = function(){
	const pvt = {
		records: [],
		columnNames: []
	}
	Object.defineProperties(this, {
		addRecord: {
			value: function(input){
				if(input instanceof Record){
					const record = input
					if(record.getCollection() !== this){
						record.setCollection(this)
					}
					if(!pvt.records.includes(record)){
						pvt.records.push(record)
					}
				}else if(input instanceof Collection){
					const collection = input
					collection.getRecords().forEach(this.addRecord.bind(this))
				}else if(input instanceof Array){
					const array = input
					array.forEach(this.addRecord.bind(this))
				}else{
					throw new Error(`@collection.addRecord will not accept an object of type ${input ? input.constructor.name : input}`)
				}
				return this
			}
		},
		getColumnNames: {
			value: function(){
				return Array.from(pvt.columnNames)
			}
		},
		getData: {
			value: function(){
				return this.getRecords().map(r=>r.getData())
			}
		},
		getRecords: {
			value: function(){
				return Array.from(pvt.records)
			}
		},
		removeRecord: {
			value: function(input){
				if(input instanceof Record){
					const record = input
					if(pvt.records.includes(record)){
						pvt.records.remove(record)
					}
					if(record.getCollection() === this){
						record.setCollection()
					}
				}else if(input instanceof Array){
					const array = input
					array.forEach(this.removeRecord.bind(this))
				}else if(input instanceof Collection){
					const collection = input
					collection.getRecords().forEach(this.removeRecord.bind(this))
				}
				return this
			}
		},
		setColumnNames: {
			value: function(input){
				if(input instanceof Array){
					pvt.columnNames = Array.from(input)
				}else if(input === undefined || input === null || input === false){
					pvt.columnNames = []
				}else{
					throw new Error(`@collection.setColumnNames will not accept an object of type ${input ? input.constructor.name : input}`)
				}
				return this
			}
		}
	})
}
Object.defineProperties(Collection, {
	create: {
		value: function(){
			return new Collection(...arguments)
		}
	}
})
Object.defineProperties(Collection.prototype, {
	createRecord: {
		value: function(input){
			return Record.create(input, this)
		}
	},
	toJSON: {
		value: function(){
			return {
				records: this.getRecords()
			}
		}
	}
})
