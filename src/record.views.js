Record.component = {
	view: function(vnode){
		const record = vnode.attrs.record
		return m('tr[record]', [
			m('td', JSON.stringify(record))
		])
	}
}