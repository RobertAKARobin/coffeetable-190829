Collection.component = {
	view: function(vnode){
		const collection = vnode.attrs.collection
		return m('div[data-collection]', [
			m('div[data-head]', [
				m('div[data-row]', [
					m('div'),
					collection.getColumnNames().map(columnName=>m('div', columnName))
				])
			]),
			m('div[data-body]', [
				collection.getRecords().map((record, recordIndex)=>m('div[data-row][data-record]', [
					m('div', [
						m('button', {
							onclick: ()=>collection.createRecord(null, recordIndex + 1)
						}, 'Add'),
						m('button', {
							onclick: ()=>collection.removeRecord(record)
						}, 'Remove')
					]),
					record.getColumns().map(value=>m('div', value === false ? 'false' : value))
				]))
			])
		])
	}
}
