# Generated by Django 5.0.3 on 2024-04-01 11:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_projects_project'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='commnets',
            new_name='comments',
        ),
    ]
