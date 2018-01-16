from django.contrib import admin

from generator.models import Character
from generator.models import CharacterClass
from generator.models import Feature
from generator.models import Race
from generator.models import Skill
from generator.models import Theme

admin.site.register(Character)
admin.site.register(CharacterClass)
admin.site.register(Feature)
admin.site.register(Race)
admin.site.register(Skill)
admin.site.register(Theme)
