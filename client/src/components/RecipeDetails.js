import React from 'react';

const RecipesDetails = (props) => {
    if(!props.item) return null;
    return (
        <div className="panel">
            <h2>{ props.item.name }</h2>
            <ul>
                { props.item.ingredients.map((ingredient, index) => {
                    return (<li key={ ingredient.id }>
                        { `${ingredient.name} - ${props.item.amounts[index]} ${ingredient.unit}` }
                    </li>);
                }) }
            </ul>
        </div>
    )
}

export default RecipesDetails;
