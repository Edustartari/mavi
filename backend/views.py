from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import requests
import json
from django.conf import settings
import os
import redis

redis_client = redis.Redis.from_url(settings.REDIS_URL)

redis_client.set('test', json.dumps({
	'message': 'This is a test message stored in Redis.'
}), ex=30)
test_info = redis_client.get('test')

# Create your views here.
def index(request):
	context = {}
	return render(request, 'index.html', context)

def test(request):
	response_dict = {
		'status_message': 'success',
		'data': []
	}
	return JsonResponse(response_dict, safe=False)