from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model, authenticate, login

from api.models import Recipe
from .serializers import UserSerializer
from .api_utils import get_recipes
from .models import User

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user( 
                username=serializer.validated_data['username'],
                email=serializer.validated_data['email'],
                password=serializer.validated_data['password'],
            )
            return Response({'message': 'User registered successfully'})
        else:
            return Response(serializer.errors, status=400)
        

    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Username and password must be provided"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Logged in successfully', 'userId' : user.id})
        else:
            return Response({'error': 'Invalid username or password'}, status=400)
    
    
    @action(detail=True, methods=['PUT'], permission_classes=[IsAuthenticated])
    def update_saved_recipes(self, request, pk=None):
        user = self.get_object()
        data = request.data

        # a list of recipe ids to be added or removed
        recipe_ids = data.get('recipe_ids', [])

        # fetch recipes from database 
        recipes = Recipe.objects.filter(id__in=recipe_ids)

        # check if it's adding or removing
        action = data.get('action')

        if action == 'add':
            for recipe in recipes:
                user.saved_recipes.add(recipe, through_defaults={'date_saved': timezone.now()})
        elif action == 'remove':
            for recipe in recipes:
                user.saved_recipes.remove(recipe)
        else: 
            return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)
        
        # save the user and return the new data
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RecipeViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['get'])
    def search(self, request):
        ingredients = request.query_params.get('ingredients', '')
        recipes = get_recipes(ingredients)
        for recipe in recipes:
            if not Recipe.objects.filter(spoonacular_id=recipe['id']).exists():
                ingredients_list = []
                for ingredient in recipe.get('usedIngredients', []):
                    ingredients_list.append(ingredient.get('original', ''))
                for ingredient in recipe.get('missedIngredients', []):
                    ingredients_list.append(ingredient.get('original',''))
                ingredients_str = ", ".join(ingredients_list)

                Recipe.objects.create(
                    title=recipe['title'],
                    image_url=recipe['image'],
                    source_url=recipe.get('sourceUrl', ''),  
                    spoonacular_id=recipe['id'],
                    ingredients=ingredients_str,
                    instructions="" 
                )
        return Response(recipes)

