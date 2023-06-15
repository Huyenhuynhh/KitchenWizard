import requests

def get_recipes(ingredients):
    url = "https://api.spoonacular.com/recipes/complexSearch"

    query_params = {
        "apiKey": "72997388098246b19ba31673ac715fb9",
        "includeIngredients" : ingredients,
        "number" : 3
    }

    response 