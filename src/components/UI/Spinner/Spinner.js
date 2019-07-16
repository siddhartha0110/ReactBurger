import React from 'react';

import classes from './Spinner.css';

const spinner = () => (
    <div class={classes.Spinner}>
  <div class={classes.Doublebounce1}></div>
  <div class={classes.Doublebounce2}></div>
</div>
);

export default spinner;