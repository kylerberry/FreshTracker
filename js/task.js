$('#action').on('click','#add_comment',function(e) {
	e.preventDefault();
	$('#comment').toggle();
});

var timer = new Timer(1000);
var $seconds = timer.currentCount;
var $minutes = 0;
var $hours = 0;

//updates the timer
timer.addEventListener(TimerEvent.TIMER, function(e)
{
	$seconds++;
	if($seconds <= 59) {
		//keeps the seconds at double digits
		if($seconds < 10) {
			$seconds = '0'+$seconds;
		}
		//sets the seconds
		$('.seconds').text($seconds);
	} else {
		$seconds = '0'+0;
		$minutes++;
		//keeps the minutes at double digits
		if($minutes < 10) {
			$minutes = '0'+$minutes;
		}
		//set the new minute, reset the seconds
		$('.minutes').text($minutes);
		$('.seconds').text($seconds);

		if($minutes > 59) {
			$minutes = '0'+0;
			$hours++;
			//keeps the minutes at double digits
			if($hours < 10) {
				$hours = '0'+$hours;
			}
			//set the new hour, reset the minute
			$('.hours').text($hours);
			$('.minutes').text($minutes);
		}
	}

});

var resetTimer = function() {
	timer.reset();
	$seconds = timer.currentCount;
	$('.seconds, .minutes, .hours').text('00');
	$('.start_timer').show();
	$('.pause_timer').hide();
};

var loadFreshClients = function() {
	$.ajax({
		data:null,
		dataType:'html',
		type:'GET',
		url:'./includes/curl.php',
		success:function(response) {
			var firstnames = $(response).find("first_name");
			var lastnames = $(response).find("last_name");
			var ids = $(response).find("client_id");

			console.log(firstnames.length);

			$.each(firstnames, function(ix) {
				$('<option>')
					.appendTo('select')
					.addClass(ids[ix].innerText)
					.html(firstnames[ix].innerText + " " + lastnames[ix].innerText);
			});
			
		},
		fail:function(response) {
			$('select').replaceWith('<p>').addClass('error');
			$('.error').text(response);
		}
	});
};

$('#action').on('click','.start_timer', function() {
	timer.start();
	$(this).toggle();
	$('.pause_timer').toggle();
});

$('#action').on('click','.pause_timer', function() {
	timer.stop();
	$(this).toggle();
	$('.start_timer').toggle();
});

$('#action').on('click','.reset_timer', resetTimer);

