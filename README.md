# Prototype
First Prototype attempt of a web-based jukebox.

THE TWU DIGITAL JUKEBOX 
Technical Documentation


ABOUT THE PROJECT
We’re Marlene and Erin and we both love music. We love to share music and we love to discover new music favorites. Our problem is that we need a way to easily find new music from and share music favorites with our friends and people all over the world. To solve this problem, we developed the Digital Jukebox. The Digital Jukebox allows us to be digital DJs as well as online listeners who share and discover music. Marlene was the initial driving force behind the Jukebox, completing initial Node.js research, developing the initial code and building the interfaces. Erin joined the team later to help refine the jukebox, document replication techniques, and implement interface testing.


REPLICATION
Join us on the Digital Jukebox! The website, webserver, and physical interface are all implemented on the Raspberry Pi. This is a project that anyone with a Raspberry Pi and a few electronic components can replicate in a few hours with no prior experience. 

Electronic components
There are several ways in which the Breadboard to Raspberry Pi circuits can be configured. 

If you are not familiar with electrical components, the recommended setup uses the following components and picture below (duplicated for 2 push buttons and LEDs).
•	1 x Breadboard
•	2 x 68 Ohm resistors* 
•	2 x 1k Ohm resistors*
•	2 x Through Hole LEDs
•	2 x Push Buttons
•	8 x Female to male jumper wires (yellow-signal, long red - current, blue - ground)
•	2 x Male to Male jumper wires(short red - current)
 

If you are more familiar with electronic components, general wiring, and the Raspberry Pi GPIO, then you will not need detailed instructions. Use the breadboard to create two push buttons and two LEDs in parallel, with connections to the following Raspberry Pi GPIO pins:
•	3.3 V - Raspberry Pi, physical Pin #1 or 17
•	Ground – Raspberry Pi, physical pin #6, 14, 20, 25, 30, 34, or 39
•	Blue button - GPIO17 
•	Blue LED - GPIO11
•	Green button
•	Green LED


Raspberry Pi Package Installation
Before installing new packages, update Raspbian with the two commands below. All commands from this point should be run from the “pi: ~ $”  drive unless otherwise noted with “/<other drive>$”.
$ sudo apt-get update
$ sudo apt-get dist-upgrade


Node.js
Node.js is a free, JavaScript open source server environment which can run on multiple platforms. It is an efficient runtime environment and has the largest ecosystem of open-source libraries in the world, simplifying implementation for various types of projects.   Install Node.js in these 3 easy steps:
1.	First, download and install newest version of Node.js
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash –
2.	Next, install, Node.js
$ sudo apt-get install -y nodejs
3.	Finally, check that the installation was successful by looking at the version number
$ node -v


onoff Module and Socket.io
The onoff Module relays signals from the Raspberry Pi GPIO and socket.io enables bi-directional feeback in real time over the web through from the interfaces. Install these packages next.
$ npm install onoff
$ npm install socket.io --save


Create the drives for the code
$ mkdir nodetest
$ cd nodetest


Create your webserver, socket, and site
In the "nodetest" directory create a new directory we can use for static html files. All accompanying images and CSS  files should be in their own folders in this drive.
/nodetest $ mkdir public

Next, set up the webserver by creating a Node.js file that opens the requested file and returns the content to the client. For any problems, a 404 error is thrown.
/nodetest $ nano webserver.js
Inside this file, paste the contents of the webserver.js code.


Now, go back to the folder "public", create the placeholder index.html file, and check the webserver:

/nodetest $ cd public
/nodetest/public $ nano index.html
Inside this file, paste the contents of the index.html code.



Go back to the /nodetest director and test the server and site.
/nodetest/public $ cd ..
/nodetest $ node webserver.js

Open the website in any browser using http://<insert your RaspberryPi_IP address here>:8080/:

The webserver should now be up and running and the client should send changes to and from the checkboxes to the Raspberry Pi interface.


Directory Setup
Pay particular attention the directory setup. While this seems to be a trivial item, any file or folder placed in an incorrect directory can prevent the entire Jukebox from running. The /nodetest and /nodetest/public directories should appear as below:
<screen cap nodetest>

<screen cap nodetest/public>


USING THE INTERFACES
Both the online and physical interfaces have been designed simply for usability and 
Online Interface
Physical Interface

OPERATING EXAMPLES
Initial Prototype
Revised Prototype
Final Prototype
