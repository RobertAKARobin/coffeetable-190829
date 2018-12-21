Table.component = {
	view: function(){
		const table = state.table
		return m('table', table.getChildren().map(row=>{
			return m('tr', row.cells.map(cell=>{
				return m('td', cell.datum)
			}))
		}))
	}
}
