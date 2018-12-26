Row.component = {
	view: function(vnode){
		const row = vnode.attrs.row
		return row.getChildren().map(cell=>{
			return m('td', [
				m('textarea', {
					value: cell.data
				})
			])
		})
	}
}
