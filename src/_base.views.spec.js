function frame(){
	return new Promise (requestAnimationFrame)
}
const componentToDOMMapping = {
	'tables': 'table',
	'rows': 'tr',
	'cells': 'td'
}
function DOM(){
	let root, selector
	if(arguments.length > 1){
		[root, selector] = arguments
	}else{
		[selector] = arguments
	}
	return Array.from((root || document).querySelectorAll(componentToDOMMapping[selector]))
}
o.spec('In browser', ()=>{
	const data = {}
	o.beforeEach(()=>{
		state.table = Table.create(Data)
		
		data.table = JSON.parse(JSON.stringify(Data))
		data.rows = data.table.rows
		data.cells = data.rows.map(r=>r.cells).flat()

		m.mount(document.getElementById('app-output'), Table.component)
	})
	o('on load', ()=>{
		o(DOM('tables').length).equals(1)
		o(DOM('rows').length).equals(data.rows.length)
		o(DOM('cells').map(c=>c.textContent)).deepEquals(data.cells.map(c=>c.datum))
	})
})
