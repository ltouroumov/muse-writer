# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-07-12 13:09
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('muse_api', '0004_auto_20170712_1507'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='document',
            name='path',
        ),
    ]
