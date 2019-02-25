function frame(){
	return new Promise (requestAnimationFrame)
}
function $(selector){
	const result = document.querySelectorAll(selector)
	if(result.length === 1){
		result[0].length = 1
		return result[0]
	}else{
		return Array.from(result)
	}
}

o.spec('In browser', ()=>{
	const input = {}
	o.beforeEach(()=>{
		input.collection = JSON.parse(JSON.stringify(Data))
		input.records = input.collection.records
		
		const collection = Collection.create(Data)
		m.mount($('#app-output'), {
			view: ()=>m(Collection.component, {collection})
		})
	})
	o('on load', () => {
		o($('[collection]').length).equals(1)
		o($('[record]').length).equals(input.records.length)
	})
})
