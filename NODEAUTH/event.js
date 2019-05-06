const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('logging', function(arg) {
	console.log('event occur ', arg);
});


emitter.on('log', function(arg) {
        console.log('event occur ', arg);
});

emitter.emit('logging', { data: 'himansu'});
emitter.emit('log', {data: 'anandani'});
