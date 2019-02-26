Object.defineProperties(Collection, {
	proto: {
		value: Object.defineProperties({}, {
			class: {
				value: Collection
			},
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
	},

	create: {
		value: (input = {})=>{
			const pvt = {
				records: [],
				config: []
			}
			const collection = Object.create(Collection.proto, {
				addRecord: {
					value: function(record){
						if(record === undefined || record === null){
							return this
						}else if(record.class !== Record){
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
						collection.createRecord(record)
					})
				}else{
					collection.createRecord(input.records)
				}
			}
			return collection
		}
	}
})