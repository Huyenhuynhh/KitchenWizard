from django.contrib.auth.hashers import make_password, check_password
from django.db import models

class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        app_label = 'api'
    
    # takes plain text pw, hash it and store in 'password'
    def set_password(self, password):
        self.password = make_password(password)
        self.save()
    
    # takes plain text pw and compare to stored hashed pw
    def check_password(self, password):
        return check_password(password, self.password)


class Recipe(models.Model):
    title = models.CharField(max_length=255)
    ingredients = models.TextField()
    instructions = models.TextField()
    image_url = models.URLField(max_length=500, blank=True)
    source_url = models.URLField(max_length=500, blank=True)
    spoonacular_id = models.IntegerField(unique=True)  # If Spoonacular provides unique IDs
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
