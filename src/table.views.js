Table.component = {
	view: function(vnode){
		const table = vnode.attrs.table
		return m('table', table.getChildren().map(row=>{
			return m('tr', row.getChildren().map(cell=>{
				return m('td', cell.data)
			}))
		}))
	}
}
