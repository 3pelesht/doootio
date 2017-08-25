function createElement()
{
	for(var i = 0; i < 36; i++)
	{
		var row = document.createElement('div');
		row.setAttribute('class', 'row');

		for (var j = 0; j < 64 ; j++)
		{
			var cell = document.createElement('div');
			cell.setAttribute('class', 'cell');
			cell.onclick = function(){
				this.classList.add('select');
			}
			row.appendChild(cell);
		}

		document.getElementById('table').appendChild(row);
	}
}
createElement();