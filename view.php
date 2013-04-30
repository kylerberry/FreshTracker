<?php include 'header.php'; ?>

<div class="app-wrap">

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

				<form method="get">
					<div class="timer_controls">
						<a href="#" title="start timer" class="start_timer" id="start_timer"></a>
						<a href="#" title="pause timer" class="pause_timer" id="pause_timer"></a>
						<div class="timer" id="timer"></div>
						<a href="#" title="reset timer" class="reset_timer" id="reset_timer"></a>
					</div>
					<a href="#" title="Add a comment" id="add_comment">Add Comment &gt;</a>
					<input type="textarea" class="comment" name="comment" id="comment" value="Add a note to this task" />
					<a href="#" title="submit" class="submit button radius clearfix">Save</a>
				</form>

			</div>
		</div>	
	</div>
</div>

<?php include 'footer.php'; ?>