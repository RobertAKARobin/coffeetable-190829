function Record(input = {}){
	const pvt = {
		collection: undefined,
		data: {}
	}
	Object.defineProperties(this, {
		addToCollection: {
			value: function(collection){
				if(collection){
					pvt.collection = collection
					collection.addRecord(this)
				}
				return this
			}
		},
		getCollection: {
			value: function(){
				return pvt.collection
			}
		},
		getData: {
			value: function(){
				return JSON.parse(JSON.stringify(pvt.data))
			}
		}
	})
	if(input.data){
		pvt.data = JSON.parse(JSON.stringify(pvt.data))
	}
}
Object.defineProperties(Record, {
	create: {
		value: function(){
			return new Record(...arguments)
		}
	}
})
Object.defineProperties(Record.prototype, {
	toJSON: {
		value: function(){
			return {
				data: this.getData()
			}
		}
	}
})
