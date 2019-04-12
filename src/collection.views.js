Collection.component = {
	view: function(vnode){
		const collection = vnode.attrs.collection
		return m('table[collection]', [
			m('thead', [
				m('tr', [
					collection.getColumnNames().map(columnName=>m('th', columnName))
				])
			]),
			m('tbody.body', [
				collection.getRecords().map(record=>m('tr[record]', [
					record.getColumns().map(value=>m('td', `${value}`))
				]))
			])
		])
	}
}
