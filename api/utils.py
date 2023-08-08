import requests
from .models import Recipe
from django.core.exceptions import ObjectDoesNotExist
import uuid

def get_or_create_recipe_from_api(recipe_id, user):
    try:
        # check if the recipe exists in the local database first
        recipe = Recipe.objects.get(external_id=recipe_id)
    except ObjectDoesNotExist:
        # if the recipe doesn't exist in the local database then fetch it from the API
        response = requests.get(f"https://api.spoonacular.com/recipes/{recipe_id}/information?apiKey=72997388098246b19ba31673ac715fb9")

        # check if the request was successful
        if response.status_code == 200:
            print("API Response:", response.json())
            recipe_data = response.json()

            print("Debugging ingredients:")
            print("Used:", recipe_data.get('usedIngredients', []))
            print("Missed:", recipe_data.get('missedIngredients', []))
            # create a new Recipe object with the data from the API
            recipe = Recipe.objects.create(
                external_id=recipe_id,
                spoonacular_id=recipe_data['id'],
                title=recipe_data['title'],
                image=recipe_data['image'],
                usedIngredients=recipe_data.get('usedIngredients', []),
                missedIngredients=recipe_data.get('missedIngredients', []),
                likes=recipe_data.get('aggregateLikes', 0)
            )
        else:
            # handle the error
            print(f"Error fetching recipe from API: {response.status_code}")
            return None

    # Add the recipe to the user's saved_recipes
    user.saved_recipes.add(recipe)
    user.save()

    return recipe
