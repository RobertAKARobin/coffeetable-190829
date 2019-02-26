function Collection(input = {}){
	Collection.definePrivateScopeAccessors.call(this)
	if(input.records){
		if(input.records instanceof Array){
			input.records.forEach(record=>{
				this.createRecord(record)
			})
		}else{
			this.createRecord(input.records)
		}
	}
}
Collection.definePrivateScopeAccessors = function(){
	const pvt = {
		records: [],
		config: []
	}
	Object.defineProperties(this, {
		addRecord: {
			value: function(record){
				if(record instanceof Record){
					if(record.getCollection() !== this){
						record.addToCollection(this)
					}
					if(!pvt.records.includes(record)){
						pvt.records.push(record)
					}
					return this
				}else{
					throw new Error(`@collection.addRecord will not accept an object of type ${record.constructor}`)
				}
			}
		},
		getRecords: {
			value: function(){
				return Array.from(pvt.records)
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
			const record = Record.create(input)
			this.addRecord(record)
			return record
		}
	},
	toJSON: {
		value: function(){
			return {
				rows: this.getRecords()
			}
		}
	}
})
