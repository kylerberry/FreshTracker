/*=====================================
            LOGIN/LOGOUT
=======================================*/

var logout = function() {
    Trello.deauthorize();
    $('#display').empty();
    updateLoggedIn();
};

var updateLoggedIn = function() {
    var isLoggedIn = Trello.authorized();
    $("#loggedout").toggle(!isLoggedIn);
    $('.signout').html('<li class="divider"></li><li class=""><a id="disconnect" href="#">Sign Out</a></li>',!isLoggedIn);

    $("#loggedin").toggle(isLoggedIn);
    $('.signout').toggle(isLoggedIn);
};

/*======================================
            AUTHORIZE
=======================================*/

var onAuthorize = function() {
    updateLoggedIn();
    //window.location.reload(true);
    toggleDisplay();

    $("#output").empty();
//
    Trello.members.get("me", function(member){
        $("#fullName").text(member.fullName);

    });

    //shows existing boards on load
    showBoards();

    //CLICK ON A BOARD
    $("#display").on('click', '.board', function(e) {
        e.preventDefault();
        //ads a selected look
        $(this).toggleClass('disable');
        $(this).toggleClass('active');

        //if a task is in view, when you click a board it will make it go away
        if($(".task").height() > 0) {
            $('.task').stop().animate({'height':0});
        }

        //loops through all boards, accept the selected one to make them look disabled
        $(".board").not($(this)).each( function() {
            if($(this).hasClass('active')) {
                $(this).toggleClass('active');
                $(this).toggleClass('disable');
            }
        });

        // this prepends the selected board to the top; its cool but needs to animate to be user-friendly
        //http://stackoverflow.com/questions/907279/jquery-animate-moving-dom-element-to-new-parent
        // $(this).parent().prependTo(".boards");

        //this empties the cards container if a Board is un-clicked
        $(".cards").empty();

        //only pulls more cards if the board being clicked is new
        //as opposed to unselecting an existing one
        if($(this).hasClass('active')) {
            var $id = $(this).attr('id');
            var $event = e;
            //displays the cards
            showCards($id,$event);
        }
    });

    //CLICK ON A CARD
    //i should turn this into a function that accepts arguments
    $("#display").on('click', '.card', function(e) {
        e.preventDefault();
        $(this).toggleClass('disable');
        $(this).toggleClass('active');

        $(".card").not($(this)).each( function() {
            if($(this).hasClass('active')) {
                $(this).toggleClass('active');
                $(this).toggleClass('disable');
            }
        });

        //displays the action box
        showAction($(this));
    });

    $('#action').on('click', '#submit', function() {
        putTaskData($(this).attr('data-role'));
    });

};

/*=====================================
            THE DISPLAY
=======================================*/

var toggleDisplay = function() {
    $('#display').toggle();
};

var showBoards = function() {
        var $boards = $('.boards').html('<div id="floatingCirclesG"><div class="f_circleG" id="frotateG_01"></div><div class="f_circleG" id="frotateG_02"></div><div class="f_circleG" id="frotateG_03"></div><div class="f_circleG" id="frotateG_04"></div><div class="f_circleG" id="frotateG_05"></div><div class="f_circleG" id="frotateG_06"></div><div class="f_circleG" id="frotateG_07"></div><div class="f_circleG" id="frotateG_08"></div></div>');
        //timeout function is to make the interaction smoother and less jarring
        setTimeout(function(){
            Trello.get("members/my/boards/pinned", function(boards) {
                $boards.empty();
                $.each(boards, function(ix, board) {
                    $("<a>").attr({href: board.url, target: "trello"})
                        .addClass("board disable")
                        .attr("id", board.id)
                        .text(board.name)
                        .appendTo($boards)
                        .wrap("<li>")
                        .append("<span>");
                });
            });
        },500);
        // Output a list of all of the boards that the member has pinned
};

var showCards = function(id, event) {
        console.log("id:" + id);
        //gets the board id of the selected board
        var $selected_board_id = id;
        var $cards = $('.cards').html('<div id="floatingCirclesG"><div class="f_circleG" id="frotateG_01"></div><div class="f_circleG" id="frotateG_02"></div><div class="f_circleG" id="frotateG_03"></div><div class="f_circleG" id="frotateG_04"></div><div class="f_circleG" id="frotateG_05"></div><div class="f_circleG" id="frotateG_06"></div><div class="f_circleG" id="frotateG_07"></div><div class="f_circleG" id="frotateG_08"></div></div>');

        // Output a list of all of the cards that belong to the selected board
        //timeout function is to make the interaction smoother and less jarring
        setTimeout(function(){
            Trello.get("/boards/" + $selected_board_id + "/cards", function(cards) {
                $cards.empty();
                $.each(cards, function(ix, card) {
                     console.log(card);
                    $("<a>").attr({href: card.url, target: "trello", id:card.id})
                        .addClass("card disable")
                        .html(card.name /*+ ": " + card.idList*/)
                        .appendTo($cards)
                        .wrap("<li>")
                        .append("<span>");
                });
            });
        },500);
};

var showAction = function(sender) {
    $sender = sender;

    if($('.task_title').text() === '') {
        $('.task_title').text($sender.text());
    }

    if($('.task').height() > 0) {
        $('.task').stop().animate({'height':0}, function() {
                //resets the timer when a new task window is opened
                resetTimer();
                //sets the title of the current task window
                $('.task_title').text($sender.text());
            });

        //check if the sender is active. so if it's closed it doesn't reopen the task window
        if($sender.hasClass('active')) {
            $('.task').animate({'height':285});

        }
    } else {
        $('.task').show().stop().animate({'height':285}, function() {
            $('.task_title').text($sender.text());
        });
    }

    console.log($sender.attr('id'));

    $('#submit').attr('data-role', $sender.attr('id') );

    loadFreshClients();
};

Trello.authorize({
    interactive:false,
    success: onAuthorize
});

$("#connectLink")
.click(function(){
    Trello.authorize({
        type: "popup",
        scope: { read: true, write: true },
        success: function() {
            onAuthorize();
            //this refreshes the page at every login attempt in order to reset the states of boards and cards
            //if user logged out and then back in, selected states stopped working
            window.location.reload(true);
        }
    });
});

//puts a comment with time in trello card
var putTaskData = function(id) {
    //time saving should be done in a better way. this is a quick fix
    var $minutes = $('.minutes').text();
    var $seconds = $('.seconds').text();
    var $hours = $('.hours').text();

    /*var select = document.getElementById("client_select");

    select.onchange = function() {
        var selIndex = select.selectedIndex;
        var selValue = select.options(selIndex).innerHTML;
    };

    console.log(select);*/

    var $time = $hours + " hours, " + $minutes + " minutes, " + $seconds + " seconds.";

    var $card_id = id;

    Trello.post("cards/" + $card_id + "/actions/comments", {
        text: "~=:FreshTracker:=~ Time Spent On Task: " + $time
    });
};


$(".signout").on('click', '#disconnect', logout);
//$(window).ready(checkLoggedInOnRefresh);