# Generated by Django 2.0.1 on 2018-01-14 21:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('generator', '0002_skill_name'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='skill',
            options={'ordering': ['name']},
        ),
    ]
