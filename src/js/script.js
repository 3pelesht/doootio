var rows = 36;
var cols = 64;
var maps = {};
maps.length = 1;
_FRAMENUMBER = 1;
var Animate_Is_Run;
maps["1"] = {
	map: []
};
maps[_FRAMENUMBER].start = {
	x: 0,
	y: 0
};
maps[_FRAMENUMBER].fps = $('.icon-fps').attr('data-fps');

function rgb2hex(rgb)
{
	rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	return (rgb && rgb.length === 4) ?
		("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function createElement()
{
	for (var i = 0; i < rows; i++)
	{
		maps[_FRAMENUMBER].map[i] = [];
		var row = document.createElement('div');
		row.setAttribute('class', 'row');

		for (var j = 0; j < cols ; j++)
		{
			maps[_FRAMENUMBER].map[i][j] = null;
			var cell = document.createElement('div');
			cell.setAttribute('data-cell', '');
			cell.doootioLocation = {'row' : i, 'cell' : j};
			row.appendChild(cell);
		}

		document.getElementById('table').appendChild(row);
		document.getElementById('table').currentDoootioLocation =
		{
			row: 0,
			cell: 0,
			_row: 0,
			_cell: 0
		};

		$(".row").eq(document.getElementById('table').currentDoootioLocation.row).children('[data-cell]').eq(document.getElementById('table').currentDoootioLocation.cell).addClass('hover');

		Object.defineProperty(document.getElementById('table').currentDoootioLocation, 'row', {
			get: function()
			{
				return this._row;
			},
			set: function(value)
			{
				if (value < 0)
				{
					this._row = rows - 1;
				}
				else if (value >= rows)
				{
					this._row = 0;
				}
				else
				{
					this._row = value;
				}
				$(".row").children('[data-cell]').removeClass('hover');
				$(".row").eq(this._row).children('[data-cell]').eq(this._cell).addClass('hover');
			}
		});

		Object.defineProperty(document.getElementById('table').currentDoootioLocation, 'cell', {
			get: function()
			{
				return this._cell;
			},
			set: function(value)
			{
				if (value < 0)
				{
					this._cell = cols - 1;
				}
				else if (value >= cols)
				{
					this._cell = 0;
				}
				else
				{
					this._cell = value;
				}
				$(".row").children('[data-cell]').removeClass('hover');
				$(".row").eq(this._row).children('[data-cell]').eq(this._cell).addClass('hover');
			}
		});
	}
}

createElement();

function mapDraw()
{
	$('.row').each(function(i)
	{
		$('[data-cell]', this).each(function(j)
		{
			if(!maps[_FRAMENUMBER].map[i + maps[_FRAMENUMBER].start.y]) return;
			$(this).css({
				'background-color': 'initial'
			});
			var hasColor = maps[_FRAMENUMBER].map[i + maps[_FRAMENUMBER].start.y][j + maps[_FRAMENUMBER].start.x];
			if (hasColor)
			{
				$(this).css({
					'background-color': hasColor.color
				});
			}
		});
	});
}

maps["1"].backgroundColor = '#' + rgb2hex($('.row').css('background-color'));

$("#table").bind('mousedown', function(event)
{
	if (Animate_Is_Run) return false;
	drow.call(event.target);

	$(this).bind('mousemove.ifDown', function(event)
	{
		drow.call(event.target);
	});
});

$(document).on('mouseup', function(){
	$("#table").unbind('mousemove.ifDown');
});

function drow()
{
	var mode = $('.draw-mode[data-active]').attr('id');
	var color_select = $('#color-select').css('background-color');
	switch(mode)
	{
		case 'eraser':
			this.style.backgroundColor = "";
			if(maps[_FRAMENUMBER].map[this.doootioLocation.row + maps[_FRAMENUMBER].start.y])
			{
				maps[_FRAMENUMBER].map[this.doootioLocation.row + maps[_FRAMENUMBER].start.y][this.doootioLocation.cell + maps[_FRAMENUMBER].start.x] = null;
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
			maps[_FRAMENUMBER].map[this.doootioLocation.row][this.doootioLocation.cell] =
			{
				color : '#' + rgb2hex(color_select)
			};
			$("#table")[0].currentDoootioLocation.row = this.doootioLocation.row + maps[_FRAMENUMBER].start.y;
			$("#table")[0].currentDoootioLocation.cell = this.doootioLocation.cell + maps[_FRAMENUMBER].start.x;
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
	maps[_FRAMENUMBER].backgroundColor = board_color;
});

$('.draw-mode').click(function(e)
{
	if (Animate_Is_Run) return false;
	$('.draw-mode').removeAttr('data-active');
	$(this).attr('data-active', '');
});

$('[data-shift]').click(function(e)
{
	if (Animate_Is_Run) return false;
	var shift = $(this).attr('data-shift');
	switch(shift)
	{
		case 'up':
			maps[_FRAMENUMBER].map.unshift([]);
			maps[_FRAMENUMBER].start.y++;

			for (var i = 1; i <= maps[_FRAMENUMBER].map.length - 1; i++)
			{
				maps[_FRAMENUMBER].map[i - 1] = maps[_FRAMENUMBER].map[i];
			}
			maps[_FRAMENUMBER].map[maps[_FRAMENUMBER].map.length - 1] = new Array();
			break;
		case 'down':
			if(maps[_FRAMENUMBER].start.y - 1 < 0){
				maps[_FRAMENUMBER].map.push([]);
				maps[_FRAMENUMBER].start.y = 0
				for (var i = maps[_FRAMENUMBER].map.length - 2; i >= 0; i--)
				{
					maps[_FRAMENUMBER].map[i + 1] = maps[_FRAMENUMBER].map[i];
				}
				maps[_FRAMENUMBER].map[0] = new Array();
			}
			else
			{
				maps[_FRAMENUMBER].start.y--
			}
			break;
		case 'left':
			for (var i = 0; i < maps[_FRAMENUMBER].map.length; i++)
			{
				maps[_FRAMENUMBER].map[i].unshift(null);
				for (var j = 1; j <= maps[_FRAMENUMBER].map[i].length - 1; j++) {
					maps[_FRAMENUMBER].map[i][j - 1] = maps[_FRAMENUMBER].map[i][j];
				};
				maps[_FRAMENUMBER].map[i][maps[_FRAMENUMBER].map[i].length - 1] = new Array();
			}
			maps[_FRAMENUMBER].start.x++;
			break;

		case 'right':
			maps[_FRAMENUMBER].start.x--;
			break;
	}
	$('[data-cell]').css({
		'background-color': 'initial'
	});
	$('.row').each(function(i)
	{
		$('[data-cell]', this).each(function(j)
		{
			if(!maps[_FRAMENUMBER].map[i + maps[_FRAMENUMBER].start.y]) return;
			var hasColor = maps[_FRAMENUMBER].map[i + maps[_FRAMENUMBER].start.y][j + maps[_FRAMENUMBER].start.x];
			if (hasColor)
			{
				$(this).css({
					'background-color': hasColor.color
				});
			}
		});
	});
});



$(document).on('keydown', function(e)
{
	if (Animate_Is_Run) return false;
	var key = e.key;
	var location = $("#table")[0].currentDoootioLocation;
	switch(key)
	{
		case 'ArrowUp':
			location.row--;
			break;
		case 'ArrowDown':
			location.row++;
			break;
		case 'ArrowRight':
			location.cell++;
			break;
		case 'ArrowLeft':
			location.cell--;
			break;
		case ' ':
			drow.call($(".row").eq(location.row).children('[data-cell]').eq(location.cell)[0]);
			break;
	}

});


$( ".frame" ).click(function()
{
	if (Animate_Is_Run) return false;
	$(".frame").removeClass('active');
	$(this).addClass('active');
	_FRAMENUMBER = $(this).attr('data-frame');

	if (!maps[_FRAMENUMBER])
	{
		for (var i = maps.length + 1; i <= _FRAMENUMBER; i++)
		{
			maps[i] = JSON.parse(JSON.stringify(maps[maps.length]));
			maps.length++;
			$('.frame').eq(i - 1).addClass('on');
		}
	}

	$('.row').css({
		'background-color': maps[_FRAMENUMBER].backgroundColor
	});

	mapDraw();
});

$('.icon-fps').click(function(e)
{
	if (Animate_Is_Run) return false;
	var fps = $(this).attr('data-fps');
	switch (fps)
	{
		case '1':
			fps = 0.5;
			break;
		case '0.5':
			fps = 0.25;
			break;
		case '0.25':
			fps = 1;
			break;
	}
	$(this).attr('data-fps', fps);
	maps[_FRAMENUMBER].fps = fps;
});

$('#color-select').click(function(event)
{
	if (Animate_Is_Run) return false;
});

$('#mapBackground').click(function(event)
{
	if (Animate_Is_Run) return false;
});