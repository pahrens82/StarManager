from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.core import serializers
from django.http import JsonResponse
from django.views.generic.edit import CreateView
from django.forms.models import model_to_dict
from django.urls import reverse_lazy


from django.views import generic

from django.http import HttpResponse
from .models import Feature
from .models import Character
from .models import CharacterClass
from .models import Race
from .models import Theme


class ListView(generic.ListView):
    template_name = 'generator/character_list.html'
    context_object_name = 'list'

    def get_queryset(self):
        return Character.objects.all()


def CharacterDetailView(request, id):
    character = get_object_or_404(Character, id=id)
    total_hp = character.race.hit_points + character.character_class.hit_points
    return render(request, 'generator/character_detail.html', {'character': character, 'total_hp': total_hp})


class CharacterCreateView(CreateView):
    model = Character
    fields = '__all__'
    success_url = reverse_lazy('generator:list')


def racefilter(request):
    rargs = getattr(request, request.method)
    race = get_object_or_404(Race, id=rargs['id'])
    first_feature = get_object_or_404(Feature, id=race.first_racial_feature.id)
    second_feature = get_object_or_404(Feature, id=race.second_racial_feature.id)
    third_feature = get_object_or_404(Feature, id=race.third_racial_feature.id)
    fourth_feature = get_object_or_404(Feature, id=race.fourth_racial_feature.id)
    race = model_to_dict(race)
    first_feature = model_to_dict(first_feature)
    second_feature = model_to_dict(second_feature)
    third_feature = model_to_dict(third_feature)
    fourth_feature = model_to_dict(fourth_feature)
    return JsonResponse([race, first_feature, second_feature, third_feature, fourth_feature], safe=False)


def themefilter(request):
    rargs = getattr(request, request.method)
    theme = get_object_or_404(Theme, id=rargs['id'])
    first_feature = get_object_or_404(Feature, id=theme.first_theme_feature.id)
    second_feature = get_object_or_404(Feature, id=theme.second_theme_feature.id)
    third_feature = get_object_or_404(Feature, id=theme.third_theme_feature.id)
    fourth_feature = get_object_or_404(Feature, id=theme.fourth_theme_feature.id)
    theme = model_to_dict(theme)
    first_feature = model_to_dict(first_feature)
    second_feature = model_to_dict(second_feature)
    third_feature = model_to_dict(third_feature)
    fourth_feature = model_to_dict(fourth_feature)
    return JsonResponse([theme, first_feature, second_feature, third_feature, fourth_feature], safe=False)


def classfilter(request):
    rargs = getattr(request, request.method)
    role = get_object_or_404(CharacterClass, id=rargs['id'])
    role = model_to_dict(role)
    return JsonResponse(role)
