import React, { Component } from 'react';
import RecipesPage from './pages/Recipes';
import IngredientsPage from './pages/Ingredients';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Switch>
            <Route exact path='/' component={RecipesPage}/>
            <Route exact path='/recipes' component={RecipesPage}/>
            <Route exact path='/ingredients' component={IngredientsPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
