var animator = null;

function runAnimation()
{
	_FRAMENUMBER++;
	if (!maps[_FRAMENUMBER])
	{
		_FRAMENUMBER = 1;
	}

	mapDraw();

	// Execute function 'run' every ... second
	var milliSeconds = maps[_FRAMENUMBER].fps * 1000;
	animator = setTimeout('runAnimation()', milliSeconds);
}

$('.play').click(function(e)
{
	$(this).toggleClass('icon-play3 icon-pause2');
	if ( $(this).hasClass('icon-play3') )
	{
		// pause
		Animate_Is_Run = false;
		clearTimeout(animator);
	}
	else
	{
		// play
		Animate_Is_Run = true;
		var milliSeconds = maps[_FRAMENUMBER].fps * 1000;
		// runAnimation();
		animator = setTimeout('runAnimation()', milliSeconds);
	}
});

$('.stop').click(function()
{
	_FRAMENUMBER = 1;
	mapDraw();
	Animate_Is_Run = false;
	clearTimeout(animator);
	if ( $('.play').is('.icon-pause2') )
	{
		$('.play').toggleClass('icon-play3 icon-pause2');
	}
});
