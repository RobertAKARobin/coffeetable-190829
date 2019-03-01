function Collection(input){
	Collection.definePrivateScopeAccessors.call(this)
	if(input !== undefined){
		this.createRecord(input)
	}
}
Collection.definePrivateScopeAccessors = function(){
	const pvt = {
		records: [],
		config: []
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
					return this
				}else if(input instanceof Collection){
					const collection = input
					collection.getRecords().forEach(this.addRecord.bind(this))
				}else if(input instanceof Array){
					const array = input
					array.forEach(this.addRecord.bind(this))
				}else{
					throw new Error(`@collection.addRecord will not accept an object of type ${input ? input.constructor.name : input}`)
				}
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
			value: function(record){
				if(pvt.records.includes(record)){
					pvt.records.remove(record)
				}
				if(record instanceof Record){
					if(record.getCollection() === this){
						record.setCollection()
					}
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
