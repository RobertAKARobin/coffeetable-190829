function frame(){
	return new Promise (requestAnimationFrame)
}
const componentToDOMMapping = {
	'tables': 'table',
	'rows': 'tbody.body tr',
	'cells': 'td textarea',
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
	return Array.from((root || document).querySelectorAll(componentToDOMMapping[selector] || selector))
}
o.spec('In browser', ()=>{
	const input = {}
	o.beforeEach(()=>{
		input.table = JSON.parse(JSON.stringify(Data))
		input.rows = input.table.rows
		input.cells = input.rows.map(r=>r.cells).flat()

		const table = Table.create(Data)
		m.mount(document.getElementById('app-output'), {
			view: ()=>m(Table.component, {table: table})
		})
	})
	o('on load', ()=>{
		o(DOM('tables').length).equals(1)
		o(DOM('rows').length).equals(input.rows.length)
		o(DOM('columns').length).equals(Math.max(...input.rows.map(r=>r.cells.length)))
		o(DOM('cells').map(c=>c.value)).deepEquals(input.cells.map(c=>c.data))
	})
	o.spec('on click createRow', ()=>{
		o('creates row', async ()=>{
			const initialNumberOfRows = DOM('rows').length
			const firstRow = DOM('rows')[0]
			const firstRowContent = DOM(firstRow, 'cells').map(c=>c.value)
			const secondRow = DOM('rows')[1]
			const secondRowContent = DOM(secondRow, 'cells').map(c=>c.value)
			
			DOM('createRow')[1].dispatchEvent(new Event('click'))
			await frame()
	
			o(DOM('rows').length).equals(initialNumberOfRows + 1)
			o(DOM(firstRow, 'cells').map(c=>c.value)).deepEquals(firstRowContent)
			const thirdRow = DOM('rows')[2]
			o(DOM(thirdRow, 'cells').map(c=>c.value)).deepEquals(secondRowContent)
	
			o(DOM('rows').map(row=>DOM(row, 'cells').length).allEqual()).equals(true)
		})
		o('moves data', async ()=>{
			const anchorPlace = 1
			const anchorRow = DOM('rows')[anchorPlace]
			const anchorCell = DOM(anchorRow, 'cells')[0]
			const initialAnchorCellValue = anchorCell.value

			const targetRow = DOM('rows')[anchorPlace + 1]
			const targetCell = DOM(targetRow, 'cells')[0]

			DOM('createRow')[anchorPlace].dispatchEvent(new Event('click'))
			await frame()

			o(targetCell.value).equals(initialAnchorCellValue)

			anchorCell.value = 'aaa'
			anchorCell.dispatchEvent(new Event('input'))
			await frame()

			o(anchorCell.value).equals('aaa')

			DOM('createRow')[anchorPlace].dispatchEvent(new Event('click'))
			await frame()

			o(anchorCell.value).equals('')
			o(targetCell.value).equals('aaa')
		})
	})
	o('on click removeRow', async ()=>{
		const initialNumberOfRows = DOM('rows').length

		DOM('removeRow')[0].dispatchEvent(new Event('click'))
		await frame()

		o(DOM('rows').length).equals(initialNumberOfRows - 1)
	})
	o.spec('on click createColumn', ()=>{
		o('creates column', async ()=>{
			const initialNumberOfColumns = DOM('columns').length
			const firstColumnContent = DOM('rows').map(r=>DOM(r, 'cells')[0]).map(c=>c.value)
			const secondColumnContent = DOM('rows').map(r=>DOM(r, 'cells')[1]).map(c=>c.value)
	
			DOM('createColumn')[1].dispatchEvent(new Event('click'))
			await frame()
	
			o(DOM('columns').length).equals(initialNumberOfColumns + 1)
			o(DOM('rows').map(r=>DOM(r, 'cells')[0]).map(c=>c.value)).deepEquals(firstColumnContent)
			o(DOM('rows').map(r=>DOM(r, 'cells')[2]).map(c=>c.value)).deepEquals(secondColumnContent)
		})
		o('moves data', ()=>{
			
		})
	})
	o.spec('on createRow and createColumn', ()=>{
		o('creates both', async ()=>{
			const initialNumberOfColumns = DOM('columns').length
			const initialNumberOfRows = DOM('rows').length
	
			DOM('createRow')[1].dispatchEvent(new Event('click'))
			DOM('createColumn')[1].dispatchEvent(new Event('click'))
			await frame()
	
			o(DOM('rows').map(r=>DOM(r, 'cells').length)).deepEquals((initialNumberOfRows + 1).map(n=>initialNumberOfColumns + 1))
		})
		o('moves data', ()=>{

		})
	})
	o('on click removeColumn', async ()=>{
		const initialNumberOfColumns = DOM('columns').length

		DOM('removeColumn')[0].dispatchEvent(new Event('click'))
		await frame()

		o(DOM('columns').length).equals(initialNumberOfColumns - 1)
	})
})
