## tcpjazz

A small app that associates events within your webapp with sound.

***

#### Requirements

You'll need:

* Node.js ([http://nodejs.org/](http://nodejs.org/ "Nodejs"))
* ZeroMQ ([http://zeromq.org/](http://zeromq.org/) "ZeroMQ"))
* Sox `sudo apt-get install sox`
* Underscore `sudo npm install underscore`

***

#### Usage

A sample config file is included with the project. Just make the necessary adjustments and run:
  
    $ nodejs app.js

***

#### Jazz

The base class will listen for events over a message queue and play sounds when it receives one it recognizes.

***

#### HttpJazz

Like Jazz, but over HTTP rather than a message queue. Accepts the event name as a GET parameter named `e`

***

#### Monitors

Monitors associate a sound loop with the state of your app (up or down).
