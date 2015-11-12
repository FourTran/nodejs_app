function() {

    // connect to server
    var socket = io.connect(window.location.href);

    // when a message is emitted from server, display in the chat window.
    socket.on('message:server', function(data) {
        $("#messages").append(
            '<li style="background-color:#e0edff;border-style: dashed;float:left">' +
            data.message+
            '</li><br>'2
        );
    });

    // handle the form's "submit" event so as to not let it actually POST to server
    $("#message_form").on('submit', function(event) {

        // prevent POST
        event.preventDefault();

        // grab the "message" field from the form
        var $input = $('[name="message"]')
        var message = $input.val();

        // send message from client
        if (message) {
            socket.emit('message:client', {message: message});
        }

        // display message in UI
        $("#messages").append(
            '<li style="background-color:#BEE6F6;float:right;border-style: dashed">' + 
            message+
            '</li><br>'
        );

        // clear form
        $input.val('');
    });

    // listen for errors
    socket.on('error', function() {
        console.error(arguments)
    });
}