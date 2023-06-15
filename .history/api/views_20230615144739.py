#
from api_utils import get_recipes
from django.http import JsonResponse

def recipe_view(request):
    ingredients = request.GET.get('ingredients', '')
    recipes = get_recipes(ingredients)
    return JsonResponse(recipes, safe=False)
