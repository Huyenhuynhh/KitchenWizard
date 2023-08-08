from rest_framework import serializers
from .models import User, Recipe
from django.contrib.auth import get_user_model

User = get_user_model()

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'image', 'usedIngredients', 'missedIngredients', 'likes']

class UserSerializer(serializers.ModelSerializer):
    saved_recipes = RecipeSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'saved_recipes']
    
