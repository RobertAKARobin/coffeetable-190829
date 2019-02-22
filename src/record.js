Object.defineProperties(Record, {
	proto: {
		value: Object.defineProperties({}, {
			class: {
				value: Record
			},

			toJSON: {
				value: function(){
					return {
						data: this.getData()
					}
				}
			}
		})
	},

	create: {
		value: function(input = {}){
			const pvt = {
				data: {}
			}
			const record = Object.create(Record.proto, {
				getData: {
					value: function(){
						return JSON.parse(JSON.stringify(pvt.data))
					}
				}
			})
			if(input.data){
				pvt.data = JSON.parse(JSON.stringify(pvt.data))
			}
			return record
		}
	}
})
