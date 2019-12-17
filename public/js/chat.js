let socket = io();

socket.on('connect', () => {
    let params = JSON.parse('{"' + decodeURI(window.location.search.substring(1)).replace(/&/g, '","').replace(/\+/g, ' ').replace(/=/g, '":"') + '"}');

    socket.emit('join', params, (err) => {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No errors.')
        }
    });
});

// Disconnected
socket.on('disconnect', () => {
    console.log('Disconnect from Server.')
});

// Receive Message
socket.on('ServerToClientText', message => {
    let msgTemplate = $("#message-template").html();
    let html = Mustache.render(msgTemplate, {
        from: message.from,
        text: message.text,
        createdAt: message.createdAt
    });
    $("<li/>")
        .html(html)
        .appendTo("#conservation");
    // var messageBody = document.querySelector('#conservation');
    // messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    scrollDown('#conservation');

});

// Client Get Geo Location
socket.on('ServerToClientGeoLocation', location => {
    let msgTemplate = $("#location-message-template").html();
    let html = Mustache.render(msgTemplate, {
        from: location.from,
        url: location.url,
        createdAt: location.createdAt
    });
    $("<div/>")
        .html(html)
        .appendTo("#conservation");
    // var messageBody = document.querySelector('#conservation');
    // messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    scrollDown('#conservation');

});

// Add new user to people list
socket.on('updateUsers', users => {
    $("#rooms").empty();
    let msgTemplate = $("#people-name-template").html();

    $.each(users, (key, val) => {
        let html = Mustache.render(msgTemplate, {
            name: val
        });
        $("<li/>")
            .html(html)
            .appendTo("#rooms");
    });
});

$(document).ready(function(){
    $("#send-btn").click(function (e) {
        e.preventDefault();

        if ($("#msg-txtbox").val().length === 0) {
            alert('Empty Message is not valid.');
            return;
        }

        // Send Message
        socket.emit('ClientToServerText', {
            text: $('#msg-txtbox').val()
        }, (cbMsg) => {
            console.log('Client Done.', cbMsg);
        });
        $("#msg-txtbox").val('');
    });

    $("#sendLocation-btn").click(function (e) {
        if (!navigator.geolocation) {
            alert("Geo Location is not supported by your Browser");
        }

        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            socket.emit('ClientToServerGeoLocation', {
                position: {
                    lon: position.coords.longitude,
                    lat: position.coords.latitude,
                    acc: position.coords.accuracy
                }
            });
        }, function (err) {
            alert(err.message);
            console.log(err);
        });
    });
});

function scrollDown(identifier) {
    let messageBody = document.querySelector(identifier);
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
}
