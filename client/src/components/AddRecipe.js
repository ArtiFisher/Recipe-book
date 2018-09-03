import React, { Component } from 'react';
import IngredientsInput from './IngredientsInput';
import { addRecipe, getRecipes } from '../queries';
import { Mutation } from 'react-apollo';

class AddRecipe extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      ingredients: [],
      amounts: [],
      description: '',
    };
  }
  onAmountChange(event, index) {
    let amounts = [...this.state.amounts];
    let ingredients = [...this.state.ingredients];
    amounts[index] = event.target.value;
    ingredients[index] = event.target.previousElementSibling.value;
    this.setState({ amounts, ingredients });
  }
  onIngredientChange(event, index) {
    if(this.state.amounts[index]){
      let newArray = [...this.state.ingredients];
      newArray[index] = event.target.value;
      this.setState({ ingredients: newArray });
    }
  }
  render() {
    return(
      <Mutation mutation={addRecipe} variables={this.state} refetchQueries={[{query: getRecipes}]}>
        {
          addRecipe => (
            <form className="add-recipe" onSubmit={ (e) => {
                e.preventDefault();
                addRecipe();
              } }>
              <div className="field">
                <label>Recipe name:</label>
                <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) } />
              </div>
              <div>
                <label>Ingredients:</label>
                <div className="field">
                  <ul>
                    <IngredientsInput onIngredientChange={ this.onIngredientChange.bind(this) } onAmountChange={ this.onAmountChange.bind(this) }></IngredientsInput>
                  </ul>
                </div>
              </div>
              <div className="field">
                <label>Description:</label>
                <textarea type="text" onChange={ (e) => this.setState({ description: e.target.value }) } />
              </div>
              <button>+</button>
            </form>
          )
        }
      
        </Mutation>
    )
  }
}

export default AddRecipe;
