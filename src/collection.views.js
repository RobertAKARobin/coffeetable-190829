Collection.component = {
	view: function(vnode){
		const collection = vnode.attrs.collection
		return m('table[collection]', [
			m('thead', [
				m('tr', [
					m('th'),
					collection.getColumnNames().map(columnName=>m('th', columnName))
				])
			]),
			m('tbody.body', [
				collection.getRecords().map((record, recordIndex)=>m('tr[record]', [
					m('td', [
						m('button', {
							onclick: ()=>collection.createRecord(null, recordIndex + 1)
						}, 'Add')
					]),
					record.getColumns().map(value=>m('td', value === false ? 'false' : value))
				]))
			])
		])
	}
}
