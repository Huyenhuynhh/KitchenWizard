import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext"; 
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";
import { refreshAuthToken } from "../services/refreshToken";

const RecipeCard = styled.div`
  width: 308px;
  height: 637px;
  padding: 28px 44px 80px 44px; // make room for the button
  background: white;
  box-shadow: 1px 1px 0px 1px black;
  border: 0.25px solid black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 27px;
  margin: 25px; // add some margin to space the cards apart
  overflow: hidden; // add overflow hidden to prevent children from overflowing
  box-sizing: border-box; // include padding in width and height

   &:hover {
    box-shadow: 3px 5px 0px 2px black;
    border: 0.50px solid black;
   }
`;

const LikeButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20%;
  transition: background 0.15s ease-in-out;
  background-color: ${(props) => (props.isliked ? "#ef4444" : "#ffffff")};
  color: ${(props) => (props.isliked ? "#ffffff" : "#626262")};

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${(props) => (props.isliked ? "#dc2626" : "#050505")};
  }
`;


const RecipeImage = styled.img`
  width: 100%;
  height: 70%;
  background: linear-gradient(0deg, #d9d9d9 0%, #d9d9d9 100%);
`;

const RecipeTitle = styled.div`
  color: black;
  font-size: 20px;
  font-family: "Josefin Slab";
  font-weight: 900;
  word-wrap: break-word;
`;

const RecipeInfo = styled.div`
  color: black;
  font-size: 18px;
  font-family: "Josefin Slab";
  font-weight: 300;
  word-wrap: break-word;
  padding: 0px 5px; // avoid text touching the borders
`;

const ScrollableDiv = styled.div`
  max-height: 300px; // max height
  overflow-y: auto; // enable vertical scrolling
  padding-right: 2px; 
`;

const RecipeCardComponent = ({ recipe }) => {
  const usedIngredients = recipe.usedIngredients
    ? recipe.usedIngredients.map((ingredient) => ingredient.original).join(", ")
    : "No used ingredients provided";

  const missedIngredients = recipe.missedIngredients
    ? recipe.missedIngredients
        .map((ingredient) => ingredient.original)
        .join(", ")
    : "No missed ingredients provided";

  const { savedRecipes, saveRecipe, removeRecipe } = useContext(GlobalContext);
  const [isLiked, setIsLiked] = useState(
    savedRecipes.some((savedRecipe) => savedRecipe.id === recipe.id)
  );

  useEffect(() => {
    setIsLiked(
      savedRecipes.some((savedRecipe) => savedRecipe.id === recipe.id)
    );
  }, [savedRecipes, recipe.id]);

  const { userId } = useContext(UserContext); // destructuring to get userId from the context
  console.log("UserId at RecipeCardComponent: ", userId);

 const handleLikeClick = async () => {

    // handle when userId is null
     if (!userId) {
       console.error("No user ID available");
       return;
     }

    try {
      let url = `http://localhost:8000/api/users/${userId}/update_saved_recipes/`;
      console.log(url);
      console.log("User ID: ", userId);

      // token is stored in localStorage 
      const token = localStorage.getItem("authToken");
      console.log(token);

      if (isLiked) {
        // if the recipe is already liked, send a request to remove it
        const response = await axios.put(
          url, 
          {
          recipe_ids: [recipe.id],
          action: "remove",
          },
          {
            headers: { Authorization: `Bearer ${token}`} // sending token
          }
        );
        if (response.status === 200) {
          // update local state
          removeRecipe(recipe);
        }
      } else {
        // if the recipe is not liked, send a request to save it
        const response = await axios.put(
          url, 
          {
          recipe_ids: [recipe.id],
          action: "add",
          },
          {
            headers: { Authorization: `Bearer ${token}` } // sending token 
          }
        );
        if (response.status === 200) {
          // update local state
          saveRecipe(recipe);
        }
      }

      // toggle isLiked state after successfully saving or removing recipe
      setIsLiked((prevIsLiked) => !prevIsLiked);
    } catch (error) {
      // handle error
      console.error("An error occur while updating saved recipes", error);

      if (error.response) {
        console.log("Response data: ", error.response.data);
        console.log("Response status: ", error.response.status);

        if (error.response.data === 401){
          const refreshed = await refreshAuthToken();
          if (refreshed){
            handleLikeClick();
          }
          else {
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
          }
        }
      }
      else {
        console.log('Error', error.message);
      }
    }
  };

  return (
    <RecipeCard>
      <LikeButton isliked={isLiked} onClick={handleLikeClick}>
        <svg viewBox="0 0 20 20">
          <path
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </LikeButton>
      <RecipeImage src={recipe.image} alt={recipe.title} />
      <RecipeTitle>{recipe.title}</RecipeTitle>
      <ScrollableDiv>
        <RecipeInfo>Used Ingredients: {usedIngredients}</RecipeInfo>
        <RecipeInfo>Missed Ingredients: {missedIngredients}</RecipeInfo>
        <RecipeInfo>Likes: {recipe.likes}</RecipeInfo>
      </ScrollableDiv>
    </RecipeCard>
  );
};

export default RecipeCardComponent;