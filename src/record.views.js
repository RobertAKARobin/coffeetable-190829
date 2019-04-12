Record.component = {
	view: function(vnode){
		const record = vnode.attrs.record
		return m('tr[record]', [
			record.getCollection().getColumnNames().map(columnName=>m('td', record.getData()[columnName]))
		])
	}
}