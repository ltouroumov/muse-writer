# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-07-07 14:01
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('muse_api', '0002_auto_20170630_1338'),
    ]

    operations = [
        migrations.CreateModel(
            name='Binder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path', models.CharField(max_length=512)),
                ('name', models.CharField(max_length=512)),
                ('binder', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='documents', to='muse_api.Binder')),
                ('first_child', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='parent_node', to='muse_api.Document')),
                ('next_node', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='prev_node', to='muse_api.Document')),
            ],
        ),
        migrations.AlterField(
            model_name='project',
            name='created_date',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='project',
            name='updated_date',
            field=models.DateTimeField(),
        ),
        migrations.AddField(
            model_name='binder',
            name='first_child',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='binder_root', to='muse_api.Document'),
        ),
        migrations.AddField(
            model_name='binder',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='binders', to='muse_api.Project'),
        ),
    ]
