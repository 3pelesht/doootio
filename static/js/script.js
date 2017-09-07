var map = {};

function createElement()
{
	for(var i = 0; i < 36; i++)
	{
		var row = document.createElement('div');
		row.setAttribute('class', 'row');

		for (var j = 0; j < 64 ; j++)
		{
			var cell = document.createElement('div');
			cell.setAttribute('data-cell', '');
			cell.dootioLocation = {'row' : i, 'cell' : j};
			row.appendChild(cell);
		}

		document.getElementById('table').appendChild(row);
	}
}
createElement();
function rgb2hex(rgb){
	rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	return (rgb && rgb.length === 4) ?
		("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}
$("#table").bind('mousedown', function(event)
{

	drow.call(event.target);

	$(this).bind('mousemove.ifDOwn', function(event)
	{
		drow.call(event.target);
	});
});

$(document).on('mouseup', function(){
	$("#table").unbind('mousemove.ifDOwn');
});

function drow()
{
	var eraser = $('#eraser').is('[data-active]');
	var color_select = $('#color-select').css('background-color');
	var map_name = this.dootioLocation.row + '_' + this.dootioLocation.cell;
	if (eraser)
	{
		this.style.backgroundColor = "";
		if(map[map_name])
		{
			delete map[map_name];
		}
	}
	else
	{
		this.style.backgroundColor = color_select;
		map[map_name] = {
			row : this.dootioLocation.row,
			cell : this.dootioLocation.cell,
			color : rgb2hex(color_select)
		};
	}

	console.log(map);

}