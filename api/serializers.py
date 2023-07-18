from rest_framework import serializers
from .models import User, Recipe


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'source_url', 'ingredients', 'instruction']

class UserSerializer(serializers.ModelSerializer):
    saved_recipes = RecipeSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'saved_recipes']
    
