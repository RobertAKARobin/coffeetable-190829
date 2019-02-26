function Collection(input = {}){
	const pvt = {
		records: [],
		config: []
	}
	Object.defineProperties(this, {
		addRecord: {
			value: function(record){
				if(record === undefined || record === null){
					return this
				}else if(! record instanceof Record){
					throw new Error('Can only add Records')
				}else{
					if(record.getCollection() !== this){
						record.addToCollection(this)
					}
					if(!pvt.records.includes(record)){
						pvt.records.push(record)
					}
					return this
				}
			}
		},
		getRecords: {
			value: function(){
				return Array.from(pvt.records)
			}
		}
	})
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