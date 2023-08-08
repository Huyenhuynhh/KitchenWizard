from django.contrib.auth.models import AbstractUser
from djongo import models

class Recipe(models.Model):
    external_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    spoonacular_id = models.IntegerField(null=False)
    title = models.CharField(max_length=255)
    image = models.URLField(max_length=1024, null=True, blank=True)
    usedIngredients = models.JSONField(default=list)
    missedIngredients = models.JSONField(default=list)
    likes = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class User(AbstractUser):
    saved_recipes = models.ArrayReferenceField(
        to=Recipe,
        on_delete=models.CASCADE,
        blank=True,
    )
