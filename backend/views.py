from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import requests
import json
from django.conf import settings
import os

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