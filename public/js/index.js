var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () { 
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    var template = jQuery('#message-template').html();
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var html = Mustache.render(template, { text: message.text, formattedTime: formattedTime, from: message.from });
    jQuery('#messages').append(html);

});

socket.on('newLocationMessage', function (message) {
    var template = jQuery('#location-message-template').html();
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var html = Mustache.render(template, { url: message.url, from: message.from, formattedTime: formattedTime });
    jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');

    socket.emit(
      "createMessage",
      {
        from: "User",
        text: messageTextbox.val()
      },
      function() {
        messageTextbox.val("");
      }
    );
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