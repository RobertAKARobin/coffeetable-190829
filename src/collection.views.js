Collection.component = {
	view: function(vnode){
		const collection = vnode.attrs.collection
		return m('table', [
			m('tbody.body', [
				collection.getRecords().map((record, place)=>{
					return m('tr', [
						m('td', JSON.stringify(record))
					])
				})
			])
		])
	}
}
