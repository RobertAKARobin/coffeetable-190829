Object.defineProperties(Collection, {
	proto: {
		value: Object.defineProperties({}, {
			class: {
				value: Collection
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
				createRecord: {
					value: function(json){
						const record = Record.create(json)
						pvt.records.push(record)
						return record
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