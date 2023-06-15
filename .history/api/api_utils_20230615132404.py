import requests

def get_recipes(ingredients):
    url = "https://api.spoonacular.com/recipes/complexSearch"

    query_params = {
        "apiKey": "72997388098246b19ba31673ac715fb9",
        "includeIngredients" : ingredients,
        "number" : 3
    }

    response = requests.get(url, params=query_params)

    if response.status_code == 200;
        recipes = response.json()
        return recipes["results"]