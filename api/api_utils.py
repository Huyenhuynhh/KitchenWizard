import requests


def get_recipes(ingredients):
    url = "https://api.spoonacular.com/recipes/findByIngredients"

    # adding API key and ingredients to the query parameters
    query_params = {
        "apiKey": "72997388098246b19ba31673ac715fb9",
        "includeIngredients" : ingredients,
        "number" : 20 # number of recipes
    }

    # send GET request to Spoonacular 
    response = requests.get(url, params=query_params)
    data = response.json()

    # status code = 200 if the request was successful
    if response.status_code == 200:
        if "results" in data and data["results"]:
            print(data["results"][0])  # print first recipe
            return data["results"]
        else:
            print(f"No recipes found for ingredients: {ingredients}")
            return []
    else:
        # print status code and empty list if not successful 
        print(f"Failed to get recipes: {response.status_code}")
        return []
