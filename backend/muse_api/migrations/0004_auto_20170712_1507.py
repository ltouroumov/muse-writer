# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-07-12 13:07
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('muse_api', '0003_auto_20170707_1601'),
    ]

    operations = [
        migrations.AlterField(
            model_name='binder',
            name='first_child',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='binder_root', to='muse_api.Document'),
        ),
    ]
