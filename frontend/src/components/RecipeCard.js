import React from "react";
import styled from "styled-components";

const RecipeCard = styled.div`
  width: 408px;
  height: 637px;
  padding: 28px 44px;
  background: white;
  box-shadow: 1px 1px 0px 1px black;
  border: 0.25px solid black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 27px;
`;

const CloseButton = styled.div`
  width: 24px;
  height: 24px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 1.55px;
    top: 3px;
    width: 20.9px;
    height: 18.23px;
    border: 1px black solid;
  }
`;

const RecipeImage = styled.img`
  width: 320px;
  height: 248px;
  background: linear-gradient(0deg, #d9d9d9 0%, #d9d9d9 100%);
`;

const RecipeTitle = styled.div`
  color: black;
  font-size: 30px;
  font-family: "Josefin Slab";
  font-weight: 300;
  word-wrap: break-word;
`;

const RecipeInfo = styled.div`
  color: black;
  font-size: 18px;
  font-family: "Josefin Slab";
  font-weight: 300;
  word-wrap: break-word;
`;

const RecipeCardComponent = ({ recipe }) => {
  const usedIngredients = recipe.usedIngredients
    .map((ingredient) => ingredient.original)
    .join(", ");
  const missedIngredients = recipe.missedIngredients
    .map((ingredient) => ingredient.original)
    .join(", ");
  return (
    <RecipeCard>
      <CloseButton />
      <RecipeImage src={recipe.image} alt={recipe.title} />
      <RecipeTitle>{recipe.title}</RecipeTitle>
      <RecipeInfo>Used Ingredients: {usedIngredients}</RecipeInfo>
      <RecipeInfo>Missed Ingredients: {missedIngredients}</RecipeInfo>
      <RecipeInfo>Likes: {recipe.likes}</RecipeInfo>
    </RecipeCard>
  );
};

export default RecipeCardComponent;
