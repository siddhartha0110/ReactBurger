import React from 'react';

import classes from './Spinner.css';

const spinner = () => (
    <div className={classes.Spinner}>
  <div className={classes.Doublebounce1}></div>
  <div className={classes.Doublebounce2}></div>
</div>
);

export default spinner;