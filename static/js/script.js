var rows = 36;
var cols = 64;
var map  = [];
var start =
{
	x: 0,
	y: 0
};

function createElement()
{
	for (var i = 0; i < rows; i++)
	{
		map[i] = [];
		var row = document.createElement('div');
		row.setAttribute('class', 'row');

		for (var j = 0; j < cols ; j++)
		{
			map[i][j] = null;
			var cell = document.createElement('div');
			cell.setAttribute('data-cell', '');
			cell.dootioLocation = {'row' : i, 'cell' : j};
			row.appendChild(cell);
		}

		document.getElementById('table').appendChild(row);
	}
}

createElement();

function rgb2hex(rgb)
{
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
	var mode = $('.draw-mode[data-active]').attr('id');
	var color_select = $('#color-select').css('background-color');
	switch(mode)
	{
		case 'eraser':
			this.style.backgroundColor = "";
			if(map[this.dootioLocation.row + start.y])
			{
				map[this.dootioLocation.row + start.y][this.dootioLocation.cell + start.x] = null;
			}
			break;
		case 'eyedropper':
			var color = this.style.backgroundColor;
			if (color == '') return;
			$('#color-picker').val('#' + rgb2hex(color));
			$('#color-select').css({
				'background-color': '#' + rgb2hex(color)
			});
			break;
		default:
			this.style.backgroundColor = color_select;
			map[this.dootioLocation.row + start.y][this.dootioLocation.cell + start.x] =
			{
				color : '#' + rgb2hex(color_select)
			};
			break;
	}
}

$('#color-picker').on('change', function(e)
{
	var new_color = $(this).val();
	$('#color-select').css({
		'background-color': new_color
	});
});

$('#boardBackground').on('change', function(e)
{
	var board_color = $(this).val();
	$('.row').css({
		'background-color': board_color
	});
});

$('.draw-mode').click(function(e)
{
	$('.draw-mode').removeAttr('data-active');
	$(this).attr('data-active', '');
});

$('[data-shift]').click(function(e)
{
	var shift = $(this).attr('data-shift');
	switch(shift)
	{
		case 'up':
			map.unshift([]);
			start.y++;

			console.log(map.length);
			for (var i = 1; i < map.length - 1; i++)
			{
				map[i - 1] = map[i];
			}
			$('[data-cell]').css({
				'background-color': 'initial'
			});
			$('.row').each(function(i)
			{
				$('[data-cell]', this).each(function(j)
				{
					if(!map[i + start.y]) return;
					var hasColor = map[i + start.y][j + start.x];
					if (hasColor)
					{
						$(this).css({
							'background-color': hasColor.color
						});
					}
				});
			});
			break;
		case 'down':
			if(start.y - 1 < 0){
				map.push([]);
				start.y = 0
				for (var i = map.length - 2; i >= 0; i--)
				{
					map[i + 1] = map[i];
				}
				map[0] = null;
			}
			else
			{
				start.y--
			}
			console.log(start.y);
			console.log(map.length);
			$('[data-cell]').css({
				'background-color': 'initial'
			});
			$('.row').each(function(i)
			{
				if (!map[i + start.y] || map[i + start.y].length == 0) return;
				$('[data-cell]', this).each(function(j)
				{
					var hasColor = map[i + start.y][j + start.x];
					if (hasColor)
					{
						$(this).css({
							'background-color': hasColor.color
						});
					}
				});
			});
			break;
		case 'right':
			for (var i = 0; i < map.length; i++)
			{
				map[i].push(null);
			}
			start.x--;
			break;

		case 'left':
			for (var i = 0; i < map.length; i++)
			{
				map[i].unshift(null);
			}
			start.x++;
			break;
	}
});
