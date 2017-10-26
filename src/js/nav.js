$('.prev, .next').click(function()
{
	if (Animate_Is_Run) return false;

	if ( $(this).is('.prev') )
	{
		if (_FRAMENUMBER > 1)
		{
			_FRAMENUMBER--;
		}
		else
		{
			return;
		}
	}
	else
	{

		if (_FRAMENUMBER < maps.length)
		{
			_FRAMENUMBER++;
		}
		else
		{
			return;
		}
	}

	mapDraw();
});
