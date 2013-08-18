# Place in models.py

from django.conf import settings

try:
	import zmq
except ImportError:
	zmq = None

if getattr(settings, 'JAZZ_SERVER', None) and zmq:
	context = zmq.Context()
 
	client = context.socket(zmq.REQ)
	client.connect('tcp://%s' % settings.JAZZ_SERVER)
else:
	client = None

def ping(*args, **kwargs):
	client.send('ping')
	client.recv()

def trash(*args, **kwargs):
	client.send('trash')
	client.recv()

def error(*args, **kwargs):
	client.send('error')
	client.recv()

if client:
	client.send('ping')
	client.recv()

	from django.core.signals import request_started, got_request_exception
	from django.db.models.signals import post_delete

	request_started.connect(ping)
	post_delete.connect(trash)

	got_request_exception.connect(error)