Table.component = {
	view: function(vnode){
		const table = vnode.attrs.table
		return m('table', [
			m('tbody.head', [
				m('tr', [
					table.getWidth().map(index=>{
						return m('th', index)
					})
				])
			]),
			m('tbody.body', [
				table.getChildren().map(row=>{
					return m(Row.component, {row})
				})
			])
		])
	}
}
