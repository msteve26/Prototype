var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED4 = new Gpio(4, 'out'); //use GPIO pin 4 as output
var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var LED22 = new Gpio(22, 'out');
var pushButton2 = new Gpio(27, 'in', 'both');


http.listen(8080); //listen to port 8080

function handler (req, res) { //create server

if (req.url === "/") {
  fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}else if (req.url === "/img/record.jpg") {
  fs.readFile(__dirname + '/public/img/record.jpg', function(err, data) {
     if (err) {
       res.writeHead(404, {'Content-Type': 'image/jpeg'});
       return res.end("404 Not Found");
     }
     res.writeHead(200, {'Content-Type': 'image/jpeg'});
     res.write(data);
     return res.end();
  });
}else if (req.url === "/img/chat.jpg") {
  fs.readFile(__dirname + '/public/img/chat.jpg', function(err, data) {
     if (err) {
       res.writeHead(404, {'Content-Type': 'image/jpeg'});
       return res.end("404 Not Found");
     }
     res.writeHead(200, {'Content-Type': 'image/jpeg'});
     res.write(data);
     return res.end();
  });
}else if (req.url === "/img/genre.jpg") {
  fs.readFile(__dirname + '/public/img/genre.jpg', function(err, data) {
     if (err) {
       res.writeHead(404, {'Content-Type': 'image/jpeg'});
       return res.end("404 Not Found");
     }
     res.writeHead(200, {'Content-Type': 'image/jpeg'});
     res.write(data);
     return res.end();
  });
}else if (req.url === "/img/upload.png") {
  fs.readFile(__dirname + '/public/img/upload.png', function(err, data) {
     if (err) {
       res.writeHead(404, {'Content-Type': 'image/png'});
       return res.end("404 Not Found");
     }
     res.writeHead(200, {'Content-Type': 'image/png'});
     res.write(data);
     return res.end();
  });
}else if (req.url === "/img/songs.gif") {
  fs.readFile(__dirname + '/public/img/songs.gif', function(err, data) {
     if (err) {
       res.writeHead(404, {'Content-Type': 'image/gif'});
       return res.end("404 Not Found");
     }
     res.writeHead(200, {'Content-Type': 'image/gif'});
     res.write(data);
     return res.end();
  });
}else if (req.url === "/img/booth.jpg") {
  fs.readFile(__dirname + '/public/img/booth.jpg', function(err, data) {
     if (err) {
       res.writeHead(404, {'Content-Type': 'image/jpeg'});
       return res.end("404 Not Found");
     }
     res.writeHead(200, {'Content-Type': 'image/jpeg'});
     res.write(data);
     return res.end();
  });
}else if (req.url === "/img/Gclef.png") {
  fs.readFile(__dirname + '/public/img/Gclef.png', function(err, data) {
     if (err) {
       res.writeHead(404, {'Content-Type': 'image/png'});
       return res.end("404 Not Found");
     }
     res.writeHead(200, {'Content-Type': 'image/png'});
     res.write(data);
     return res.end();
  });
} else if (req.url === "/css/style.css") {
  fs.readFile(__dirname + '/public/css/style.css', function(err, data) {
     if (err) {
       res.writeHead(404, {'Content-Type': 'text/css'});
       return res.end("404 Not Found");
     }
     res.writeHead(200, {'Content-Type': 'text/css'});
     res.write(data);
     return res.end();
  });

} else {
  return res.end();
}
}

io.sockets.on('connection', function (socket) {// WebSocket Connection
  var lightvalue = 0; //static variable for current status
  pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton
    if (err) { //if an error
      console.error('There was an error', err); //output error message to console
      return;
    }
    lightvalue = value;
    socket.emit('light', lightvalue); //send button status to client
  });
  var lightvalue2 = 0;
  pushButton2.watch(function (err,value) {
    if (err) {
      console.error('There was an error', err);
      return;
    }
    lightvalue2 = value;
    socket.emit('light2', lightvalue2);
  });
  socket.on('light', function(data) { //get light switch status from client
    lightvalue = data;
    if (lightvalue != LED4.readSync()) { //only change LED if status has changed
      LED4.writeSync(lightvalue); //turn LED on or off
  }
  socket.on('light2', function(data) {
    lightvalue2 = data;
    if (lightvalue2 !=LED22.readSync()) {
      LED22.writeSync(lightvalue2);
    }
  });
});

process.on('SIGINT', function () { //on ctrl+c
  LED4.writeSync(0); // Turn LED off
  LED4.unexport(); // Unexport LED GPIO to free resources
  pushButton.unexport(); // Unexport Button GPIO to free resources
  process.exit(); //exit completely
});
});
process.on('SIGINT', function () {
  LED22.writeSync(0);
  LED22.unexport();
  pushButton2.unexport();
  process.exit();
});
