$('.icon-bin').click(function(event)
{
	delete maps[_FRAMENUMBER];
	var length = maps.length--;
	var position = null;
	if(length > _FRAMENUMBER)
	{
		for (var i = parseInt(_FRAMENUMBER); i < length; i++) {
			maps[i] = maps[i+1];
		}
		$("[data-frame="+length+"]").removeClass('on');
		delete maps[length];
	}
	else if(length == 1)
	{
		maps.length = 1;
		maps["1"] = {
			map: [],
			fps: 1,
			start : {
				x: 0,
				y: 0
			}
		};
		for (var i = 0; i < rows; i++) {
			maps["1"].map[i] = [];
			for (var j = 0; j < cols; j++) {
				maps["1"].map[i][j] = null;
			}
		}
	}
	else if(length == _FRAMENUMBER)
	{
		$("[data-frame="+_FRAMENUMBER+"]").removeClass('active').removeClass('on');
		_FRAMENUMBER--;
		$("[data-frame="+_FRAMENUMBER+"]").addClass('active');
		delete maps[length];
	}
	mapDraw();
});