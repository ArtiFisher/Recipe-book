import { gql } from 'apollo-boost';

const getIngredients = gql`
  {
    ingredients {
      id
      name
      unit
    }
  }
`;

const getRecipes = gql`
  {
    recipes {
      name
      id
      ingredients {
        id
        name
        unit
      }
      description
      amounts
    }
  }
`;

const getRecipe = gql`
  query($id: ID) {
    recipe(id: $id) {
      name
      ingredients {
        id
        name
        unit
      }
      description
      amounts
    }
  }
`;

const addRecipe = gql`
  mutation($name: String!, $amounts: [Int]!, $ingredients: [ID]!, $description: String) {
    addRecipe(name: $name, amounts: $amounts, ingredients: $ingredients, description: $description){
      name
      amounts
      ingredients {
        id
        name
        unit
      }
    }
  }
`;

const addIngredient = gql`
  mutation($name: String!, $unit: String!) {
    addRecipe(name: $name, unit: $unit){
      name
      unit
    }
  }
`;

export {
  getIngredients,
  getRecipes,
  getRecipe,
  addRecipe,
  addIngredient
};
