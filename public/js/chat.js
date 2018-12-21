var socket = io();

function scrollToBottom () {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight - clientHeight);
    }
}

socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if(err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('Joined room ' + params.room);
        }
    });
});

socket.on('disconnect', function () { 
    console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
    var template = jQuery('#user-list-template').html();
    var html = Mustache.render(template, { userNames: users });
    jQuery('#users').html(html);
});

socket.on('newMessage', function (message) {
    var template = jQuery('#message-template').html();
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var html = Mustache.render(template, { text: message.text, formattedTime: formattedTime, from: message.from });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    var template = jQuery('#location-message-template').html();
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var html = Mustache.render(template, { url: message.url, from: message.from, formattedTime: formattedTime });
    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');

    if(messageTextbox.val().length > 1){
        socket.emit(
            "createMessage",
            {
                from: "User",
                text: messageTextbox.val()
            },
            function () {
                messageTextbox.val("");
            }
        );
    }
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function(e) {
    if(!navigator.geolocation){
        return alert('Geolocation is not available');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr("disabled").text('Send location');

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function (err) {
        locationButton.removeAttr('disabled').text('Send location');
        alert(`Unable to fetch location: ${err.message}`);
    });
});