function frame(){
	return new Promise (requestAnimationFrame)
}
const componentToDOMMapping = {
	'tables': 'table',
	'rows': 'tbody.body tr',
	'cells': 'td',
	'columns': 'col',

	'createRow': '[action=createRow]',
	'removeRow': '[action=removeRow]',

	'createColumn': '[action=createColumn]',
	'removeColumn': '[action=removeColumn]'

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
		o(DOM('columns').length).equals(Math.max(...input.rows.map(r=>r.cells.length)))
		o(DOM('cells').map(c=>c.textContent)).deepEquals(input.cells.map(c=>c.data))
	})
	o('on click createRow', ()=>{
		const initialNumberOfRows = DOM('rows').length
		DOM('createRow')[0].click()
		o(DOM('rows').length).equals(initialNumberOfRows + 1)
	})
	o('on click removeRow', ()=>{
		const initialNumberOfRows = DOM('rows').length
		DOM('removeRow')[0].click()
		o(DOM('rows').length).equals(initialNumberOfRows - 1)
	})
	o('on click createColumn', ()=>{
		const initialNumberOfColumns = DOM('columns').length
		DOM('createColumn')[0].click()
		o(DOM('columns').length).equals(initialNumberOfColumns + 1)
	})
	o('on click removeColumn', ()=>{
		const initialNumberOfColumns = DOM('columns').length
		DOM('removeColumn')[0].click()
		o(DOM('columns').length).equals(initialNumberOfColumns - 1)
	})
})
