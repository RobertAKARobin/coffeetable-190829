Collection.component = {
	view: function(vnode){
		const collection = vnode.attrs.collection
		return m('table[collection]', [
			m('tbody.body', [
				collection.getRecords().map(record=>m(Record.component, {record}))
			])
		])
	}
}
