Record.component = {
	view: function(vnode){
		const record = vnode.attrs.record
		return m('tr[record]', [
			record.getColumns().map(value=>m('td', `${value}`))
		])
	}
}