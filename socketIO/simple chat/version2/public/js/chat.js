$(function(){
	var id = Number(window.location.pathname.match(/\/chat\/(\d+)$/)[1]);
	var socket = io();
	var name = "",
		img = "",
		friend = "";
	var section = $(".section"),
		footer = $("footer"),
		onConnect = $(".connected"),
		inviteSomebody = $(".invite-textfield"),
		personInside = $(".personInside"),
		chatScreen = $(".chatScreen"),
		left = $(".left"),
		noMessages = $(".noMessages"),
		tooManyPeople = $(".tooManyPeople");
	var chatNickname = $(".nickname-chat"),
		leftNickname = $(".nickname-left"),
		loginForm = $(".loginForm"),
		yourName = $("#yourName"),
		otherName = $("#otherName"),
		chatForm = $("#chatForm"),
		textarea = $("#message"),
		messageTimeSent = $(".timesent"),
		chats = $(".chats");
	var ownerImage = $("#ownerImage"),
		leftImage = $("#leftImage"),
		noMessagesImages = $("#noMessagesImages");
	socket.on('connect', function(){
		socket.emit('load', id);
	});
	socket.on('img', function(data){
		img = data;
	});
	socket.on('peopleinchat', function(data){
		if(data.number === 0){
			showMessage("connected");
			loginForm.on('submit', function(e){
				e.preventDefault();
				name = $.trim(yourName.val());
				if(name.length < 1){
					alert("nick name much be more than 1 charater!!");
					return;
				}
				showMessage("inviteSomebody");
				socket.emit('login',{user:name,id:id});

			});
		}
		else if(data.number === 1){
			showMessage("personinchat",data);
			loginForm.on('submit', function(e){
				e.preventDefault();
				name = $.trim(otherName.val());
				if(name.length < 1){
					alert("nick name much be more than 1 charater!!");
					return;
				}
				socket.emit('login',{user:name,id: id});

			});
		}
		else{
			showMessage("tooManyPeople");
		}
	});
	socket.on('startchat', function(data){
		console.log(data);
		if(data.boolean && data.id == id){
			chats.empty();
			if(name === data.users[0]){
				showMessage("youStartChatWithNoMessage", data);
			}
			else{
				showMessage("otherGuyStartChatWithNoMessage",data);
			}
			chatNickname.text(friend);
		}
	});
	socket.on('leave', function(data){
		if(data.boolean && id == data.room){
			showMessage("otherGuyLeft",data);
			chats.empty();
		}
	});
	socket.on("tooMany", function(data){
		if(data.boolean && name.length ===0){
			showMessage('tooManyPeople');
		}
	});
	socket.on('receive', function(data){
		showMessage('chatStarted');
		if(data.msg.trim().length){
			createChatMessage(data.msg, data.user, data.img,moment());
			scrollToBottom();
		}
	});
	textarea.keypress(function(e){
		if(e.which == 13){
			e.preventDefault();
			chatForm.trigger('submit');
		}
	});
	chatForm.on('submit', function(e){
		e.preventDefault();
		showMessage('chatStarted');
		if(textarea.val().trim().length){
			createChatMessage(textarea.val(), name, img, moment());
			scrollToBottom();
			socket.emit('msg', {msg:textarea.val(), user:name, img:img});
			textarea.val("");
		}
	});
	setInterval(function(){
		messageTimeSent.each(function(){
			var each = moment($(this).data('time'));
			$(this).text(each.fromNow());
		});
	},60000);
	function createChatMessage(msg, user, img, now){
		var who = "";
		if(user === name){
			who = 'me';
		}else{
			who = 'you';
		}
		var li = $(
			'<li class='+who+'>'+
				'<div class=\'image\'>'+
					'<img src='+img+'/>'+
					'<b></b>'+
					'<i class=\'timesent\' data-time='+now+'></i>'+
				'<div>'+
				'<p></p>'+
			'</li>'
			);
		li.find('p').text(msg);
		li.find('b').text(user);
		chats.append(li);
		messageTimeSent = $(".timesent");
		messageTimeSent.last().text(now.fromNow());
	}
	function scrollToBottom(){
		$("html, body").animate({scrollTop: $(document).height()-$(window).height()},1000);
	}
	function showMessage(status, data){
		switch(status){
			case 'connected':
				section.children().css('display','none');
				onConnect.fadeIn(1200);
				break;
			case 'inviteSomebody':
				$('#link').text(window.location.href);
				onConnect.fadeOut(1200, function(){
					inviteSomebody.fadeIn(1200);
				});
				break;
			case 'personinchat':
				onConnect.css('display', 'none');
				personInside.fadeIn(1200);
				chatNickname.text(data.user);
				break;
			case 'youStartChatWithNoMessage':
				left.fadeOut(1200, function(){
					inviteSomebody.fadeOut(1200, function(){
						noMessages.fadeIn(1200);
						footer.fadeIn(1200);
					});
				});
				friend = data.users[1];
				break;
			case 'otherGuyStartChatWithNoMessage' :
				personInside.fadeOut(1200, function(){
					noMessages.fadeIn(1200);
					footer.fadeIn(1200);
				});
				friend = data.users[0];
				break;
			case 'chatStarted' :
				section.children().css('display', 'none');
				chatScreen.css('display','block');
			case 'otherGuyLeft' :
				leftNickname.text(data.user);
				section.children().css('display', 'none');
				footer.css('display', 'none');
				left.fadeIn(1200);
				break;
			case 'tooManyPeople' :
				section.children().css('display', 'none');
				tooManyPeople.fadeIn(1200);
				break;
			default:
				break;
		}
	}
});