import React, { Component } from 'react';
import RecipesList from '../components/List';
import AddRecipe from '../components/AddRecipe';
import { getRecipes } from '../queries';
import RecipeDetails from '../components/RecipeDetails';

class Recipes extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="recipes">
        <RecipesList query={getRecipes} collection="recipes" details={RecipeDetails} accordion="true"/>
        <AddRecipe/>
      </div>
    );
  }
}

export default Recipes;
