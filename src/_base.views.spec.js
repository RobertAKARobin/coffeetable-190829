function frame(){
	return new Promise (requestAnimationFrame)
}
o.spec('In browser', ()=>{
	o.beforeEach(()=>{
		m.mount(document.getElementById('app-output'), Table.component)
	})
	o('renders', ()=>{
		o(document.querySelectorAll('tr').length).equals(Data.rows.length)
	})
})
