import React, { Component } from 'react';
import IngredientsList from '../components/List';
// import AddIngredient from '../components/AddIngredient';
import { getIngredients } from '../queries';
import IngredientDetails from '../components/IngredientDetails';

class Ingredients extends Component {
  render() {
    return (
      <div className="ingredients">
        <IngredientsList query={getIngredients} collection='ingredients' details={IngredientDetails}/>
        {/* <AddIngredient/> */}
      </div>
    );
  }
}

export default Ingredients;
