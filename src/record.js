function Record(input){
	Record.definePrivateScopeAccessors.call(this)
	this.setData(input)
}
Record.definePrivateScopeAccessors = function(){
	const pvt = {
		collection: undefined,
		data: {}
	}
	Object.defineProperties(this, {
		addToCollection: {
			value: function(collection){
				if(collection instanceof Collection){
					pvt.collection = collection
					collection.addRecord(this)
					return this
				}else{
					throw new Error(`@record.addToCollection will not accept an object of type ${collection.constructor.name}`)
				}
			}
		},
		getCollection: {
			value: function(){
				return pvt.collection
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
	toJSON: {
		value: function(){
			return {
				data: this.getData()
			}
		}
	}
})
