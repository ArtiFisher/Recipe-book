import React from 'react';

const IngredientDetails = (props) => {
    if(!props.item) return null;
    return (
        <div className="panel">
            <span>{ `${props.item.name} - ${props.item.unit}` }</span>
        </div>
    )
}

export default IngredientDetails;
