Table.component = {
	view: function(vnode){
		const table = vnode.attrs.table
		return m('table', [
			m('tbody.head', [
				m('tr', [
					m('th'),
					table.getWidth().map(index=>{
						return m('th', index)
					})
				])
			]),
			m('tbody.body', [
				table.getChildren().map((row, index)=>{
					return m('tr', [
						m('th', index),
						m(Row.component, {row})
					])
				})
			])
		])
	}
}
