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
				getRecords: {
					value: function () {
						return Array.from(pvt.records)
					}
				}
			})
			if (input.records instanceof Array) {
				pvt.records = input.records.map(Record.create)
			}
			return collection
		}
	}
})
