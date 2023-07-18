// update React Context
import React, { createContext, useReducer } from "react";

const initialState = {
  savedRecipes: [],
};

// create context with an initial state
export const GlobalContext = createContext(initialState);

// take previous state and action as input to return new state 
const appReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_RECIPE':
            return { ...state, savedRecipes: [...state.savedRecipes, action.payload] };
        case 'REMOVE_RECIPE':
            return { ...state, savedRecipes: state.savedRecipes.filter(recipe => recipe.id !== action.payload.id) };
        default:
            return state;
    }
}

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // actions
  function saveRecipe(recipe) {
    dispatch({
      type: "SAVE_RECIPE",
      payload: recipe,
    });
  };

  function removeRecipe(recipe) {
    dispatch({
        type: 'REMOVE_RECIPE',
        payload: recipe,
    });
  };


  return (
    <GlobalContext.Provider
      value={{
        savedRecipes: state.savedRecipes,
        saveRecipe,
        removeRecipe,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

