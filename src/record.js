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
		getCollection: {
			value: function(){
				return pvt.collection
			}
		},
		setCollection: {
			value: function(input){
				if(input === undefined){
					const collection = pvt.collection
					pvt.collection = undefined
					if(collection instanceof Collection){
						collection.removeRecord(this)
					}
					return this
				}else if(input instanceof Collection){
					const collection = input
					if(pvt.collection){
						pvt.collection.removeRecord(this)
					}
					pvt.collection = collection
					collection.addRecord(this)
					return this
				}else{
					throw new Error(`@record.setCollection will not accept an object of type ${collection.constructor.name}`)
				}
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
