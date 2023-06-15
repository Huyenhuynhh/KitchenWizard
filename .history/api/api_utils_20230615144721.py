
import requests

def get_recipes(ingredients):
    url = "https://api.spoonacular.com/recipes/complexSearch"

    # adding API key and ingredients to the query parameters
    query_params = {
        "apiKey": "72997388098246b19ba31673ac715fb9",
        "includeIngredients" : ingredients,
        "number" : 3 # number of recipes
    }

    # send GET request to Spoonacular 
    response = requests.get(url, params=query_params)

    # status code = 200 if the request was successful
    if response.status_code == 200:
        # parse response as JSON
        recipes = response.json()
        return recipes["results"]
    else:
        # print stutus code and empty list if not successful 
        print(f"Failed to get recipes: {response.status_code}")
        return []
    