from django.shortcuts import render
from django.views import generic


from generator.models import Character


def index(request):
    characters = Character.objects.all()
    return render(request, 'home/index.html', {'characters': characters})
