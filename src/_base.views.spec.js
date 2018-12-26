function frame(){
	return new Promise (requestAnimationFrame)
}
const componentToDOMMapping = {
	'tables': 'table',
	'rows': 'tbody.body tr',
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
	const input = {}
	o.beforeEach(()=>{
		input.table = JSON.parse(JSON.stringify(Data))
		input.rows = input.table.rows
		input.cells = input.rows.map(r=>r.cells).flat()

		m.mount(document.getElementById('app-output'), {
			view: ()=>m(Table.component, {table: Table.create(Data)})
		})
	})
	o('on load', ()=>{
		o(DOM('tables').length).equals(1)
		o(DOM('rows').length).equals(input.rows.length)
		o(DOM('cells').map(c=>c.textContent)).deepEquals(input.cells.map(c=>c.data))
	})
})
