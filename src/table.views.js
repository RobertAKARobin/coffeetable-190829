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
									table.removeColumnAt(place)
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
				table.getChildren().map((row, place)=>{
					return m('tr', [
						m('th', [
							place,
							m('button[action=removeRow]', {
								onclick(event){
									table.removeChildAt(place)
								}
							}, '-'),
							m('button[action=createRow]', {
								onclick(event){
									table.createChild({}, place)
								}
							}, '+')
						]),
						row.getChildren().pad({}, table.getWidth()).map(cell=>{
							return m(`td[columnPlace=${place}]`, [
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
