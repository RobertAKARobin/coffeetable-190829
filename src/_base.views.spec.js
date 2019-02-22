function frame(){
	return new Promise (requestAnimationFrame)
}
const componentToDOMMapping = {
	'collections': 'table',
	'records': 'tr'
}
function DOM(){
	let root, selector
	if(arguments.length > 1){
		[root, selector] = arguments
	}else{
		[selector] = arguments
	}
	return Array.from((root || document).querySelectorAll(componentToDOMMapping[selector] || selector))
}
o.spec('In browser', ()=>{
	const input = {}
	o.beforeEach(()=>{
		input.collection = JSON.parse(JSON.stringify(Data))
		input.records = input.collection.records
		
		const collection = Collection.create(Data)
		m.mount(document.getElementById('app-output'), {
			view: ()=>m(Collection.component, {collection})
		})
	})
	o('on load', () => {
		o(DOM('collections').length).equals(1)
		o(DOM('records').length).equals(input.records.length)
	})
})
