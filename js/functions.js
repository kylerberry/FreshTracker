$(document).ready(function() {

//makes first request to Trello for all public cards(projects) from the user
var initialRequest = function(command) {
	//this is the array that stores data for the ajax request depending on what type of command it is given
	//scrapped for now because I don't know what the best way to display my data on Success of the Ajax call
	/*var ajax_data = {
		data:null,
		type:'POST',
		dataType:'html',
		url:'includes/curl.php'
	};


	if(!command) {}

	*/

	// adds the command to the POST variable if there is one
	var cmnd = 'command=';
	cmnd += command;

	$.ajax({
		data: 'command=',
		type: 'POST',
		dataType: 'json',
		url:'includes/curl.php',
		beforeSend:function() {
			$('#output').append('<div id="floatingCirclesG"><div class="f_circleG" id="frotateG_01"></div><div class="f_circleG" id="frotateG_02"></div><div class="f_circleG" id="frotateG_03"></div><div class="f_circleG" id="frotateG_04"></div><div class="f_circleG" id="frotateG_05"></div><div class="f_circleG" id="frotateG_06"></div><div class="f_circleG" id="frotateG_07"></div><div class="f_circleG" id="frotateG_08"></div></div>');
		},
		success:function(response) {
			$('#floatingCirclesG').remove();
			console.log(response);
		},
		fail:function(response) {

		}
	});
};

});