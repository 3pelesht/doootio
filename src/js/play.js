var animator = null;

function runAnimation()
{
	console.log(1);
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

	// Execute function 'run' every ... second
	var milliSeconds = maps[_FRAMENUMBER].fps * 1000;
	animator = setTimeout('runAnimation()', milliSeconds);
}

$('.play').click(function(e)
{
	console.log(2);
	$(this).toggleClass('icon-play3 icon-pause2');
	if ( $(this).hasClass('icon-play3') )
	{
		// pause
		Animate_Is_Run = false;
		clearTimeout(animator);
	}
	else
	{
		console.log(3);
		// play
		Animate_Is_Run = true;
		var milliSeconds = maps[_FRAMENUMBER].fps * 1000;
		console.log(milliSeconds);
		// runAnimation();
		animator = setTimeout('runAnimation()', milliSeconds);
	}
});
