var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
app.listen(8000);
function handler(req, res) {
	fs.readFile(__dirname + '/index.html', function(err, data) {
		if(err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}	
		res.writeHead(200);
		res.end(data);
	});
}
io.sockets.on('connection', function(socket) {
	socket.on('set nickname', function(name) {
        socket.set('nickname', name, function() {
            socket.emit('ready');
            socket.broadcast.emit('user connected', {msg: name+' is connected!'});
            //socket.broadcast.json.send({a: name + ' connected!'});
            //socket.broadcast.json.send({msg: 'someone connected'});
        });
    });
});
