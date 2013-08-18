# tcpmelody

A small app that associates events within your webapp with sound.

## Requirements

tcpmelody is build with Node.js and ZeroMQ. You'll need them.

## Usage

A sample config file is included with the project. Just make the necessary adjustments and run: nodejs app.js

### Melody

The base class will listen for events over a message queue and play sounds when it receives one it recognizes.

### HttpMelody

Like Melody, but over HTTP rather than a message queue. Accepts the event name as a GET parameter named `e`

### Monitors

Monitors associate a sound loop with the state of your app (up or down).