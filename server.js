var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var x = 'inicial';

app.set('port',(process.env.PORT || 5000));

app.get('/', function(req, res) {
res.sendFile(__dirname + "/index.html");
});

io.on('connection', function (socket) {
x = socket;
});

app.get('/sendevent', function(request, response) {
console.log('XXXXX');
x.emit('news', {hello: 'cachvache'});
response.send('FINITO');
});

http.listen(app.get('port'), function(){
console.log('listening on:'+app.get('port'));
});