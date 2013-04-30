<?php include 'header.php'; ?>

<div class="app-wrap">

	<div class="row">
		<div id="loggedout" class="small-4 large-4 large-centered column">
			<p>Freshtracker currently reads in YOUR Trello tasks, but due to time constraints only loads MY freshbooks clients. When you save time on a task it is added as a comment in Trello. Thanks. -Kyler</p>
		    <a id="connectLink" class="column large button radius" href="#">Connect To Trello</a>
		</div>
	</div>

	<div class="row" id="display">
		<div class="third small-4 large-4 column" id="boards">
			<p>Select a Board</p>
			<div id="loggedIn">
			    <ul id="output" class="boards">

			    </ul>
			</div>
		</div>
		
		<div class="third small-4 large-4 column" id="cards">
			<p>Choose a Card to work on</p>
			<ul class="cards">

			</ul>
		</div>

		<div class="third small-4 large-4 column" id="action">
			<p>Track your time and Save</p>
			<div class="task">
				<h3 class="task_title"></h3>

				<form method="get">
					<div class="timer_controls">
						<a href="#" title="start timer" class="start_timer" id="start_timer"><i class="icon-play icon-2x"></i></a>
						<a href="#" title="pause timer" class="pause_timer" id="pause_timer"><i class="icon-pause icon-2x"></i></a>
						<ul class="timer" id="timer">
							<li class="hours">00</li>
							<li>:</li>
							<li class="minutes">00</li>
							<li>:</li>
							<li class="seconds">00</li>
						</ul>
						<a href="#" title="reset timer" class="reset_timer" id="reset_timer"><i class="icon-remove icon-large"></i>reset</a>
					</div>
					<div class="comment_save_controls">
						Choose a Freshbooks Client...
						<select id="client_select">
							<!-- fill with options from freshbook -->
							<option value="client_1"></option>
						</select>
						Add Comment...
						<textarea class="comment" name="comment" id="comment" value="" ></textarea>
						<!--<input type="submit" data-role="" title="submit" id="submit" class="submit button radius clearfix" value="save">-->
						<a href="#" data-role="" title="submit" id="submit" class="submit button radius clearfix">Save</a>
					</div>
				</form>

			</div>
		</div>	
	</div>
</div>

<?php include 'footer.php'; ?>