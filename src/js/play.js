var animator = null;

function runAnimation()
{
	_FRAMENUMBER++;
	if (!maps[_FRAMENUMBER])
	{
		_FRAMENUMBER = 1;
	}

	$('.row').css({
		'background-color': maps[_FRAMENUMBER].backgroundColor
	});

	mapDraw();

	$('.frame').removeClass('active');
	$('.frame').eq(_FRAMENUMBER - 1).addClass('active');
	$('.icon-fps').attr('data-fps', maps[_FRAMENUMBER].fps);

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
