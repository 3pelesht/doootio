var animator = null;

$('.play').click(function(e)
{
	var milliSeconds = $('#second').val() * 1000;

	$(this).toggleClass('icon-play3 icon-pause2');
	if ( $(this).hasClass('icon-play3') )
	{
		// pause
		Animate_Is_Run = false;
		clearInterval(animator);
	}
	else
	{
		// play
		Animate_Is_Run = true;
		animator = setInterval(function()
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
		}, milliSeconds);
	}
});
