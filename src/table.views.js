Table.component = {
	view: function(vnode){
		const table = vnode.attrs.table
		return m('table', [
			m('colgroup', [
				table.getWidth().map(place=>{
					return m('col')
				})
			]),
			m('tbody.head', [
				m('tr', [
					m('th'),
					table.getWidth().map(place=>{
						return m('th', [
							place,
							m('button[action=removeColumn]', {
								onclick(event){
									table.removeColumn(place)
								}
							}, '-'),
							m('button[action=createColumn]', {
								onclick(event){
									table.createColumn(place)
								}
							}, '+')
						])
					})
				])
			]),
			m('tbody.body', [
				table.getRows().map((row, place)=>{
					return m('tr', [
						m('th', [
							place,
							m('button[action=removeRow]', {
								onclick(event){
									table.removeRow(place)
								}
							}, '-'),
							m('button[action=createRow]', {
								onclick(event){
									table.createRow({}, place)
								}
							}, '+')
						]),
						row.getCells().pad({}, table.getWidth()).map(cell=>{
							return m(`td`, [
								m('textarea', {
									oninput(event){
										cell.data = event.target.value
									},
									style: {
										'background-color': (cell.class === Cell ? 'initial' : '#ffc')
									},
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
