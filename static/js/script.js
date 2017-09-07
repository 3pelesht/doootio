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

			row.appendChild(cell);
		}

		document.getElementById('table').appendChild(row);
	}
}
createElement();
$("#table").bind('mousedown', function(event){
	event.target.classList.add('selected');
	$(this).bind('mousemove.ifDOwn', function(event){
		event.target.classList.add('selected');
	});
});

$(document).on('mouseup', function(){
	$("#table").unbind('mousemove.ifDOwn');
});




//Select Cells and add "selected" to Classlist
//


//check for remove the select class
// Element.prototype.hasClass = function(className) {
//     return this.selected && new RegExp("(^|\\s)" + selected + "(\\s|$)").test(this.selected);
// };

// document.getElementsByClassName("selected").classList.toggle(" ");

// $(function()
// {
//     $( "#selectable" ).bind("mousedown", function(event, ui)
//     {
//         var result = $( ".cell" ).empty();
//         event.ctrlKey = true;
//     });

//     $( "#selectable" ).selectable();

// });

// cell.addEventListene('mousedown', fuction(){
	// this.addClass('selected');

		// this.mousemove(function(event)
		// {

		// this.addClass('selected');

		// });
// });

// var cell = document.getElementsByClassName('cell');

// 	this.('mousedown', function()
// 	{
// 		this.addClass('selected');
// 		this.addEventListene('mousemove', )

// 	});
