Table.component = {
	view: function(vnode){
		const table = vnode.attrs.table
		return m('table', [
			m('colgroup', [
				table.getWidth().map(index=>{
					return m('col')
				})
			]),
			m('tbody.head', [
				m('tr', [
					m('th'),
					table.getWidth().map(index=>{
						return m('th', [
							index,
							m('button[action=removeColumn]', {
								onclick(event){
									table.removeColumnAt(index)
								}
							}, '-'),
							m('button[action=createColumn]', {
								onclick(event){
									table.createColumn([], index)
								}
							}, '+')
						])
					})
				])
			]),
			m('tbody.body', [
				table.getChildren().map((row, index)=>{
					return m('tr', [
						m('th', [
							index,
							m('button[action=removeRow]', {
								onclick(event){
									table.removeChildAt(index)
								}
							}, '-'),
							m('button[action=createRow]', {
								onclick(event){
									table.createChild({}, index)
								}
							}, '+')
						]),
						row.getChildren().pad({}, table.getWidth()).map(cell=>{
							return m('td', [
								m('textarea', {
									value: cell.data
								})
							])
						})
					])
				})
			])
		])
	}
}
