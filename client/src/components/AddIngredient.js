import React, { Component } from 'react';
import { addIngredient, getIngredients } from '../queries';
import { Mutation } from 'react-apollo';

class AddIngredient extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      unit: '',
    };
  }
  submit(e) {
    e.preventDefault();
    this.props.addIngredient({
      variables: {
        name: this.state.name,
        ingredients: this.state.ingredients,
        amounts: this.state.amounts,
        description: this.state.description,
      },
      refetchQueries: [{ query: getIngredients }]
    });
  }
  render() {
    return(
      <form onSubmit={ this.submit.bind(this) }>
        <div className="field">
          <label>Ingredient name:</label>
          <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) } />
        </div>
        <div className="field">
          <label>Unit:</label>
          <textarea type="text" onChange={ (e) => this.setState({ unit: e.target.value }) } />
        </div>
        <Mutation mutation={addIngredient} variables={this.state}>
          { addIngredient => <button onClick={ addIngredient }>+</button> }
        </Mutation>
      </form>
    )
  }
}

export default AddIngredient;
