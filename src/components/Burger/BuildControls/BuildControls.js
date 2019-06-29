import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad',price:'20' },
    { label: 'Bacon', type: 'bacon',price:'150' },
    { label: 'Cheese', type: 'cheese',price:'35' },
    { label: 'Meat', type: 'meat',price:'120' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p><strong>Current Price: ₹{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                price={ctrl.price}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;
