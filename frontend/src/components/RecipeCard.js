import React from "react";
import { useState } from "react";
import styled from "styled-components";

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
  margin: 30px; // add some margin to space the cards apart
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
  &:focus {
    outline: none;
  }

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }

  ${(props) =>
    props.isliked
      ? `
    color: #fff;
    background: #ef4444; 
    &:hover {
      background: #dc2626;
    }
  `
      : `
    color: #626262;
    background: #ffffff;
    &:hover {
      background: #050505;
    }
  `}
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 248px;
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
  max-height: 300px; // Set a max height
  overflow-y: auto; // Enable vertical scrolling
  padding-right: 2px; // Adjust the padding as necessary
`;

const RecipeCardComponent = ({ recipe }) => {
    const usedIngredients = recipe.usedIngredients
      ? recipe.usedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")
      : "No used ingredients provided";

    const missedIngredients = recipe.missedIngredients
      ? recipe.missedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")
      : "No missed ingredients provided";

    const [isliked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
      setIsLiked(!isliked);
      // Add code to save liked recipe
      const likedRecipes =
        JSON.parse(localStorage.getItem("likedRecipes")) || [];
      if (isliked) {
        // remove recipe from likedRecipes if it's there
        const updatedLikedRecipes = likedRecipes.filter(
          (likedRecipe) => likedRecipe.id !== recipe.id
        );
        localStorage.setItem(
          "likedRecipes",
          JSON.stringify(updatedLikedRecipes)
        );
      } else {
        // add recipe to likedRecipes if it's not already there
        likedRecipes.push(recipe);
        localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));
      }
    };

  return (
    <RecipeCard>
      <LikeButton isliked={isliked} onClick={handleLikeClick}>
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

