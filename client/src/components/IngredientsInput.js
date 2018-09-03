import React, { Component } from 'react';
import { getIngredients } from '../queries';
import { graphql } from 'react-apollo';

class IngredientsInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      ingredientsQuantity: 1,
    };
  }
  render() {
    const data = this.props.getIngredients;
    if(data.loading) {
      return (<div>Loading ingredients</div>);
    }
    else{
      return new Array(this.state.ingredientsQuantity).fill(1).map((item, index) => {
        return <li key={ index }>
          <select onChange={
            (e) => {
              this.props.onIngredientChange(e, index);
            }
          }>
            {data.ingredients.map(ingredient => 
              <option key={ ingredient.id } value={ ingredient.id }>{ ingredient.name }, { ingredient.unit }</option>
            )}
          </select>
          <input onChange={ (e) => {
              this.props.onAmountChange(e, index);
            }
          } type="number"/>
          <button onClick={
              (e) => {
                e.preventDefault();
                this.setState({ingredientsQuantity: this.state.ingredientsQuantity + 1 })
              }
            }>+</button>
        </li>
      });
    }
  }
}

export default graphql(getIngredients, { name: 'getIngredients' })(IngredientsInput);
