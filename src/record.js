function Record(input = {}){
	Record.definePrivateScopeAccessors.call(this)
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
				return JSON.parse(JSON.stringify(pvt.data))
			}
		},
		setData: {
			value: function(input){
				/*
				if empty
					pvt.data = {}
				if object
					pvt.data = input
				if primitive
					pvt.data = {value: input}

				Should I just expose pvt.data?
				*/
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
