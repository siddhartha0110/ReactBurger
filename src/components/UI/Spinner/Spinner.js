import React from 'react';

import classes from './Spinner.css';

const spinner = () => (
    <div className={classes.Spinner}>
  <div className={classes.Double1}></div>
  <div className={classes.Double2}></div>
</div>
);

export default spinner;